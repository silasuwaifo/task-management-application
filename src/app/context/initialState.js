export const initialState = {
  task:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("task")) || []
      : [],
  currentUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user")) || null
      : null,
};
