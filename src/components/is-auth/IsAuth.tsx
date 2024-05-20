"use client";
import { useState, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loading from "@/app/loading";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { employeeInfo } = useAppSelector((state) => state.common);
    const path = usePathname();
    const pathsByRole: any = {
      Admin: [
        "/",
        "/venues/",
        "/devices/",
        "/groupinspectors/",
        "/information/",
        "/inspector-admin/",
        "/report/venue-status-report/",
        "/report/venue-summary/",
        "/report/failed-devices-report/",
        "/report/venue-personnel/",
        "/report/missed-inspection/",
      ],
      GroupInspector: [
        "/",
        "/venues/",
        "/devices/",
        "/groupinspectors/",
        "/information/",
        "/report/venue-status-report/",
        "/report/venue-summary/",
        "/report/failed-devices-report/",
        "/report/venue-personnel/",
        "/report/missed-inspection/",
      ],
      BackupInspector: [
        "/",
        "/venues/",
        "/devices/",
        "/groupinspectors/",
        "/information/",
        "/report/venue-status-report/",
        "/report/venue-summary/",
        "/report/failed-devices-report/",
        "/report/venue-personnel/",
        "/report/missed-inspection/",
      ],
      MainInspector: [
        "/",
        "/venues/",
        "/devices/",
        "/groupinspectors/",
        "/information/",
        "/report/venue-status-report/",
        "/report/venue-summary/",
        "/report/failed-devices-report/",
        "/report/venue-personnel/",
        "/report/missed-inspection/",
      ],
      IT: ["/venues/", "/devices/", "/information/",], // Modified for IT role
      Audit: [
        "/",
        "/venues/",
        "/information/",
      ],
    };
    const roles = employeeInfo?.role?.split(",").map((role: string) => role?.trim());
    // const pathAccess = employeeInfo && pathsByRole[employeeInfo.role]?.includes(path);
    const pathAccess = employeeInfo && roles.some((role: string | number) => pathsByRole[role]?.includes(path));

    const [loading, setLoading] = useState(true);
    const [infoLoading, setInfoLoading] = useState(true); // Add loading state for employeeInfog)
    useEffect(() => {
      if (employeeInfo) {
        // Simulating async fetch of employeeInfo
        setTimeout(() => {
          setInfoLoading(false); // Set infoLoading to false when employeeInfo is fetched
        }, 1000); // Adjust the delay as per your requirement or replace with actual fetching mechanism
      }
    }, [employeeInfo]);

    useEffect(() => {
      if (!pathAccess && !infoLoading) { // Check if infoLoading is false before redirecting
        redirect("/");
      }
      
      // If user role is IT and path is not allowed, redirect to /venues/
      if (employeeInfo?.role === "IT" && !pathsByRole?.IT.includes(path)) {
        redirect("/venues/");
      }
    }, [employeeInfo, path, pathAccess, infoLoading]); // Add infoLoading as dependency

    useEffect(() => {
      // Set loading to false when component is mounted
      setLoading(false);
    }, []);

    if (loading || infoLoading) { // Check both loading states before rendering loader
      // Render loader while fetching employeeInfo
      return <Loading />;
    }

    if (!pathAccess) {
      return null;
    }

    return <Component {...props} />;
  };
}

