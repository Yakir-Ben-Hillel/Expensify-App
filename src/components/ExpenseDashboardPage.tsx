import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/@types/state-interfaces';
import { startSetExpenses } from '../redux/actions/expensesActions';
import ExpenseList from './expenseTable';
import AddExpenseSnackBar from './SnackBars/AddExpenseBar';
interface IProps {
  startSetExpenses: () => void;
  isMounted: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(25)
    }
  })
);

const ExpenseDashboardPage: React.FC<IProps> = props => {
  React.useEffect(() => {
    new Promise((resolve, reject) => {
      props.startSetExpenses();
      setTimeout(() => {
        resolve();
      }, 2500);
    }).then(() => {
      SetIsMounted(true);
      console.log('mounted');
    }); // eslint-disable-next-line
  }, []);

  const [isMounted, SetIsMounted] = React.useState(false);
  const classes = useStyles();
  return (
    <div>
      {isMounted ? (
        <div>
          {' '}
          <ExpenseList />
          <AddExpenseSnackBar
            variant='success'
            massage='Expense added sucessesfuly!'
          />
        </div>
      ) : (
        <div className={classes.root}>
          <CircularProgress size={60} />
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = {
  startSetExpenses
};
const mapStateToProps = (state: AppState) => {
  return {
    expenses: state.expenses,
    snackBar: state.snackBar
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseDashboardPage);
