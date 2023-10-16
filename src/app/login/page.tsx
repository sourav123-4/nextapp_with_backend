"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onLogin = async () => {
    try{
      const loginUser = await axios.post("/api/users/login", user);
      if (loginUser) {
        toast.success("Login Successfull !!!");
        router.push("/profile");
      } else {
        toast.error("user or password is incorrect");
      }
    }catch(err:any){
      toast.error(err.message);
    }
    
  };
  return (
    <div className=" flex flex-col w-[500px] items-center text-center gap-5 bg-slate-600 h-[500px] m-5 p-5 rounded-md self-center">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className=" mb-8 font-bold font-sans text-2xl text-white">
        Login Page
      </h1>
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
      <button
        className="bg-green-500 w-[200px] h-[50px] rounded-3xl mt-[40px]"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup" className=" text-blue-500">
        Not a user ? Sign Up
      </Link>
    </div>
  );
}
