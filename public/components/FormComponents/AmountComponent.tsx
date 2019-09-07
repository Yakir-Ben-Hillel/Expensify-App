import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
interface IAmount {
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Amount: React.FC<IAmount> = ({ amount, onAmountChange }) => {
  const [touch, SetTouch] = React.useState(false);
  const [userInsertedInput, SetUserInsertedInput] = React.useState(false);
  const error = amount === '' && touch && userInsertedInput;
  return (
    <div>
      <FormControl>
        <TextField
          margin='dense'
          id='filled-adornment-amount'
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
