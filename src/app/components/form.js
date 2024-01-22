"use client";

import { useState, useContext } from "react";
import AppContext from "../context/appContext";
import { Modal } from "flowbite";

function Form({ setOpacity, opacity, editTaskId, setEditTaskId }) {
  const {
    dispatch,
    setTitle,
    setPriority,
    setDescription,
    setDueDate,
    title,
    priority,
    description,
    dueDate,
    status,
    createdAt
  } = useContext(AppContext);

  const handleCreateTask = (e) => {
    e.preventDefault;
    const newTask = {
      id: editTaskId ? editTaskId : Math.floor(Math.random() * 1000),
      createdAt,
      title,
      description,
      dueDate,
      priority,
      status,
    };

    if (editTaskId != null) {
      dispatch({ type: "EDIT_TASK", payload: newTask });
      setEditTaskId(null);
    } else {
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
    }
    setOpacity("0");
    setDescription("");
    setDueDate("");
    setPriority("");
    setTitle("");
  };

  return (
    <div
      className="form-container backdrop-blur-3xl"
      style={{ opacity: opacity, display: opacity < 1 ? "none" : "block" }}
    >
      {/* close form button  */}
      <div className="close">
        <p className="text-gray-700">Create a Task</p>
        <button title="close" onClick={() => setOpacity("0")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={"30px"}
            fill="#394152"
          >
            <path d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z" />
          </svg>
        </button>
      </div>
      {/* create task input fields */}
      <form className="my-4">
        {/* title */}
        <label className="block">Title</label>
        <input
          className="m-3 p-3 border"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* description */}
        <label className="block">Description</label>
        <textarea
          className="m-3 p-3 border"
          type="text-area"
          placeholder="Description"
          maxLength="10000"
          minLength="50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* due date */}
        <label className="block">Due Date</label>
        <input
          className="m-3 p-3 border"
          type="date"
          placeholder="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        {/* select tag high, low, medium */}
        <label> Tag </label>
        <select
          className="m-3 p-3 border"
          onChange={(e) => setPriority(e.target.value)}
          value={priority}
        >
          <option value="" disabled hidden>
            Select a Priority Tag.
          </option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <div className="create-task my-4">
          <button
            type="button"
            className="cr-btn"
            onClick={handleCreateTask}
            disabled={
              title == "" ||
              description == "" ||
              dueDate == "" ||
              priority == ""
                ? true
                : false
            }
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
