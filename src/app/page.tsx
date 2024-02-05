
import { fetchData } from "@/actions/api";
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import InspectionsTable from "@/components/inspections/InspectionsTable";
import InspectionsFilters from "@/components/inspections/inspections-filters/InspectionsFilters";

export default async function Home() {
  const newData = await fetchData()
  return (
    <main >
      <CustomBreadcrumbs/>
      <InspectionsFilters/>
      <InspectionsTable data={newData}/>
    </main>
  );
}

