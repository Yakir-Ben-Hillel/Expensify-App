import { FormControl } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { connect } from 'react-redux';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { IExpense, ISnackBar } from '../../redux/@types/state-interfaces';
import { SetSnackBarStatus } from '../../redux/@types/types';
import {
  startAddExpense,
  startEditExpense
} from '../../redux/actions/expensesActions';
import { setSnackBarStatus } from '../../redux/actions/snackBarActions';
import Amount from './AmountComponent';
import DatePicker from './DateComponent';
import Description from './DescriptionComponent';
import Note from './NoteComponent';

interface IProps {
  open: boolean;
  isUpdating: boolean;
  expense?: IExpense;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startAddExpense: (expenseData: {
    description: string;
    note?: string | undefined;
    amount: number;
    createdAt?: string | undefined;
  }) => void;
  startEditExpense: (
    id: IExpense['id'],
    updates: {
      id?: string;
      description?: string;
      note?: string;
      amount?: number;
      createdAt?: string;
    }
  ) => void;
  setSnackBarStatus: (snackBarStatus: ISnackBar) => SetSnackBarStatus;
}
const FormDialog: React.FC<IProps> = props => {
  const [description, SetDescription] = React.useState(
    props.expense ? props.expense.description : ''
  );
  const [amount, SetAmount] = React.useState(
    props.expense ? props.expense.amount : 0
  );
  const [createdAt, SetCreatedAt] = React.useState(
    props.expense ? new Date(props.expense.createdAt) : new Date()
  );
  const [note, SetNote] = React.useState<string | undefined>(
    props.expense ? props.expense.note : ''
  );

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const description = e.target.value;
    SetDescription(description);
  };
  const onNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const note = e.target.value;
    SetNote(note);
  };
  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      SetAmount(parseFloat(amount));
    }
  };
  const onDateChange = (createdAt: MaterialUiPickersDate) => {
    if (createdAt) {
      SetCreatedAt(createdAt);
    }
  };
  React.useEffect(() => {
    if (props.expense !== undefined) {
      SetDescription(props.expense.description);
      SetAmount(props.expense.amount);
      SetCreatedAt(new Date(props.expense.createdAt));
      SetNote(props.expense.note);
    }
  }, [props.expense]);

  const onClear = () => {
    SetDescription('');
    SetAmount(0);
    SetCreatedAt(new Date());
    SetNote('');
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const expense = {
      description,
      amount,
      createdAt: createdAt.toDateString(),
      note
    };
    if (props.isUpdating && props.expense) {
      if (props.expense.description && props.expense.amount)
        props.startEditExpense(props.expense.id, expense);
    } else {
      props.startAddExpense(expense);
      props.setSnackBarStatus({
        isOpenAddExpense: true,
        isOpenError: false
      });
    }
    props.setDialogOpen(false);
    setTimeout(() => onClear(), 0);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.setDialogOpen(false);
          setTimeout(() => onClear(), 0);
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {!props.isUpdating ? 'Add Expense' : 'Edit Expense'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            description and amount are required.
          </DialogContentText>
          <FormControl>
            <form id='form-dialog' onSubmit={onSubmit}>
              <Description
                description={description}
                onDescriptionChange={onDescriptionChange}
              />
              <Amount amount={amount} onAmountChange={onAmountChange} />
              <DatePicker createdAt={createdAt} onDateChange={onDateChange} />
              <Note note={note} onNoteChange={onNoteChange} />
              <DialogActions>
                <Button
                  onClick={() => {
                    props.setDialogOpen(false);
                    setTimeout(() => onClear(), 0);
                  }}
                  color='primary'
                  type='reset'
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  id='form-dialog'
                  color='primary'
                  autoFocus
                >
                  Save
                </Button>
              </DialogActions>
            </form>
          </FormControl>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const mapDispatchToProps = {
  startAddExpense,
  startEditExpense,
  setSnackBarStatus
};
export default connect(
  null,
  mapDispatchToProps
)(FormDialog);
