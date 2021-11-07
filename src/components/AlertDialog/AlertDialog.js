import {Button, Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core/';

export default function AlertDialog({isOpen,title,body,handleAgree,handleDisagree, agreeTxt,disagreeTxt, handleClose}) {
  return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {handleDisagree ? <Button onClick={handleDisagree} color="primary">
            {disagreeTxt}
          </Button> : null}
          {handleAgree ? <Button onClick={handleAgree} color="primary" autoFocus>
            {agreeTxt}
          </Button> : null}
        </DialogActions>
      </Dialog>
  );
}