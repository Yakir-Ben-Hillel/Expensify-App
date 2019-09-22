import { IExpense, AppState } from '../@types/state-interfaces';
import {
  RemoveExpenseAction,
  EditExpenseAction,
  AddExpenseAction,
  SetExpensesAction
} from '../@types/types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import database from '../../database/firebase';
//Add Expense
export const addExpense = (
  expense: IExpense,
  place?: number
): AddExpenseAction => {
  return {
    type: 'ADD_EXPENSE',
    expense,
    place
  };
};
export const startAddExpense = (expenseData: {
  description: string;
  note?: string;
  amount: number;
  createdAt?: string;
}) => {
  return (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ) => {
    const uid = getState().authentication.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = new Date().toDateString()
    } = expenseData;
    const expense = {
      description,
      note,
      amount,
      createdAt
    };
    database
      .ref(`users/${uid}/expenses`)
      .push(expense)
      .then(ref => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense
          })
        );
      });
  };
};
export const removeExpense = (id: IExpense['id']): RemoveExpenseAction => {
  return {
    type: 'REMOVE_EXPENSE',
    id
  };
};
export const startRemoveExpense = (id: IExpense['id']) => {
  return (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ) => {
    const uid = getState().authentication.uid;
    database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then(() => {
        dispatch(removeExpense(id));
      });
  };
};
// EDIT_EXPENSE
export const editExpense = (
  id: IExpense['id'],
  updates: {
    id?: string;
    description?: string;
    note?: string;
    amount?: number;
    createdAt?: string;
  }
): EditExpenseAction => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
export const startEditExpense = (
  id: IExpense['id'],
  updates: {
    id?: string;
    description?: string;
    note?: string;
    amount?: number;
    createdAt?: string;
  }
) => {
  return (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ) => {
    const uid = getState().authentication.uid;
    database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editExpense(id, updates));
      });
  };
};
export const setExpenses = (expenses: IExpense[]): SetExpensesAction => ({
  type: 'SET_EXPENSES',
  expenses
});
export const startSetExpenses = () => {
  return (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => AppState
  ) => {
    const uid = getState().authentication.uid;
    database
      .ref(`users/${uid}/expenses`)
      .once('value')
      .then(Snapshot => {
        const expenses: IExpense[] = [];
        Snapshot.forEach(childrenSnapShot => {
          expenses.push({
            id: childrenSnapShot.key,
            ...childrenSnapShot.val()
          });
        });
        dispatch(setExpenses(expenses));
      });
  };
};
