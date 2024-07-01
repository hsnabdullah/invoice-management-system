"use client";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import logoutPic from "../assets/img/logout.jpeg";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../app/context/auth-context";

export function DropdownMenuDemo() {
  const { logout } = useContext(AuthContext);

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("user");
    logout();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" !rounded-full w-10 border-none outline-none">
          <Image src={logoutPic} alt="logo" className="rounded-full" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="outline-none bg-primary focus:bg-none border-none text-white ">
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4 " />
          <button onClick={handleLogout}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
