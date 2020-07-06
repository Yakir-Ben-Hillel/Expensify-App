import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import React from 'react';
import DrawerHandler from './AppBarComponents/Drawer';
import RenderMenuDesktop from './AppBarComponents/RenderMenu';
import useStyles from './AppBarComponents/useStyles';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';
interface IBar {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startLogout: () => Promise<void>;
}
const Bar: React.FC<IBar> = ({ open, setOpen }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  // const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMenu = () => (
    <RenderMenuDesktop
      anchorEl={anchorEl}
      open={isMenuOpen}
      handleMenuClose={handleMenuClose}
      menuId={menuId}
    />
  );
  // const renderMobileMenu = () =>
  //   RenderMobileMenu({
  //     mobileMoreAnchorEl,
  //     isMobileMenuOpen,
  //     mobileMenuId,
  //     handleMobileMenuClose,
  //     handleProfileMenuOpen
  //   });
  // function handleDrawerOpen() {
  //   setOpen(true);
  // }

  function handleDrawerClose() {
    setOpen(false);
  }

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }
  // function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // }
  return (
    <div>
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        position='static'
      >
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            Expensify App
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
        <DrawerHandler open={open} handleDrawerClose={handleDrawerClose} />
      </AppBar>
      {/* {renderMobileMenu()} */}
      {renderMenu()}
    </div>
  );
};
const mapDispatchToProps = {
  startLogout
};

export default connect(
  null,
  mapDispatchToProps
)(Bar);
