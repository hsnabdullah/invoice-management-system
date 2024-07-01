"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../assets/icon/logo1.svg";
import { DropdownMenuDemo } from "../DropDownMenu";
import ModeToggle from "../modeToggle";
import Cookies from "js-cookie";
export default function SideBar() {
  // usename get
  const [username, setUserName] = useState("");
  // useEffect(() => {
  //   const user = JSON.parse(Cookies.get("user"));
  //   if (user && user.name) {
  //     setUserName(user.name);
  //   }
  // });
  useEffect(() => {
    try {
      const user = JSON.parse(Cookies.get("user"));
      if (user) {
        const user = JSON.parse(user);
        if (user && user.name) {
          setUserName(user.name);
        }
      }
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
  }, []);
  return (
    <>
      <div className="min-h-screen fixed top-0 bottom-0 z-10 bg-[#373B53] dark:bg-[#1E2139] w-[120px] items-center rounded-e-3xl overflow-hidden">
        <div className="w-full h-[100vh] relative">
          <div className="absolute h-32 top-0 w-full left-0">
            <div className=" bg-primary absolute h-32 top-0 w-full left-0 rounded-e-3xl"></div>
            <div className=" bg-secondary absolute h-16 top-16 w-full left-0 rounded-tl-3xl rounded-ee-3xl"></div>
            <Image
              src={logo}
              alt="logo"
              className="absolute top-10 left-10 h-12 w-12 "
            />
          </div>
          <div className="absolute z-20 h-52 bottom-0 w-full left-0">
            <div className="flex justify-center ">
              <ModeToggle />
            </div>
            <div className=" pb-10 pt-10">
              <hr className="border-[#494E6E]" />
            </div>
            <div className="flex flex-col justify-center items-center">
              <DropdownMenuDemo />
              <span className=" capitalize text-base dark:text-white text-white">
                {username}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
