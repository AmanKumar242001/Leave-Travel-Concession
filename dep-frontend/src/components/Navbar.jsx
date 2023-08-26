import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../LoginContext";
import { useContext } from "react";
import ProfileAvatar from "./ProfileAvatar";
import NotificationBar from "./NotificationBar";
import { toast } from "react-hot-toast";
import ProfileImage from "../../public/user.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useContext(LoginContext);

  const stakeHolderType = [
    "applicant",
    "hod",
    "establish",
    "establish",
    "establish",
    "accounts",
    "accounts",
    "accounts",
    "audit",
    "audit",
    "audit",
    "registrar",
    "dean",
  ];

  useEffect(() => {
    setAvatar(false);
  }, [location]);

  const catMenu = useRef(null)

  const closeOpenMenus = (e) => {
    if (catMenu.current && avatar && !catMenu.current.contains(e.target)) {
      setAvatar(false);
    }
    setNotification(false)
  }

  document.addEventListener("mousedown", closeOpenMenus);

  const logoutHandle = () => {
    const handleStatus = (res) => {
      if (res.status === 200) setUser(null);
    };
    const logOUT_ = () => {
      setUser(null);
      navigate("/");
    };
    fetch("/api/logout", {
      method: "POST",
    }).then((res) =>
      res.status === 200 ? logOUT_() : toast("Failed to Logout")
    );
  };

  const [avatar, setAvatar] = useState(false)
  const [openNotification, setNotification] = useState(false);
  const handleClick = () => setAvatar(!avatar) 

  return (
    <>
      <div className="bg-[#0247FE] border-gray-200" ref={catMenu}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
          {/* Name + Logo */}
          <div className="flex">
            <img
              className="h-12 mr-3"
              src="https://www.iitrpr.ac.in/sites/default/files/logo_0_2.png"
              alt="IIT Ropar Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#EBF7D4]">
              LTC Portal
            </span>
          </div>

          {/* Small Screen */}
          <div className="flex items-center lg:order-2">

            <div className="mr-6 pt-1" >
            <NotificationBar open={openNotification} setOpen={setNotification} />
            </div>

            <div onClick={handleClick} className="flex mr-3 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300">
              <img className='w-8 h-8 rounded-full' src={ProfileImage} alt="Avatar" />
            </div>
            <div
              className={
                !avatar
                  ? "hidden"
                  : "absolute top-0 right-0 translate-y-10 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow"
              }
              id="user-dropdown"
            >
              <div class="px-4 py-3">
                <span className="block text-sm text-gray-700 ">{`${user.firstName} ${user.lastName}`}</span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user.emailId}
                </span>
                {user.role.stageCurrent > 0 && (
                  <span> {user.designation} </span>
                )}
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <ProfileAvatar />
                </li>
                <li
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  onClick={logoutHandle}
                >
                  <button> Logout </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1">
            <div className="flex flex-col font-medium p-4 lg:p-0 mt-4 rounded-lg bg-[#0247FE] lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-[#0247FE]">
              {user.isApplicant ? (
                <>
                  <Link
                    to={"/applicant/new"}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    New LTC Application{" "}
                  </Link>
                  <Link
                    to={"/applicant/live"}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    Live LTC Application{" "}
                  </Link>
                  <Link
                    to={"/applicant/newTa"}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    New TA Application{" "}
                  </Link>
                  <Link
                    to={"/applicant/liveTa"}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    Live TA Application{" "}
                  </Link>
                  <Link
                    to={"/officeOrder"}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    Office Orders{" "}
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={`/${stakeHolderType[user.roleId]}/pending`}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    Pending LTC Application{" "}
                  </Link>
                  <Link
                    to={`/${stakeHolderType[user.roleId]}/pendingTa`}
                    className="block py-2 pl-3 pr-4 text-[#EBF7D4] rounded hover:bg-[#091D34] lg:hover:bg-transparent lg:hover:text-[#091D34] lg:p-0"
                  >
                    Pending TA Application{" "}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
