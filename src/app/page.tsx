
import { fetchInspectors, fetchVenue } from "@/actions/api";
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import InspectionsFilters from "@/components/inspections/inspections-filters/InspectionsFilters";
import { Suspense } from "react";
import Loading from "./Loading";
import Inspections from "@/components/inspections/Inspections";
export default async function Home() {
  const venues = await fetchVenue();
  const inspectors = await fetchInspectors();
  return (
    <main >
      {/* <CustomBreadcrumbs /> */}
      <Suspense fallback={<Loading />}>
        <Inspections venueDropdown={venues} inspectorsDropdown={inspectors}/>
        {/* <InspectionsFilters venueDropdown={venues} inspectorsDropdown={inspectors} /> */}
      </Suspense>

    </main>
  );
}

