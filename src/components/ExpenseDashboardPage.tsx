import { createStyles, makeStyles, Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/@types/state-interfaces';
import { startSetExpenses } from '../redux/actions/expensesActions';
import ExpenseList from './expenseTable';
import { BreakpointProvider } from 'react-socks';
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
      setTimeout(() => {
        resolve();
      }, 2000);
    }).then(() => {
      SetIsMounted(true);
    }); // eslint-disable-next-line
  }, []);

  const [isMounted, SetIsMounted] = React.useState(false);
  const classes = useStyles();
  return (
    <div>
      {isMounted ? (
        <div>
          <BreakpointProvider>
            {' '}
            <ExpenseList />
            <AddExpenseSnackBar
              variant='success'
              massage='Expense added sucessesfuly!'
            />
          </BreakpointProvider>
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
