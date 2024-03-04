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
  buttonType?: 'button' | 'submit' | 'reset' | 'Okay'
  buttonText?: string
  footerLink?: string
  onFooterLink?: any

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
  buttonText,
  buttonType,
  footerLink,
  onFooterLink
}: ScrollDialogProps): ReactElement => {
  const ContentComponent = contentComponent || (() => null);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        PaperProps={{
          sx: {
            overflowX: 'hidden',
          },
        }}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
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
        <DialogTitle color={"primary"} id="scroll-dialog-title"> <span><b>{title}</b></span></DialogTitle>
        <DialogContent dividers={true} sx={{ overflowX: 'hidden' }}>
          <ContentComponent />
        </DialogContent>
        {(handleCancel || handleSubscribe) && (
          <DialogActions>
            {onFooterLink && footerLink && <Button onClick={onFooterLink}>{footerLink}</Button>}
            {handleCancel && <Button variant='outlined' onClick={handleCancel}>Cancel</Button>}
            {handleSubscribe && (
              <Button
                sx={{ marginRight: "20px" }}
                type={buttonType === 'submit' ? 'submit' : 'button'}
                onClick={handleSubscribe}
                variant="contained"
                color="primary"
              >
                {buttonText ?? "Save"}
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
