
import { fetchData } from "@/actions/api";
import CustomBreadcrumbs from "@/components/common/breadcrumb/Breadcrumb";
import InspectionsTable from "@/components/inspections/InspectionsTable";
import InspectionsFilters from "@/components/inspections/inspections-filters/InspectionsFilters";
import { useTransition } from "react";

export default async function Home() {
  const {data, islodaing} = await fetchData()
  return (
    <main >
      <CustomBreadcrumbs />
      <InspectionsFilters />
      <InspectionsTable data={data} islodaing={islodaing} />
    </main>
  );
}

