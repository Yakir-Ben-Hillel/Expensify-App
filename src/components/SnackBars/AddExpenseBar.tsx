import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/@types/state-interfaces';
import { setSnackBarStatus } from '../../redux/actions/snackBarActions';
import MySnackbarContentWrapper from './snackBarContentWrapper';
import * as snackBarConfigures from './snackBarsConfigures';

const SnackBarAddExpense: React.FC<snackBarConfigures.IProps> = props => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={props.snackBar.isOpenAddExpense}
      autoHideDuration={5000}
      TransitionComponent={props.snackBar.Transition}
      onClose={() =>
        props.setSnackBarStatus({
          ...props.snackBar,
          isOpenAddExpense: false
        })
      }
    >
      <MySnackbarContentWrapper
        variant={props.variant}
        message={props.massage}
      />
    </Snackbar>
  );
};
const mapStateToProps = (state: AppState) => {
  return {
    snackBar: state.snackBar
  };
};
const mapDispatchToProps = {
  setSnackBarStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackBarAddExpense);
