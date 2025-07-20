import React, { useRef, useState } from 'react'
import { useLoginContext } from '../../context/LoginContext'
import Message from '../../components/Message/Message';
import IsLoading from '../../components/IsLoading/IsLoading';

function User() {
  const TagRef = useRef(null);
  const { checkHaveAccount, haveAccount, handleLogin, error } = useLoginContext()
  const [loading, setLoading] = useState(false)
  const [sendData, setSendData] = useState({
    "password": "",
    "email": ""
  })

  const handleInput = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value })
  }

  const handleForm =  async (event) => {
    setLoading(true)
    event.preventDefault();
    if (haveAccount) {
      try {
        await handleLogin(sendData)
      } catch (err) {
        console.error(err); 
      } finally {
        setLoading(false)
      }
    } else {
      try {
        await checkHaveAccount(sendData)
      } catch (err) {
        console.error(err); 
      } finally {
        setLoading(false)
      }
    }
  }

  const handleShowPassword = () => {
    if (TagRef.current) {
      TagRef.current.type = TagRef.current.type === "email" ? "password" : "email";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-30 px-4">
      <div className="flex flex-col items-center w-full max-w-md space-y-4">
        {error && <Message props={error} />}
        <div className="border border-slate-300 rounded-lg p-6 w-full shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)]">
          <form onSubmit={handleForm} className="space-y-6">
            <div className="mb-12 text-right">
              <h1 className="text-slate-900 text-3xl font-semibold">ورود / ثبت نام</h1>
            </div>
            {haveAccount ?
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block text-right">گذرواژه</label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleInput}
                    name="password"
                    ref={TagRef}
                    type="password"
                    required
                    autoComplete="off"
                    className="w-full text-sm text-right text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="گذرواژه را وارد کنید"
                  />
                  <svg
                    onClick={handleShowPassword}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>

              :
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block text-right">ایمیل</label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleInput}
                    name="email"
                    ref={TagRef}
                    type="email"
                    required
                    autoComplete="off"
                    className="w-full text-sm text-right text-slate-900 border border-slate-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                    placeholder="ایمیل را وارد کنید"
                  />
                  <svg
                    onClick={handleShowPassword}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                    viewBox="0 0 128 128"
                  >
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>}

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm">
                <a href="javascript:void(0);" className="text-blue-600 hover:underline font-medium">
                  فراموشی گذرواژه?
                </a>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="submit"
                onClick={handleForm}
                className="w-full shadow-xl h-12 flex items-center justify-center px-4 text-[15px] font-medium tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              >
                {loading ? <div className="text-2xl">...</div> : 'ورود'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User
