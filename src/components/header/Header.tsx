import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, useTheme, Avatar, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout'; // import the logout icon

const Header = ({ onMenuClick }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h3" sx={{ fontWeight: 600 }} noWrap>
          NQ PCI INSPECTION
        </Typography>
        <Box sx={{ flexGrow: 1 }} /> {/* This will push the next elements to the right */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
          size='small'
        >
          <Avatar sizes='small' /> {/* Assuming this is your user profile */}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        
          <MenuItem onClick={handleClose}>  <LogoutIcon /> Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;