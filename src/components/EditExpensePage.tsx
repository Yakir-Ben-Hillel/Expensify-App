import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
interface IProps {
  open: boolean;
  handleOpen(): void;
  handleClose(): void;
}
const EditExpense: React.FC<IProps> = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.handleClose()}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleClose()} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => props.handleClose()} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default EditExpense;
