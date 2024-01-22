"use client";

export const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case "DELETE_TASK":
      return {
        ...state,
        task: state.task.filter((item) => item.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        task: state.task.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                title: action.payload.title,
                description: action.payload.description,
                dueDate: action.payload.dueDate,
                priority: action.payload.priority,
              }
            : item
        ),
      };
    case "TOGGLE_STATUS":
      return {
        ...state,
        task: state.task.map((item) =>
          item.id === action.payload ? { ...item, status: !item.status } : item
        ),
      };
    default:
      return state;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};
