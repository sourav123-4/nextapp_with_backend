"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function signUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSignUp = async () => {
    try {
       const createduUser = await axios.post("/api/users/signup",user);
       console.log("createduser",createduUser);
       if(createduUser){
        toast.success("User Created Successfully !!");
        router.push("/login");
       }
    } catch (err:any) {
      toast.error(err.message)
      console.log("err is", err);
    }
  };
  return (
    <div className=" flex flex-col w-[500px] items-center text-center gap-5 bg-slate-600 h-[500px] m-5 p-5 rounded-md self-center">
      <h1 className=" mb-8 font-bold font-sans text-2xl text-white">
        SignUp Page
      </h1>
      <input
        className=" w-[400px] h-10 rounded-lg text-black text-[16px] pl-[10px]"
        placeholder="Enter your username"
        name="userName"
        value={user.userName}
        onChange={handleChange}
      />
      <input
        className=" w-[400px] h-10 rounded-lg text-black text-[16px] pl-[10px]"
        placeholder="Enter your email"
        name="email"
        value={user.email}
        onChange={handleChange}
      />
      <input
        className=" w-[400px] h-10 rounded-lg text-black text-[16px] pl-[10px]"
        placeholder="Enter your password"
        name="password"
        value={user.password}
        onChange={handleChange}
      />
      <button className="bg-green-500 w-[200px] h-[50px] rounded-3xl" onClick={onSignUp}>
        SignUp
      </button>
      <Link href="/login" className=" text-blue-500">
        Already a user ? Sign In
      </Link>
    </div>
  );
}

export default signUp;
