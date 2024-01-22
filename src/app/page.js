"use client";

import { useState, useContext, useEffect } from "react";
import AppContext from "./context/appContext.js";
import Form from "./components/form.js";
import Card from "./components/card.js";
import Search from "./components/search.js";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config/firebase.js";

export default function Home() {
  const [opacity, setOpacity] = useState("0");
  const [search, setSearch] = useState("");
  const [successCount, setSuccessCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [filteredTask, setFilteredTask] = useState([]);
  const router = useRouter();
  
  const { task, isAuth, setUserCredentials, setLoading } = useContext(AppContext);

  useEffect(() => {
    {
      !isAuth && router.push("/signin");
    }
  }, []);
  useEffect(()=> {
    
    const fetchData = async () => {
      const docRef = doc(db, "users", isAuth.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data()
        setUserCredentials(data, 'data')
        setLoading(false)
      } else {
        console.log("No such document!");
      }
      
    };
    {isAuth && fetchData()}
    
        
  }, [])

  useEffect(() => {
    console.log(search);
    const filterTask = task.filter(
      (task) => task.title.includes(search) || task.createdAt.includes(search)
    );
    setFilteredTask(filterTask);
  }, [search]);

  useEffect(() => {
    const getSuccessLength = task.filter((len) => len.status == true);
    setSuccessCount(getSuccessLength.length);

    const getPendingLength = task.filter((len) => len.status == false);
    setPendingCount(getPendingLength.length);

    setTaskCount(task.length);
  }, [task]);

  return (
    <>
      {isAuth && isAuth ? (
        <div className="p-4 sm:ml-64 v-h120 overscroll-contain">
          {/* create task form */}
          <Form opacity={opacity} setOpacity={setOpacity} />
          {/* BODY */}
          <div className="p-4 m-bg-white v-h110 border-2 border-dashed rounded-lg dark:border-gray-700 mt-14">
            {/* Rows / Cols */}
            {/* Search, User Info */}
            <Search setSearch={setSearch} search={search} />
            {/* status information, add task */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Status completed */}
              <div className="flex items-center justify-center min-h-600 h-auto p-4 rounded bg-white dark:bg-gray-800">
                <p className="text-2xl text-gray-400 text-center  dark:text-gray-500">
                  <span className="inline-flex items-center justify-center p-2 text-sm font-medium text-blue-800 bg-green-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={"35px"}
                      fill="green"
                    >
                      <path d="M362.6 192.9L345 174.8c-.7-.8-1.8-1.2-2.8-1.2-1.1 0-2.1.4-2.8 1.2l-122 122.9-44.4-44.4c-.8-.8-1.8-1.2-2.8-1.2-1 0-2 .4-2.8 1.2l-17.8 17.8c-1.6 1.6-1.6 4.1 0 5.7l56 56c3.6 3.6 8 5.7 11.7 5.7 5.3 0 9.9-3.9 11.6-5.5h.1l133.7-134.4c1.4-1.7 1.4-4.2-.1-5.7z" />
                    </svg>
                  </span>
                  <span className="text-sm block leading-8 text-center">
                    Done
                  </span>
                  <span className="text-3xl font-medium text-gray-900 block text-center font-sans antialiased">
                    {successCount}
                  </span>
                </p>
              </div>
              {/* Status pending */}
              <div className="flex items-center justify-center h-auto p-4 rounded bg-white dark:bg-gray-800">
                <p className="text-2xl text-gray-400 text-center  dark:text-gray-500">
                  <span className="inline-flex items-center justify-center p-3 text-sm font-medium text-blue-800 bg-red-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width={"24px"}
                      fill="#8f1b17"
                    >
                      <path d="M415.9 143.7c3.1 3.1 8.2 3.1 11.3 0l11.3-11.3c3.1-3.1 3.1-8.2 0-11.3L413 95.6c-3.1-3.1-8.2-3.1-11.3 0l-11.3 11.3c-3.1 3.1-3.1 8.2 0 11.3l25.5 25.5zM84.8 143.7c3.1 3.1 8.2 3.1 11.3 0l25.5-25.5c3.1-3.1 3.1-8.2 0-11.3l-11.3-11.3c-3.1-3.1-8.2-3.1-11.3 0L73.5 121c-3.1 3.1-3.1 8.2 0 11.3l11.3 11.4z" />
                      <path d="M280 81.5V64c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v17.5C137.3 93.3 64 174.1 64 272c0 106 86 192 192 192s192-86 192-192c0-97.9-73.3-178.7-168-190.5zm-10 219.3V320c0 7.7-6.3 14-14 14s-14-6.3-14-14v-19.2c-10.7-5.2-18-16.1-18-28.8s7.3-23.6 18-28.8V144c0-7.7 6.3-14 14-14s14 6.3 14 14v99.2c10.7 5.2 18 16.1 18 28.8s-7.3 23.6-18 28.8z" />
                    </svg>
                  </span>
                  <span className="text-sm block leading-8 text-center">
                    pending
                  </span>
                  <span className="text-3xl font-medium text-gray-900 block text-center font-sans antialiased">
                    {pendingCount}
                  </span>
                </p>
              </div>
              {/* Add task */}
              <div className="flex items-center justify-center h-auto p-4 rounded bg-white dark:bg-gray-800">
                <button
                  onClick={() => setOpacity("1")}
                  className="text-2xl text-gray-400 text-center dark:text-gray-500"
                >
                  <span className="inline-flex items-center justify-center p-4 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      className="w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </span>
                  <span className="text-sm block leading-8 text-center">
                    Add Task
                  </span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              {search.length > 0 && task
                ? filteredTask.map((task, i) => {
                    return (
                      <section key={i}>
                        <Card
                          task={task}
                          setOpacity={setOpacity}
                          opacity={opacity}
                          id={i}
                        />
                      </section>
                    );
                  })
                : task.map((task, i) => {
                    return (
                      <section key={i}>
                        <Card
                          task={task}
                          setOpacity={setOpacity}
                          opacity={opacity}
                          id={i}
                        />
                      </section>
                    );
                  })}
              <div className="flex items-center h-auto m-h-sm w-full justify-center border-2 border-dashed rounded-lg bg-white 
               dark:bg-gray-800">
                <button
                  onClick={() => setOpacity("1")}
                  className="text-2xl text-gray-400 text-center dark:text-gray-500"
                >
                  <span className="inline-flex items-center justify-center p-4 text-sm font-medium text-gray-500  dark:bg-blue-900 dark:text-blue-300">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
