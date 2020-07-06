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
  Transition?: any;
}
export interface IAuthentication {
  username?: string;
  photoURL?: string;
  uid?: string;
}
export interface AppState {
  expenses: Row[];
  filters: IFilter;
  snackBar: ISnackBar;
  authentication: IAuthentication;
}
