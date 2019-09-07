import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from '../ExpenseFormFnc';
interface INote {
  note: string;
  onNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const Note: React.FC<INote> = ({ note, onNoteChange }) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        id='filled-adornment-multiline-flexible'
        placeholder='Add your note here...'
        label='Note'
        multiline
        rowsMax='4'
        value={note}
        onChange={onNoteChange}
        className={clsx(classes.textField, classes.root)}
        margin='dense'
      />{' '}
    </div>
  );
};
export default Note;
