import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, useTheme, Avatar, Menu, MenuItem, Box, Badge, Popover, Paper, List, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import HelpdeskTicketForm from '../inspections/helpdesk-ticket/HelpdeskTicketForm';
import Modal from '../common/modal/Modal';

import BookOnlineOutlinedIcon from '@mui/icons-material/BookOnlineOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useMsal } from '@azure/msal-react';
import { useAppSelector } from '@/redux/hooks';

const Header = ({ onMenuClick }: any) => {
  const theme = useTheme();
  const { employeeInfo } = useAppSelector((state: { common: any; }) => state.common)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationCount, setNotificationCount] = useState<number>(4);
  const [isHelpDeskModal, setHelpDeskModal] = useState(false)
  const [notificationPopoverAnchor, setNotificationPopoverAnchor] = useState<null | HTMLElement>(null);
  const { instance, accounts } = useMsal();
  const imageUrl = false
  const name: any = accounts[0]?.name ?? "";
  const namesArray = name.split(" ");

  // Extract the first letter of the first name
  const firstNameFirstLetter = namesArray[0].charAt(0);

  // Extract the first letter of the last name
  const lastNameFirstLetter = namesArray[namesArray.length - 1].charAt(0);
  const iltials = `${firstNameFirstLetter}${lastNameFirstLetter}`

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationPopoverAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationPopoverAnchor(null);
  };

  const onHelpDeskModal = () => {
    setHelpDeskModal(true)
  }
  const handleModalClose = () => {
    setHelpDeskModal(false)
  }
  const handleLogout = () => {
    instance.logoutRedirect({
      onRedirectNavigate: (_url) => true,
    });
  };
  const dummyNotifications = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  ];

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{
              mr: 2, '@media screen and (max-width: 400px)': { // Adjust the max-width as needed
                gap: "2px"

              }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{
            display: "flex",
            gap: "5px",
            '@media screen and (max-width: 400px)': { // Adjust the max-width as needed
              gap: "2px",
            }
          }}>
            <CreditScoreOutlinedIcon sx={{
              width: "26px", height: "26px", marginTop: "2px", '@media screen and (max-width: 500px)': { // Adjust the max-width as needed
                width: "18px",
                height: "18px",
                marginTop: 0
              }
            }} />
            <Typography variant="h3" sx={{
              fontWeight: 600, whiteSpace: 'nowrap', '@media screen and (max-width: 500px)': { // Adjust the max-width as needed
                fontSize: "14px"
              }
            }}>
              NQ INSPECTION
            </Typography>
          </Box>


          <Box sx={{ display: "flex", flexGrow: 1, gap: "1rem", justifyContent: "right" }} >
            {/* Notification icon and popover */}
            {/* <IconButton
            edge="end"
            color="inherit"
            aria-label="notifications"
            size='small'
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={notificationCount} color="error" >
              <NotificationsNoneOutlinedIcon sx={{ color: "#fff", width: "30px", height: "30px" }} />
            </Badge>
          </IconButton> */}
            {/* Notification Popover */}
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
            {/* Avatar and dropdown menu */}
            <IconButton edge="end"
              color="inherit"
              aria-label="menu"
              onClick={onHelpDeskModal}
              size='small'>
              <BookOnlineOutlinedIcon sx={{

                width: '23px',
                height: "23px",
                '@media screen and (max-width: 400px)': { // Adjust the max-width as needed
                  width: "16px",
                  height: "16px"
                }
              }} /> <Typography sx={{
                '@media screen and (max-width: 400px)': { // Adjust the max-width as needed
                  fontSize: ".54rem"
                }
              }}>RAISE A TICKET</Typography>
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              size='small'
            // onError={() => setAvatarError(true)}
            >
              {!imageUrl ? (
                <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', textTransform: "uppercase", fontSize: "1rem", color: "#004f56" }}>
                    {iltials}
                  </Typography>
                </div>
              ) : (
                <Avatar sizes='small' sx={{ width: "35px", height: "35px" }} />
              )}
            </IconButton>
          </Box>
          {/* Menu items */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem sx={{ gap: "0.5rem", '&:hover': { backgroundColor: '#f5f5f5', color: '#000' } }} >
              <AccountCircleOutlinedIcon sx={{
                color: '#008c99'
              }} /> {accounts[0]?.name}
            </MenuItem>
            <MenuItem sx={{ gap: "0.5rem", '&:hover': { backgroundColor: '#f5f5f5', color: '#000' } }} >
              <EmailOutlinedIcon sx={{
                color: '#008c99'
              }} /> {accounts[0]?.username}
            </MenuItem>
            <MenuItem sx={{ gap: "0.5rem", '&:hover': { backgroundColor: '#f5f5f5', color: '#000' } }} >
              <ManageAccountsOutlinedIcon sx={{
                color: '#008c99'
              }} /> {employeeInfo?.role === "Audit" ? "Auditor" : employeeInfo?.role}
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ gap: "0.5rem", '&:hover': { backgroundColor: '#f5f5f5', color: '#000' } }} >
              <LogoutIcon sx={{
                color: '#008c99'
              }} /> Logout
            </MenuItem>

          </Menu>
        </Toolbar>
      </AppBar>
      <Modal
        title={'Helpdesk Ticket'}
        open={isHelpDeskModal}
        scroll={'paper'}
        handleClose={handleModalClose}
        contentComponent={(props) => <HelpdeskTicketForm handleModalClose={handleModalClose} />}
        fullWidth={true}
        maxWidth={"md"}
      />
    </>
  );
};

export default Header;
