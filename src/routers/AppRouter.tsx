import clsx from 'clsx';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Bar from '../components/AppBar';
import useStyles from '../components/AppBarComponents/useStyles';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div>
        <Bar open={open} setOpen={setOpen} />
        <main
          className={clsx(classes.content, classes.grow, {
            [classes.contentShift]: open
          })}
        >
          <Switch>
            <Route path='/' component={ExpenseDashboardPage} exact={true} />
            <Route path='/help' component={HelpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};
export default AppRouter;
