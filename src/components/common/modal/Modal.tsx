import React, { FC, ReactElement } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Breakpoint } from '@mui/material';

interface ScrollDialogProps {
  title: string;
  open: boolean;
  scroll: 'paper' | 'body';
  handleClose: () => void;
  contentComponent?: FC;
  handleCancel?: () => void;
  handleSubscribe?: () => void;
  showCloseIcon?: boolean;
  fullWidth?: boolean;
  maxWidth?: false | Breakpoint | undefined;
  buttonType?: string

}

const Modal: FC<ScrollDialogProps> = ({
  title,
  open,
  scroll,
  fullWidth,
  handleClose,
  contentComponent,
  handleCancel,
  handleSubscribe,
  maxWidth,
  showCloseIcon = true,
  buttonType = "",
}: ScrollDialogProps): ReactElement => {
  const ContentComponent = contentComponent || (() => null);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      // PaperProps={{
      //   sx: {
      //     // Add styles for the header
      //     '& .MuiDialogTitle-root': {
      //       background: '#9ddbe0', color: 'rgba(0, 0, 0, 0.7)'
      //     },
      //     // Add styles for the footer
      //     '& .MuiDialogActions-root': {
      //       background: '#9ddbe0', color: 'rgba(0, 0, 0, 0.7)',
      //     },
      //   },
      // }}
      >
        {showCloseIcon && (
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={true}>
          <ContentComponent />
        </DialogContent>
        {(handleCancel || handleSubscribe) && (
          <DialogActions>
            {handleCancel && <Button variant='outlined' onClick={handleCancel}>Cancel</Button>}
            {handleSubscribe && (
            <Button type={buttonType} onClick={handleSubscribe} variant="contained" color="primary">
              Save
            </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
