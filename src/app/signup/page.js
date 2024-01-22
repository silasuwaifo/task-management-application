"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import AppContext from "../context/appContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../config/firebase.js";
import Image from "next/image";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function SignUp() {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { authDispatch } = useContext(AppContext);

  useEffect(() => {
    const uploadFile = () => {
      const metadata = {
        contentType: "image/jpeg",
      };

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress == 100) {
              alert("image upload successful")
            }
          switch (snapshot.state) {
            case "paused":
              break;
            case "running":
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFile((prev=> ({...prev, img:downloadURL})));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await setDoc(doc(db, "users", res.user.uid), {
        name: name,
        gender: gender,
        email: email,
        password: password,
        img: file,
        timStamp: serverTimestamp(),
      });
      authDispatch({
        type: "LOGIN",
        payload: { email: user.email, id: res.user.uid },
      });
      router.push("/");
    } catch (error) {}
  };

  return (
    <div className="form-container l-50 t-40 backdrop-blur-3xl">
      {/* create task input fields */}
      <form className="my-4" onSubmit={handleSignUp}>
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
        {/* file */}
        <div className="align-center" id="image">
          <label htmlFor="file" className="text-center js-center text-small">
            {file && file.img ? (
              <div
                className="placeholder align-center"
                style={{
                  backgroundImage: `url(${file.img})`,
                }}
              ></div>
            ) : (
              <div
                className="placeholder align-center"
                style={{
                  backgroundImage:
                    file && file.img
                      ? `url(${file.img})`
                      : `url(${"/assets/placeholder.png"})`,
                }}
              ></div>
            )}
            Upload image
          </label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        {/* Name */}
        <label className="block">Name</label>
        <input
          required
          className="m-3 p-3 border"
          type="text"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        {/* Name */}
        <label>Gender</label>
        <select
          required
          className="m-3 p-3 border"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        >
          <option value="" disabled hidden>
            Select Gender.
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {/* Email */}
        <label className="block">Email</label>
        <input
          required
          className="m-3 p-3 border"
          type="email"
          placeholder="Enter email..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* Password */}
        <label className="block">Password</label>
        <input
          required
          className="m-3 p-3 border"
          type="password"
          placeholder="Enter password.."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="create-task my-4">
          <button type="submit" className="cr-btn font-medium">
            Sign up
          </button>
        </div>
        {error && (
          <p className="block text-center text-red-400">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
