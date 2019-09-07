import Fab from '@material-ui/core/Fab';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import clsx from 'clsx';
import React from 'react';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
      marginLeft: '90%',
      top: theme.spacing(2)
    },
    absolute: {
      position: 'absolute',
      right: theme.spacing(7),
      //bottom: theme.spacing(9)
    }
  })
);
const AddExpenseTooltips: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title='Add Expense' aria-label='add' placement='right'>
        <Fab color='primary' className={clsx(classes.fab)} href='/create'>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
};
export default AddExpenseTooltips;
