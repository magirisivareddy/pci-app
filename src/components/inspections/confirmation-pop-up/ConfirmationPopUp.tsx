import React from 'react';
import { Modal, Box, Typography, Button, Dialog, DialogContent } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
interface CustomModalProps {
    open: boolean;
    submitReport: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, submitReport }) => {
    return (
        <Dialog
            open={open}
            onClose={() => { }} // Add a dummy onClose handler since it's a required prop
            disableEscapeKeyDown

        >
            <DialogContent dividers={true} sx={{ overflowX: 'hidden' }}>
                <Box display="flex" alignItems="center">
                    <ErrorIcon color='error' />
                    <Typography variant="body1" sx={{ marginLeft: 1 }}>No further modifications to this record are allowed, once the deadline is passed today.</Typography>
                </Box>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="outlined" onClick={submitReport}>Okay</Button>
                </Box>
            </DialogContent>


        </Dialog>
    );
};

export default CustomModal;
