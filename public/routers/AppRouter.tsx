import clsx from 'clsx';
import createHistory from 'history/createBrowserHistory';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import Bar from '../components/AppBar';
import useStyles from '../components/AppBarComponents/useStyles';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import Login from '../components/loginPage';
import NotFoundPage from '../components/NotFoundPage';
import { AppState } from '../redux/@types/state-interfaces';
export const history = createHistory();
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
          <Switch>
            <Route
              path='/'
              component={!props.isAuthenticated ? Login : ExpenseDashboardPage}
              exact={true}
            />
            <Route
              path='/dashboard'
              component={props.isAuthenticated ? ExpenseDashboardPage : Login}
            />
            <Route path='/help' component={HelpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>{' '}
    </Router>
  );
};

const MapStateToProps = (state: AppState) => ({
  isAuthenticated: !!state.authentication.uid
});
export default connect(MapStateToProps)(AppRouter);
