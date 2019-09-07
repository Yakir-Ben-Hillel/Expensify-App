import { IExpense } from '../@types/state-interfaces';
import { ExpenseActionTypes } from '../@types/types';

const expensesReducerDefaultState: IExpense[] = [];

const expensesReducer = (
  state = expensesReducerDefaultState,
  action: ExpenseActionTypes
) => {
  switch (action.type) {
    case 'ADD_EXPENSE': {
      if (action.place !== undefined) {
        //in case of edit
        const arrayBeforeAddedExpense = state.slice(0, action.place);
        const arrayAfterAddedExpense = state.slice(action.place);
        return [
          ...arrayBeforeAddedExpense,
          action.expense,
          ...arrayAfterAddedExpense
        ];
      } else return [...state, action.expense];
    }
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    case 'SET_EXPENSES':
      return [...action.expenses, ...state];
    default:
      return state;
  }
};
export default expensesReducer;
