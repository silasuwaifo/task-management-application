"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "../context/appContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.js";
import Image from "next/image";
import Link from "next/link";

function SignIn() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const { authDispatch, isAuth } = useContext(AppContext); 
 

  const handleSignIn = (e) => {
    e.preventDefault;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
        authDispatch({type: "LOGIN", payload: {email: user.email, id: user.uid}})
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);

        setError(true);
        const timeoutId = setTimeout(() => {
          setError(false);
        }, 5000);

        return () => clearTimeout(timeoutId);
      });
  };

  return (
    <div className="form-container l-50 backdrop-blur-3xl">
      {/* create task input fields */}
      <form className="my-4">
        {/* Heading */}
        <div className="flex justify-center ">
          <Image
            src="/assets/teachmate.png"
            width={38}
            height={40}
            className="inline-block "
            alt="TeachMateLogo"
          />
          <h3 className="text-center ms-3 inline-block fs-xl font-medium">
            TeachMateAI
          </h3>
        </div>

        {/* Email */}
        <label className="block">Email</label>
        <input
          className="m-3 p-3 border"
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value), console.log(email);
          }}
        />
        {/* Password */}
        <label className="block">Password</label>
        <input
          className="m-3 p-3 border"
          type="password"
          placeholder="Password.."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value), console.log(password);
          }}
        />
        <div className="create-task mt-4">
          <button
            type="button"
            className="cr-btn font-medium"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        </div>
          <div className="text-center block">
          <Link className="text-orange-400 drop-shadow-md font-bold js-center text-center inline-block p-4" href={'/signup'}>Sign Up</Link>
          </div>
        {error && (
          <p className="block text-center text-red-400">
            Wrong email or password
          </p>
        )}
      </form>
    </div>
  );
}

export default SignIn;
