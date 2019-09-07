import Fade from '@material-ui/core/Fade';
import { ISnackBar } from '../@types/state-interfaces';
import { SnackBarActionTypes } from '../@types/types';
const snackBarReducerDefaultState: ISnackBar = {
  isOpenAddExpense:false,
  isOpenError:false,
  Transition: Fade
};

const snackBarReducer = (
  state = snackBarReducerDefaultState,
  action: SnackBarActionTypes
) => {
  switch (action.type) {
    case 'SET_SNACK_BAR_STATUS':
      return {
        ...state,
        ...action.snackBarStatus
      };
    default:
      return state;
  }
};
export default snackBarReducer;
