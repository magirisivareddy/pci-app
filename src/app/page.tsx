
import InspectionsTable from "@/components/inspections/InspectionsTable";
import InspectionsFilters from "@/components/inspections/inspections-filters/InspectionsFilters";


export default function Home() {
  return (
    <main >
      <InspectionsFilters/>
      <InspectionsTable/>
    </main>
  );
}

