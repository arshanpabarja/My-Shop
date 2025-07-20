import React, { useState, useEffect } from 'react';
import { useLoginContext } from '../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import X from '../../../assets/XB.png';
function Edit() {
    const { handleEdit, info } = useLoginContext();
    const navigate = useNavigate();

    const inputFields = [
        { label: 'نام', name: 'first_name' },
        { label: 'فامیل', name: 'last_name' },
        { label: 'شماره', name: 'phone' },
        { label: 'نام کاربری', name: 'username' }
    ];

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        username: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await handleEdit(formData);
        } catch (err) {
            console.error('Error saving data:', err);
        } finally {
            setLoading(false);
        }
    };
    const [message, setMessage] = useState(false)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (
            info &&
            !loaded &&
            (info.first_name || info.last_name || info.username)
        ) {
            setFormData({
                first_name: info.first_name || '',
                last_name: info.last_name || '',
                phone: info.phone || '',
                username: info.username || '',
            });
            setLoaded(true);
        }
    }, [info, loaded]);
    return (
        <div className="flex flex-col w-full gap-5">
            {message ?
                <div className="w-full h-15 border-1 border-gray-300 rounded text-orange-500 flex items-center justify-end px-4">لطفا اطلاعات کاربری خود را کامل کنید <img src={X} onClick={() => setMessage(false)} className='cursor-pointer w-8' alt="close icon" /></div>
                : <></>}
            <form onSubmit={handleSubmit} className="w-full border border-gray-300 rounded-lg bg-white p-6">
                {inputFields.map((inputs) => (
                    <div key={inputs.name} className="flex flex-col items-end mt-5">
                        <label className='text-md'>:{inputs.label}</label>
                        <input
                            required
                            placeholder={info[inputs.name] || ''}
                            value={formData[inputs.name]}
                            onChange={handleChange}
                            name={inputs.name}
                            className='w-11/12 border-1 text-right px-4 border-gray-400 focus:outline-1 rounded h-12'
                        />
                    </div>
                ))}
                <div className='flex justify-end mt-6'>
                    <button
                        type='submit'
                        disabled={loading}
                        className={`bg-blue-600 text-white px-9 py-2.5 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'در حال ذخیره...' : 'ذخیره'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Edit;
