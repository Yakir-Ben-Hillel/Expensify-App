import clsx from 'clsx';
import { createBrowserHistory } from 'history';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import Bar from './AppBar';
import useStyles from './AppBarComponents/useStyles';
import ExpenseDashboardPage from './ExpenseDashboardPage';
import Signup from './authPages/signup';
import Login from './authPages/loginPage';
import NotFoundPage from './NotFoundPage';
import { AppState } from '../redux/@types/state-interfaces';
export const history = createBrowserHistory();
interface IProps {
  isAuthenticated: boolean;
}
const AppRouter: React.FC<IProps> = props => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <Router history={history}>
      <div>
        {props.isAuthenticated && <Bar open={open} setOpen={setOpen} />}
        <main
          className={clsx(classes.content, classes.grow, {
            [classes.contentShift]: open
          })}
        >
          {props.isAuthenticated ? (
            <Switch>
              <Route exact path='/' component={ExpenseDashboardPage} />
              <Route component={NotFoundPage} />
            </Switch>
          ) : (
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route component={NotFoundPage} />
            </Switch>
          )}
        </main>
      </div>{' '}
    </Router>
  );
};

const MapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.authentication.uid
});
export default connect(MapStateToProps)(AppRouter);
