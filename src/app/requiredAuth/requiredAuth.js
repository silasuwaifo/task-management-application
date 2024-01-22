"use client"


import { useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "../context/appContext";


const RequiredAuth = ({ children }) => {
  const router = useRouter();
  const {isAuth} = useContext(AppContext)

  if (isAuth && !isAuth) {
    router.push("/signin");
    return null; 
  }

  return children; // Render children if authenticated
};

export default RequiredAuth;
