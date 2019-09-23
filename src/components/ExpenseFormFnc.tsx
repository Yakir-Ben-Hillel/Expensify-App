import InputBase from '@material-ui/core/InputBase';
import { createStyles, makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import NumberFormat from 'react-number-format';

// eslint-disable-next-line

export function whichErrorMassageToDisplay(
  description: string,
  amount: number
): string {
  if (!description && !amount) return 'Description and Amount are required!';
  else if (!description && amount) return 'Description is required!';
  else return 'Amount is required!';
}

export function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
    />
  );
}

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
      }
    }
  })
)(InputBase);

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 'max'
    },
    formControl: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    },
    textField: {
      overflowWrap: 'break-word',
      flexBasis: 100
    }
  })
);

//import {IExpense} from '../redux/interfaces/state-interfaces'
export interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

export interface State {
  description: string;
  note: string;
  amount: number;
  createdAt: string;
}
