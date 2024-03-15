
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import { Suspense } from "react";
import Loading from "./loading";
import Inspections from "@/components/inspections/Inspections";
export default function Home() {
  return (
    <main >
      {/* <CustomBreadcrumbs /> */}
      <Suspense fallback={<Loading />}>
        <Inspections/>
      </Suspense>

    </main>
  );
}

