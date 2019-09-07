import { InputAdornment, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';

interface IDescription {
  description: string;
  onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Description: React.FC<IDescription> = ({
  description = '',
  onDescriptionChange
}) => {
  const [touch, SetTouch] = React.useState(false);
  const [userInsertedInput, SetUserInsertedInput] = React.useState(false);
  const error = description === '' && touch && userInsertedInput;
  return (
    <div>
      <FormControl>
        <TextField
          id='filled-adornment-description'
          margin='dense'
          required
          label='Description'
          error={error}
          onFocus={() => SetTouch(true)}
          helperText={error ? 'Description is empty!' : ''}
          value={description}
          onChange={onDescriptionChange}
          onChangeCapture={() => {
            SetUserInsertedInput(true);
          }}
          InputProps={{
            endAdornment: error && (
              <InputAdornment position='end'>
                <ErrorIcon color='secondary' />
              </InputAdornment>
            )
          }}
        />
      </FormControl>
    </div>
  );
};
export default Description;
