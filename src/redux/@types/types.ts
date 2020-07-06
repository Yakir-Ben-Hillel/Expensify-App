import { IExpense, IFilter, ISnackBar } from './state-interfaces';
const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const SET_EXPENSES = 'SET_EXPENSES';
const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
const SORT_BY_AMOUNT = 'SORT_BY_AMOUNT';
const SORT_BY_DATE = 'SORT_BY_DATE';
const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';
const SET_SNACK_BAR_STATUS = 'SET_SNACK_BAR_STATUS';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
export interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  expense: IExpense;
  place?: number;
}
export interface RemoveExpenseAction {
  type: typeof REMOVE_EXPENSE;
  id: IExpense['id'];
}
export interface EditExpenseAction {
  type: typeof EDIT_EXPENSE;
  id: IExpense['id'];
  updates: {
    id?: string;
    description?: string;
    note?: string;
    amount?: number;
    createdAt?: string;
  };
}
export interface SetExpensesAction {
  type: typeof SET_EXPENSES;
  expenses: IExpense[];
}
export interface SetTextFilter {
  type: typeof SET_TEXT_FILTER;
  text: IFilter['text'];
}
export interface SortByAmount {
  type: typeof SORT_BY_AMOUNT;
}
export interface SortByDate {
  type: typeof SORT_BY_DATE;
}
export interface SetStartDate {
  type: typeof SET_START_DATE;
  startDate: IFilter['startDate'];
}
export interface SetSnackBarStatus {
  type: typeof SET_SNACK_BAR_STATUS;
  snackBarStatus: ISnackBar;
}
export interface SetEndDate {
  type: typeof SET_END_DATE;
  endDate: IFilter['endDate'];
}
export interface Login {
  type: typeof LOGIN;
  username: string;
  photoURL: string;
  uid: string;
}
export interface Logout {
  type: typeof LOGOUT;
}
export type ExpenseActionTypes =
  | AddExpenseAction
  | RemoveExpenseAction
  | EditExpenseAction
  | SetExpensesAction;
export type FilterActionTypes =
  | SetTextFilter
  | SortByAmount
  | SortByDate
  | SetStartDate
  | SetEndDate;
export type AuthActionTypes = Login | Logout;
export type SnackBarActionTypes = SetSnackBarStatus;
