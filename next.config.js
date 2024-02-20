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
        {
          source: "/api/inspections",
          destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Search/SearchInspections`,
        },
        {
          source: "/api/viewReport",
          destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}Report/ViewReport`,
        },
        {
          source: "/api/common/GetVenues",
          destination: `${process.env.PCI_API_URL}common/GetVenues`,
        },
        {
          source: "/api/common/GetInspectors",
          destination: `${process.env.NEXT_PUBLIC_PCI_API_URL}/common/GetInspectors`,
        },
      ];
    },
  
  };
  module.exports = nextConfig;
  