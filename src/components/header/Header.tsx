import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, useTheme, Avatar, Menu, MenuItem, Box, Badge, Popover, Paper, List, ListItem, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Header = ({ onMenuClick }: any) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState<number>(4);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // For the notification popover
  const [notificationPopoverAnchor, setNotificationPopoverAnchor] = useState<null | HTMLElement>(null);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationPopoverAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationPopoverAnchor(null);
  };

  const dummyNotifications = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  ];

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

        <Box sx={{ display: "flex", flexGrow: 1, gap: "1rem", justifyContent: "right" }} >
          {/* <IconButton
            edge="end"
            color="inherit"
            aria-label="notifications"
            size='small'
            onClick={handleNotificationClick}
          > <Badge badgeContent={notificationCount} color="error" >
              <NotificationsNoneOutlinedIcon sx={{ color: "#fff", width: "30px", height: "30px" }} />
            </Badge>

          </IconButton> */}

          <Popover
            open={Boolean(notificationPopoverAnchor)}
            anchorEl={notificationPopoverAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Paper sx={{ padding: '1rem', width: '300px' }}>
              <Typography variant="h5" color="primary" textAlign={"center"} gutterBottom>
                Notifications
              </Typography>
              <List>
              {dummyNotifications.map((notification, index) => (
                <ButtonBase
                  key={index}
                  onClick={() => {
                    // Handle click action for the notification item
                    console.log(`Notification ${index + 1} clicked`);
                  }}
                  sx={{
                    width: '100%',
                    padding: '8px 16px',
                    borderBottom: '1px solid #e0e0e0',
                    '&:hover': {
                      backgroundColor: '#f5f5f5', // Change color on hover
                    },
                  }}
                >
                  <Typography variant="body1">{notification}</Typography>
                </ButtonBase>
              ))}
              </List>
            </Paper>
          </Popover>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
            size='small'
          >
            <Avatar sizes='small' sx={{ width: "35px", height: "35px" }} />
          </IconButton>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <LogoutIcon /> Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
