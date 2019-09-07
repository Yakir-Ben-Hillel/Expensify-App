import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { AppState, ISnackBar } from '../../redux/@types/state-interfaces';
import { SetSnackBarStatus } from '../../redux/@types/types';
import { setSnackBarStatus } from '../../redux/actions/snackBarActions';
import * as snackBarConfigures from './snackBarsConfigures';

export interface Props {
  className?: string;
  message?: string;
  variant: keyof typeof snackBarConfigures.variantIcon;
  setSnackBarStatus(snackBarStatus: ISnackBar): SetSnackBarStatus;
  snackBar: ISnackBar;
}

const MySnackbarContentWrapper: React.FC<Props> = props => {
  const classes = snackBarConfigures.useStyles();
  const Icon = snackBarConfigures.variantIcon[props.variant];

  return (
    <SnackbarContent
      className={clsx(classes[props.variant])}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {props.message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={() =>
            props.setSnackBarStatus({
              ...props.snackBar,
              isOpenAddExpense: false,
              isOpenError: false
            })
          }
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
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
)(MySnackbarContentWrapper);
