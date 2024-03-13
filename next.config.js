// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
    // output: 'standalone', 
  reactStrictMode: false,
  swcMinify: true,
  trailingSlash:true,
  env: {
    PCI_API_URL: 'https://esc-api.ktea.com/pci/dev/api/',
  },
  async rewrites() {
    return [
      //COMMON API
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
