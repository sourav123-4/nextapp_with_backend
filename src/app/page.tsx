"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const btnRef = useRef(null);
  const [openLogout, setOpenLogout] = useState(false);
  const router = useRouter();
  const onLogout = async () => {
    // await axios.get("/api/users/logout")
    // router.push("/login");
  };
  useEffect(() => {
    function handleClickOutside(event: any) {
      console.log("event", event.target);
      // if (btnRef && btnRef?.current && btnRef?.current?.contains(event.target)) {
      //   setOpenLogout(true);
      // }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [btnRef]);
  return (
    <div className="mt-5 flex flex-col align-middle justify-center items-end">
      <Image
        onClick={() => setOpenLogout(!openLogout)}
        className="rounded-full cursor-pointer mr-2"
        alt="logo"
        width={50}
        height={50}
        src="/istock.jpeg"
      />
      {openLogout && (
        <div
          ref={btnRef}
          className=" mr-2 mt-2 w-52 bg-lime-100 text-black text-2xl text-center rounded-md p-1 cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </div>
      )}
    </div>
  );
}
