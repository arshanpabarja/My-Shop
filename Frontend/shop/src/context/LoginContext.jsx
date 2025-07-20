import React, { createContext, useContext, useEffect, useState } from 'react';
import { getInfo, HasAccount, password, editInfo } from '../../service/api';
import { useNavigate } from 'react-router-dom';
import isequal from 'lodash.isequal';
export const LoginContext = createContext();

export const useLoginContext = () => {
    return useContext(LoginContext);
};

export default function LoginContextProvider({ children }) {
    const navigate = useNavigate();

    // ✅ Initialize from localStorage immediately
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [login, setLogin] = useState(!!localStorage.getItem('token'));
    const [haveAccount, setHaveAccount] = useState(false);
    const [error, setError] = useState(null);
    const [info, setInfo] = useState({
        username: '',
        phone_number: '',
        first_name: '',
        last_name: '',
        email: ''
    });

    // ✅ Check if the user has an account
    const checkHaveAccount = async (email) => {
        try {
            const res = await HasAccount(email);
            setHaveAccount(res);
        } catch (err) {
            console.error("Error checking account:", err);
        }
    };

    // ✅ Fetch user info and update local state and storage
    

    const handleInfo = async (tokenParam) => {
        try {
            const res = await getInfo(tokenParam || token);

            setInfo((prev) => {
                if (isequal(prev, res)) return prev;
                return res;
            });

            return res;
        } catch (err) {
            console.error("Error fetching user info:", err);
        }
    };

    // ✅ Handle user login and route based on info
    const handleLogin = async (data) => {
        try {
            const res = await password(data);
            localStorage.setItem("token", res.token);
            localStorage.setItem("username", res.username);
            setToken(res.token);
            setLogin(true);

            // ✅ Fetch user info after login
            const userInfo = await handleInfo(res.token);
            
            // ✅ Navigate based on whether the user's first name is set
            if (!userInfo.first_name || userInfo.first_name.trim() === '') {
                navigate('/dashbord/edit');
            } else {
                navigate('/dashbord');
            }
        } catch (error) {
            console.error(error.message);
            setError("ورود ناموفق بود اطلاعات کاربری اشتباه است");
        }
    };

    // ✅ Handle profile editing
    const handleEdit = async (data) => {
        try {
            const res = await editInfo(data, token);
            setError(res);
            // Optionally refresh info after editing
            await handleInfo();
        } catch (err) {
            console.error("Error editing info:", err);
        }
    };

    // ✅ Sync login state with token changes
    useEffect(() => {
        if (token) {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [token]);

    return (
        <LoginContext.Provider
            value={{
                checkHaveAccount,
                handleLogin,
                login,
                token,
                info,
                handleInfo,
                handleEdit,
                haveAccount,
                error,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}
