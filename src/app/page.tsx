
import { fetchInspectors, fetchVenue } from "@/actions/api";
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import InspectionsFilters from "@/components/inspections/inspections-filters/InspectionsFilters";
export default  async function Home() {
  const venues = await fetchVenue();
  const inspectors = await fetchInspectors();
  return (
    <main >
      {/* <CustomBreadcrumbs /> */}
      <InspectionsFilters venueDropdown={venues} inspectorsDropdown={inspectors}  />
   
    </main>
  );
}

