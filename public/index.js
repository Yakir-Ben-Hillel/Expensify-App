// @ts-nocheck
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { firebase } from './database/firebase';
import { login, logout } from './redux/actions/auth';
import { startSetExpenses } from './redux/actions/expensesActions';
import 'normalize.css/normalize.css';
const store = configureStore();
const Application = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(<Application />, document.getElementById('root'));
    hasRendered = true;
  }
};
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses());
    renderApp();
    if (history.location.pathname === '/') history.push('/dashboard');
    console.log('logged in');
  } else {
    store.dispatch(logout());
    renderApp();
    console.log('logout');
    history.push('/');
  }
});
