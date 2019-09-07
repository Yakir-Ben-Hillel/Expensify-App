import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import expensesReducer from '../reducers/expensesReduce';
import filtersReducer from '../reducers/filtersReducer';
import snackBarReducer from '../reducers/snackBarReduce';
import thunk from 'redux-thunk';
// Store creation
export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
      snackBar: snackBarReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};
