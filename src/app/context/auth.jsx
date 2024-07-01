"use client";
import React, { useContext } from "react";
import { AuthContext } from "./auth-context";
import SideBar from "../../components/sidebar/page";

export default function Auth({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="grid grid-cols-12">
      {isAuthenticated && (
        <div className="col-span-1">
          <SideBar />
        </div>
      )}
      <div
        className={
          isAuthenticated
            ? "col-span-11 w-3/5 mx-auto pt-20 px-10"
            : "col-span-12 w-3/5 mx-auto pt-20 px-10"
        }
      >
        {children}
      </div>
    </div>
  );
}
