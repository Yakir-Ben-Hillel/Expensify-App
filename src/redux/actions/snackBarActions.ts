import { ISnackBar } from '../@types/state-interfaces';
import { SetSnackBarStatus } from '../@types/types';
export const setSnackBarStatus = (
  snackBarStatus: ISnackBar
): SetSnackBarStatus => {
  return {
    type: 'SET_SNACK_BAR_STATUS',
    snackBarStatus
  };
};
