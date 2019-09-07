import React from 'react';
import { TransitionProps } from '@material-ui/core/transitions/transition';
export interface IExpense {
  id: string | null;
  description: string;
  note: string;
  amount: number;
  createdAt: string;
}
export interface Row extends IExpense {
  tableData: {
    id: number;
  };
}
export interface IFilter {
  text: string;
  sortBy: string; //date or amount.
  startDate?: string;
  endDate?: string;
}
export interface ISnackBar {
  isOpenAddExpense: boolean;
  isOpenError: boolean;
  Transition?: React.ComponentType<TransitionProps>;
}
export interface IAuthenticated {
  uid?: boolean;
}
export interface AppState {
  expenses: Row[];
  filters: IFilter;
  snackBar: ISnackBar;
  authentication: IAuthenticated;
}
