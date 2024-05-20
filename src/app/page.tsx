"use client";
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import { Suspense } from "react";
import Loading from "./loading";
import Inspections from "@/components/inspections/Inspections";
import isAuth from "@/components/is-auth/IsAuth";

  const Home = () => {

  return (
    <main >
      {/* <CustomBreadcrumbs /> */}
      <Suspense fallback={<Loading />}>
        <Inspections/>
      </Suspense>

    </main>
  );
}
export default isAuth(Home);
