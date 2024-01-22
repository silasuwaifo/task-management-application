"use client";

import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { Modal } from "flowbite";
import AppContext from "../context/appContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";

export default function Nav() {
  const [pendingNotification, setPendingNotification] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [success, setSuccess] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [pending, setPending] = useState(0);
  const url = usePathname()
  const router = useRouter()
  
  const { task, isAuth, userCredentials, loading, authDispatch } = useContext(AppContext);
  // pending notification
  useEffect(() => {
    setPendingNotification(pending > 0);
    const timeoutId = setTimeout(() => {
      setPendingNotification(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [pending]);
  // success notification
  useEffect(() => {
    setSuccessNotification(success > 0);
    const timeoutId = setTimeout(() => {
      setSuccessNotification(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [success]);

  useEffect(() => {
    const getSuccessLength = task.filter((len) => len.status == true);
    setSuccess(getSuccessLength.length);

    const getPendingLength = task.filter((len) => len.status == false);
    setPending(getPendingLength.length);

    setTaskCount(task.length);
  }, [task]);

  
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js" />
      {url !== "/signin" && url !== "/signup" && isAuth ? (
        <>
          <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start rtl:justify-end">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-side"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      ></path>
                    </svg>
                  </button>
                  <Link
                    href={"https://teachmateai.com"}
                    className="flex ms-2 md:me-24"
                  >
                    <Image
                      src="/assets/teachmate.png"
                      width={38}
                      height={40}
                      className="h-8 me-3"
                      alt="TeachMateLogo"
                      style={{width: 'auto', height: 'auto'}}
                    />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                      TeachMateAI
                    </span>
                  </Link>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center ms-3">
                    <div>
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        aria-expanded="false"
                        data-dropdown-toggle="dropdown-user"
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-8 h-8 rounded-full"
                          src={!loading ? userCredentials.img : '/assets/placeholder.png'}
                          alt="user photo"
                        />
                      </button>
                    </div>
                    <div
                      className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                      id="dropdown-user"
                    >
                      <div className="px-4 py-3" role="none">
                        <p
                          className="text-sm text-gray-900 dark:text-white"
                          role="none"
                        >
                          {!loading && userCredentials.name}
                        </p>
                        <p
                          className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                          role="none"
                        >
                          {!loading && userCredentials.email}
                        </p>
                      </div>
                      <ul className="py-1" role="none">
                        <li>
                          <Link
                            href="/"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={()=> {authDispatch({type: "LOGOUT"}), router.push('/signin')}}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                          >
                            Sign out
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Sidebar"
          >
            {/* Navigation Links */}
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
              <ul className="space-y-2 font-medium">
                {/* Dashboard */}
                <li>
                  <Link
                    href="/"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 21"
                    >
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <span className="ms-3">Dashboard</span>
                  </Link>
                </li>
                {/* All Task */}
                <li>
                  <Link
                    href="/alltask"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M460.9 161H51.1C31.8 161 16 176.8 16 196.1V428c0 19.3 15.8 35.1 35.1 35.1H461c19.3 0 35.1-15.8 35.1-35.1V196.1c-.1-19.3-15.9-35.1-35.2-35.1zM434 133H78c-7.7 0-14-6.3-14-14s6.3-14 14-14h356c7.7 0 14 6.3 14 14s-6.3 14-14 14zM403.2 77H108.8c-7 0-12.8-5.8-12.8-12.8v-2.4c0-7 5.8-12.8 12.8-12.8h294.4c7 0 12.8 5.8 12.8 12.8v2.4c0 7-5.8 12.8-12.8 12.8z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      All Task
                    </span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      {taskCount}
                    </span>
                  </Link>
                </li>
                {/* Completed */}
                <li>
                  <Link
                    href="/completed"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm106.5 150.5L228.8 332.8h-.1c-1.7 1.7-6.3 5.5-11.6 5.5-3.8 0-8.1-2.1-11.7-5.7l-56-56c-1.6-1.6-1.6-4.1 0-5.7l17.8-17.8c.8-.8 1.8-1.2 2.8-1.2 1 0 2 .4 2.8 1.2l44.4 44.4 122-122.9c.8-.8 1.8-1.2 2.8-1.2 1.1 0 2.1.4 2.8 1.2l17.5 18.1c1.8 1.7 1.8 4.2.2 5.8z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Completed
                    </span>
                    {successNotification && (
                      <span className="inline-flex items-center justify-center w-2 h-2 p-1 ms-1 text-sm font-medium text-green-800 bg-green-500 rounded-full dark:bg-blue-900 dark:text-blue-300"></span>
                    )}
                  </Link>
                </li>
                {/* Pending */}
                <li>
                  <Link
                    href="/pending"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M415.9 143.7c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.1 3.1-8.2 0-11.3L413 95.6c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3c-3.1 3.1-3.1 8.2 0 11.3l25.5 25.5zM84.8 143.7c3.1 3.1 8.2 3.1 11.3 0l25.5-25.5c3.1-3.1 3.1-8.2 0-11.3l-11.3-11.3c-3.1-3.1-8.2-3.1-11.3 0L73.5 121c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.4z" />
                      <path d="M280 81.5V64c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v17.5C137.3 93.3 64 174.1 64 272c0 106 86 192 192 192s192-86 192-192c0-97.9-73.3-178.7-168-190.5zm-10 219.3V320c0 7.7-6.3 14-14 14s-14-6.3-14-14v-19.2c-10.7-5.2-18-16.1-18-28.8s7.3-23.6 18-28.8V144c0-7.7 6.3-14 14-14s14 6.3 14 14v99.2c10.7 5.2 18 16.1 18 28.8s-7.3 23.6-18 28.8z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Pending
                    </span>
                    {pendingNotification && (
                      <span className="inline-flex items-center justify-center w-2 h-2 p-1 ms-1 text-sm font-medium text-red-800 bg-red-800 rounded-full dark:bg-blue-900 dark:text-blue-300"></span>
                    )}
                  </Link>
                </li>
                {/* High Priority*/}
                <li>
                  <Link
                    href="/high"
                    className="flex items-center p-1 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-red-100 group"
                  >
                    <span className="flex-1 text-red-800 bg-red-100 rounded-sm p-3">
                      High Priority
                    </span>
                  </Link>
                </li>
                {/* Medium Priority*/}
                <li>
                  <Link
                    href="/medium"
                    className="flex items-center p-1 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-100 group"
                  >
                    <span className="flex-1 text-yellow-800 bg-yellow-100 rounded-sm p-3">
                      Medium Priority
                    </span>
                  </Link>
                </li>
                {/* Low Priority*/}
                <li>
                  <Link
                    href="/low"
                    className="flex items-center p-1 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-green-100 group"
                  >
                    <span className="flex-1 text-green-800 bg-green-100 rounded-sm p-3">
                      Low Priority
                    </span>
                  </Link>
                </li>
                {/* Sign in */}
                <li>
                  <Link
                    href="/signin"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign In
                    </span>
                  </Link>
                </li>
                {/* Sign up */}
                <li>
                  <Link
                    href="/signup"
                    className="flex items-center p-2 text-gray-900 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                      <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                      <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Sign Up
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </>
      ) : null}
    </>
  );
}
