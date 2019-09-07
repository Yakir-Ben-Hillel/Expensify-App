import { SetEndDate, SetStartDate, SetTextFilter, SortByAmount, SortByDate } from '../@types/types';
export const setTextFilter = (text = ''): SetTextFilter => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SORT_BY_AMOUNT
export const sortByAmount = (): SortByAmount => ({
  type: 'SORT_BY_AMOUNT'
});
// SORT_BY_DATE
export const sortByDate = (): SortByDate => ({
  type: 'SORT_BY_DATE'
});
// SET_START_DATE
export const setStartDate = (startDate: string): SetStartDate => ({
  type: 'SET_START_DATE',
  startDate
});
// SET_END_DATE
export const setEndDate = (endDate: string): SetEndDate => ({
  type: 'SET_END_DATE',
  endDate
});
