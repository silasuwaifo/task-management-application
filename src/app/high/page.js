"use client";

import { useState, useContext, useEffect } from "react";
import AppContext from "../context/appContext.js";
import Card from "../components/card.js";
import Search from "../components/search.js";
import { useRouter } from "next/navigation";

export default function Medium() {
  const [opacity, setOpacity] = useState("0");
  const { task, isAuth } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);

  const router = useRouter();

  useEffect(() => {
    {
      !isAuth && router.push("/signin");
    }
  }, []);

  useEffect(() => {
    console.log(search);
    const filterTask = task.filter(
      (task) =>
        task.title.includes(search) ||
        (task.createdAt.includes(search) && task.priority == "High")
    );
    setFilteredTask(filterTask);
  }, [search]);

  return (
    <>
      {isAuth && isAuth ? (
        <div className="p-4 sm:ml-64 v-h120 overscroll-contain">
          {/* BODY */}
          <div className="p-4 m-bg-white v-h110 border-2 border-dashed rounded-lg dark:border-gray-700 mt-14">
            {/* Rows / Cols */}
            {/* Search, User Info */}
            <Search setSearch={setSearch} search={search} />
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
                : task
                    .filter((task) => task.priority == "High")
                    .map((task, i) => {
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
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
