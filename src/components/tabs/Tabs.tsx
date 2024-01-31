"use client"
import { useMediaQuery, Tabs, Tab, Box, AppBar, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';

import { usePathname } from 'next/navigation';

import { useTheme } from '@emotion/react';
import { useRouter } from 'next/navigation'

const tabRoutes = [
  { name: "Inspections", path: "/" },
  { name: "Venues", path: "/venues" },
  { name: "Admins", path: "/admins" },
  { name: "Group Inspectors", path: "/groupinspectors" },
  { name: "Devices", path: "/devices" },
];
function a11yProps(index: number) {

  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function PciTabs() {
  const theme = useTheme();
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const path = usePathname();
  const currentTabIndex = tabRoutes.findIndex(route => route.path === path);
  return (
    !isMobile ?
      <Box sx={{ marginTop: '10px', marginBottom:"30px" }}>
        <AppBar position="static" sx={{ background: "#1CA5D4" }}>
          <Tabs
            value={currentTabIndex === -1 ? false : currentTabIndex}
            variant="standard"
            aria-label="full width tabs example"
          >
            {tabRoutes.map((route, index) => (
              <Tab key={route.name} label={route.name} onClick={() => router.push(route.path)} {...a11yProps(index + 1)} sx={{
                color: "#fff",
                '&.Mui-selected': {
                  background: '#00FFFF',
                  color: "#000",
                  borderBottom: '2px solid #00FFFF',
                }
              }} />
            ))}
          </Tabs>
        </AppBar>
      </Box>
      : <div />
  );
}
