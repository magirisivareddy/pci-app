"use client";

import { useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { employeeInfo } = useAppSelector(state => state.common)
    const path = useParams
    console.log("path",path)

    const auth = true;
    useEffect(() => {
      if (!auth) {
        return redirect("/");
      }
    }, []);
    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}