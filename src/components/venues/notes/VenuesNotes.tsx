import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
{/* <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <DoneOutlineIcon color='success' />
                        </ListItemIcon>
                        <ListItemText primary="Has been inspected." />
                    </ListItemButton>
                </ListItem> */}

const RoleListItem = ({ avatarBackgroundColor, avatarText, roleTitle, roleDescription }: any) => (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon >
                <Avatar
                    sx={{
                        width: 30,
                        height: 30,
                        fontSize: "12px",
                        backgroundColor: avatarBackgroundColor,
                    }}
                >
                    {avatarText}
                </Avatar>
            </ListItemIcon>
            <ListItemText
            primary=""
                secondary={
                    // <Typography>
                    <span><b>{roleTitle}: </b> {roleDescription}</span>

                    // </Typography>
                }
            />
        </ListItemButton>
    </ListItem>
);

const VenuesNotes = () => {
    return (
        <div style={{ marginTop: "10px" }}>
            <Typography sx={{
                padding: "0 16px"
            }}>
                Venues can only be added/updated/deleted by Admins.
            </Typography>
            <List >

                <RoleListItem
                    avatarBackgroundColor="green"
                    avatarText="MI"
                    roleTitle="Main Inspector"
                    roleDescription="are responsible to submit PCI Inspection reports for their assigned venue, and can add/remove Backup Inspectors for their assigned venue, but they cannot remove themselves - only an Admin can. There can only be one Main Inspector for each venue."
                />
                
                <RoleListItem
                    avatarBackgroundColor="#4c74b5"
                    avatarText="BI"
                    roleTitle="Backup Inspector"
                    roleDescription="are to act as a back-up inspector in the absence of their Main Inspector. There can be several Backup Inspectors for a given venue. Assigning a Backup Inspector is optional but highly recommended. They can only be added/removed by Admins."
                />
                <RoleListItem
                    avatarBackgroundColor="#bc48bc"
                    avatarText="GI"
                    roleTitle="Group Inspector"
                    roleDescription="are assigned to two or more venues with the ability to add/remove Main and Backup Inspectors. Group Inspectors can only be added/removed by Admins. Assigning a Group Inspector does not apply in most circumstances."
                /> 
            </List>
        </div>
    );
};

export default VenuesNotes;
