import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { startRemoveExpense } from '../../redux/actions/expensesActions';
import { connect } from 'react-redux';

import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface IProps {
  open: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startRemoveExpense: (id: string) => void;
  uid: string | null;
}
const RemoveDialog: React.FC<IProps> = props => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.setDialogOpen(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Are you sure you want to delete the expense?'}
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={() => props.setDialogOpen(false)} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (props.uid) props.startRemoveExpense(props.uid);
              props.setDialogOpen(false);
            }}
            color='primary'
            autoFocus
          >
            Yes, remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapDispatchToProps = {
  startRemoveExpense
};
export default connect(
  null,
  mapDispatchToProps
)(RemoveDialog);
