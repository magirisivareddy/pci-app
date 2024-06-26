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
import EmailIcon from '@mui/icons-material/Email';

const RoleListItem = ({ avatarBackgroundColor, avatarText, roleTitle, roleDescription }: any) => (
    <ListItem disablePadding>
        <ListItemButton>
            <ListItemIcon>
                {roleTitle ? <Avatar
                    sx={{
                        width: 30,
                        height: 30,
                        fontSize: "12px",
                        backgroundColor: avatarBackgroundColor,
                    }}
                >
                    {avatarText}
                </Avatar> :
                    <EmailIcon sx={{
                        width: "1rem",
                        height: "1rem",

                    }} color={'error'} />
                }

            </ListItemIcon>
            <ListItemText
                primary={

                    roleTitle ?
                        <span><b>{roleTitle}: </b></span> : ""
                }
                secondary={
                    <Typography component="div" variant="body2" style={{ maxHeight: 100, width: "600px", overflowY: 'auto' }}>
                        {roleDescription}
                    </Typography>
                }
            />
        </ListItemButton>
    </ListItem>
);

const VenuesNotes = () => {
    return (
        <div style={{ marginTop: "10px" }}>
            <Typography sx={{ padding: "0 16px" }}>
                Venues can only be added/updated/deleted by Admins.
            </Typography>
            <List>
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
                <RoleListItem
                    avatarBackgroundColor="error"
                    avatarText=""
                    roleTitle=""
                    roleDescription="This indicates an inspector who does not have a company assigned email address. Without one, they will not have access to this app, and they won't be able to receive inspection notices."
                />

            </List>
        </div>
    );
};

export default VenuesNotes;
