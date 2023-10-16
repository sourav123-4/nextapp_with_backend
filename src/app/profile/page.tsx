"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function ProfilePage() {
  const router = useRouter();
  const onLogout = async () => {
    await axios.get("/api/users/logout")
    router.push("/login");
  };
  return (
    <div>
      <h1>Profile page</h1>
      <button
        className="bg-red-500 w-[200px] h-[50px] rounded-3xl mt-[40px]"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;
