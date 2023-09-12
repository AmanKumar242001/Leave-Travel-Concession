import React, { useRef } from "react";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import { LoginContext } from "../LoginContext.jsx";
import { useContext } from "react";
import { toast } from "react-hot-toast";

export default function Login() {
  const [userInfo, setUserInfo] = useContext(LoginContext);
  const dialogRef = useRef()

  const showOTPModal = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.elements[0].value;
    var formdata = new FormData();
    formdata.append("emailId", email);
    let res;
    res = await fetch("https://depcse.pythonanywhere.com//login", {
      method: "POST",
      body: formdata,
    })
    if (res.status != 200) {
      const errorText = await res.text()
      toast.error(errorText)
    }
    else {
      dialogRef.current.show()
    }
  }


  const checkOTP = async (e) => {
    e.preventDefault()
    const form = e.target;
    const otp = form.elements[0].value;
    var formdata = new FormData();
    formdata.append("otp", otp);
    let res = await fetch("https://depcse.pythonanywhere.com//acceptOTP", {
      method: "POST",
      body: formdata,
    })
    // .then(async res => {
    //   if(res.status != 200) {
    //     console.error((await res.text()))
    //     return null 
    //   }
    //   return res.json()
    // }).then(setUserInfo)
    if (res.status != 200) {
      let errorText = await res.text()
      toast.error(errorText)
    }
    else {
      setUserInfo((await res.json()))
    }
  }

  return (
    <>
      <section className="bg-yellow-50 dark:bg-gray-900 relative">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                LTC Management Portal
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={showOTPModal}>
                <div>
                </div>
                <div>
                  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
              </form>
            </div>
          </div>
        </div>
        <dialog className="w-[28rem] rounded-lg p-32 absolute top-[30%] bg-white" ref={dialogRef}>
          <div>
            <div>
              Enter OTP:
            </div>
            <form onSubmit={checkOTP}>
              <input type="number" name="otp" id="otp" className=" my-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****" required />
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
            </form>
          </div>
        </dialog>
      </section>
    </>
  );
}
