import DataFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React from 'react';
import * as ExpenseFnc from '../ExpenseFormFnc';

interface IDatePicker {
  createdAt: MaterialUiPickersDate;
  onDateChange: (createdAt: MaterialUiPickersDate) => void;
}
const DatePicker: React.FC<IDatePicker> = ({ createdAt, onDateChange }) => {
  const classes = ExpenseFnc.useStyles();
  return (
    <div>
      <MuiPickersUtilsProvider utils={DataFnsUtils}>
        <KeyboardDatePicker
          className={classes.root}
          margin='dense'
          id='date-picker-dialog'
          label='date-picker-dialog'
          format='dd/MM/yyyy'
          value={createdAt}
          onChange={onDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};
export default DatePicker;
