import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/@types/state-interfaces';
import { setSnackBarStatus } from '../../redux/actions/snackBarActions';
import MySnackbarContentWrapper from './snackBarContentWrapper';
import * as snackBarConfigures from './snackBarsConfigures';
const ErrorBar: React.FC<snackBarConfigures.IProps> = props => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={props.snackBar.isOpenError}
      autoHideDuration={5000}
      TransitionComponent={props.snackBar.Transition}
      onClose={() =>
        props.setSnackBarStatus({
          ...props.snackBar,
          isOpenError: false
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBar);
