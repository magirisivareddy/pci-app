"use client"
import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/navigation';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useTheme } from '@emotion/react';
import { ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { tokens } from '@/theme/theme';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setMobileView } from '@/redux/features/headerSlice';



export default function MenuAppBar() {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const colors = tokens(theme?.palette.mode);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSideBar = useAppSelector((state) => state.header.value.isSideBar)
  useEffect(() => {
    if (isMobile) {
      dispatch(setMobileView(true))
    }
    dispatch(setMobileView(false))
  }, [isMobile])
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenu = () => {
    dispatch(setMobileView(!isSideBar))
  }


  return (
    <Box sx={{ flexGrow: 1 , marginBottom:"4rem"}}>
      <AppBar position="fixed"  >
        <Toolbar sx={{ width: isMobile ? "100%" : "90%", margin: "0 auto" }}>
          <Typography variant={isMobile?"h4":"h3"} component="div" sx={{ flexGrow: 1, fontWeight: "600" }}  >
            KC PCI INSPECTION
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle sx={{ width: "30px", height: "30px" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                sx={{
                  marginTop:"50px"
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <ExitToAppIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>

            </div>
          )}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenu}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

        </Toolbar>

      </AppBar>
    </Box>
  );
}