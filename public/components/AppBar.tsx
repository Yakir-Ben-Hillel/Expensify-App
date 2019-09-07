import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
//import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
//import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import React from 'react';
import DrawerHandler from './AppBarComponents/Drawer';
import RenderMenuDesktop from './AppBarComponents/RenderMenu';
import RenderMobileMenu from './AppBarComponents/RenderMobileMenu';
import useStyles from './AppBarComponents/useStyles';
import { connect } from 'react-redux';
import { startLogout } from '../redux/actions/auth';

interface IBar {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  startLogout: () => Promise<void>;
}
const Bar: React.FC<IBar> = ({ open, setOpen, startLogout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMenu = () => (
    <RenderMenuDesktop
      anchorEl={anchorEl}
      open={isMenuOpen}
      handleMenuClose={handleMenuClose}
      menuId={menuId}
    />
  );
  const renderMobileMenu = () =>
    RenderMobileMenu({
      mobileMoreAnchorEl,
      isMobileMenuOpen,
      mobileMenuId,
      handleMobileMenuClose,
      handleProfileMenuOpen
    });
  function handleDrawerOpen() {
    setOpen(true);
  }

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
  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  return (
    <div>
      <AppBar
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        position='static'
      >
        <Toolbar>
          <IconButton
            edge='start'
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
            color='inherit'
            aria-label='open drawer'
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant='h6' noWrap>
            Expensify App
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={0} color='secondary'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={0} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
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
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <DrawerHandler open={open} handleDrawerClose={handleDrawerClose} />
      </AppBar>
      {renderMobileMenu()}
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
