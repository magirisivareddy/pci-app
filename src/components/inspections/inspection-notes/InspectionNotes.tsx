import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ErrorIcon from '@mui/icons-material/Error';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const InspectionNotes = () => {
    return (
        <div style={{ marginTop: "10px" }}>
            <List
                // sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}
                aria-label="contacts"
            >
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <DoneOutlineIcon color='success' />
                        </ListItemIcon>
                        <ListItemText primary="Has been inspected." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <ErrorIcon color='success' />
                        </ListItemIcon>
                        <ListItemText primary="To be inspected within the present week." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <ErrorIcon sx={{ color: "yellow" }} />
                        </ListItemIcon>
                        <ListItemText primary="To be inspected within 3 days." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <ErrorIcon color='warning' />
                        </ListItemIcon>
                        <ListItemText primary="To be inspected within 2 days." />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <ErrorIcon color='error' />
                        </ListItemIcon>
                        <ListItemText primary="Today is the last day to be inspected." />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton >
                        <ListItemIcon>
                            <CloseRoundedIcon color='error' />
                        </ListItemIcon>
                        <ListItemText primary="Was not inspected." secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="h6"
                                    color="text.primary"
                                >
                                    To Be Inspected
                                </Typography>
                                {` - The dates for Report Status of "To Be Inspected" are set to today's given week. So, "Date From.. to..." does not apply`}
                            </React.Fragment>
                        } />
                    </ListItemButton>
                </ListItem>



            </List>
        </div>
    );
}

export default InspectionNotes