// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    PCI_API_URL: 'https://pciapplication.azurewebsites.net/api/',
  },
  async rewrites() {
    return [
      //INSPECTIONS API
      {
        source: "/api/inspections",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Search/SearchInspections`,
      },
      {
        source: "/api/viewReport",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Report/ViewReport`,
      },


      //COMMON API
      {
        source: "/api/common/GetVenues",
        destination: `${process.env.PCI_API_URL}common/GetVenues`,
      },
      {
        source: "/api/common/GetInspectors",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}/common/GetInspectors`,
      },



      // POST API
      {
        source: "/api/searchAdmins",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}search/SearchAdmins`,
      },
      {
        source: "/api/searchGroupInspectors",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}search/SearchGroupInspectors`,
      },
      {
        source: "/api/SearchDevices",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}search/SearchDevices`,
      },
      {
        source: "/api/searchVenues",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}search/SearchVenues`,
      },

      {
        source: "/api/AddUpdateDevice",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}device/AddUpdateDevice`,
      },
      {
        source: "/api/AddUpdateVenue",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}venue/AddUpdateVenue`,
      },
      {
        source: "/api/AddVenueToGroupInspector",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Inspector/AddVenueToGroupInspector`,
      },
      {
        source: "/api/ChangeAdminLevel",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Admin/ChangeAdminLevel`,
      },
      {
        source: "/api/AddGroupInspector",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Inspector/AddGroupInspector`,
      },
      {
        source: "/api/AddVenueInspector",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Inspector/AddVenueInspector`,
      },
      {
        source: "/api/InsertOrUpdateReport",
        destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}report/InsertOrUpdateReport`,
      },
     
      


    ];
  },

};
module.exports = nextConfig;
