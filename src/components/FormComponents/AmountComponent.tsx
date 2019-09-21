import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';
import * as ExpenseFnc from '../ExpenseFormFnc';
import React from 'react';
interface IAmount {
  amount: string | number | null;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Amount: React.FC<IAmount> = ({ amount, onAmountChange }) => {
  const [touch, SetTouch] = React.useState(false);
  const [userInsertedInput, SetUserInsertedInput] = React.useState(false);
  const error = amount === '' && touch && userInsertedInput;
  const classes = ExpenseFnc.useStyles();
  return (
    <div>
      <FormControl className={classes.root}>
        <TextField
          margin='dense'
          id='filled-adornment-amount'
          autoComplete='off'
          //variant='filled'
          label='Amount'
          required
          value={amount || ''}
          onChange={onAmountChange}
          onChangeCapture={() => {
            SetUserInsertedInput(true);
          }}
          error={error}
          onFocus={() => {
            SetTouch(true);
          }}
          helperText={error ? 'Amount is empty!' : ''}
          InputProps={{
            startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            endAdornment: error && (
              <InputAdornment position='end'>
                <ErrorIcon color='secondary' />
              </InputAdornment>
            )
            // inputComponent: ExpenseFnc.NumberFormatCustom as any
          }}
        />{' '}
      </FormControl>
    </div>
  );
};
export default Amount;
