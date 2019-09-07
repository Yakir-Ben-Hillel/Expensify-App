/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import './database/firebase';
import 'normalize.css/normalize.css';
import { startSetExpenses } from './redux/actions/expensesActions';
const store = configureStore();
//store.dispatch(startSetExpenses());
const Application = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<Application />, document.getElementById('root'));
