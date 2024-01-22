"use client";

import { useReducer, useState, useEffect } from "react";
import AppContext from "./appContext";
import { initialState } from "./initialState";
import { taskReducer, authReducer } from "../reducer/reducer";

function GlobalState(props) {
  const currentDateTime = new Date();
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = currentDateTime.getDay();
  const day = currentDateTime.getDate();
  const formattedDateTime = `${day} ${daysOfTheWeek[dayIndex]}`;

  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [userCredentials, setUserCredentials] = useState([]);
  const [loading, setLoading] = useState(true);

  const createdAt = formattedDateTime;
  const status = false;

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("user", JSON.stringify(authState.currentUser));
    }
  }, [authState.currentUser]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("task", JSON.stringify(state.task));
    }
  }, [state.task]);

  return (
    <AppContext.Provider
      value={{
        dispatch,
        task: state.task,
        setTitle,
        title,
        setDueDate,
        dueDate,
        setDescription,
        description,
        setPriority,
        priority,
        createdAt,
        status,
        isAuth: authState.currentUser,
        authDispatch,
        setUserCredentials,
        userCredentials,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default GlobalState;
