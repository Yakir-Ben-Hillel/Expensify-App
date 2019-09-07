import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React from 'react';
interface IMobileMenu {
  mobileMoreAnchorEl: HTMLElement | null;
  isMobileMenuOpen: boolean;
  mobileMenuId:string;
  handleMobileMenuClose(): void;
  handleProfileMenuOpen(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
const renderMobileMenu: React.FC<IMobileMenu> = ({
  mobileMoreAnchorEl,
  isMobileMenuOpen,
  mobileMenuId,
  handleMobileMenuClose,
  handleProfileMenuOpen
}) => (
  <Menu
    anchorEl={mobileMoreAnchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={mobileMenuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={isMobileMenuOpen}
    onClose={handleMobileMenuClose}
  >
    <MenuItem>
      <IconButton aria-label='show 1 new mails' color='inherit'>
        <Badge badgeContent={1} color='secondary'>
          <MailIcon />
        </Badge>
      </IconButton>
      <p>Messages</p>
    </MenuItem>
    <MenuItem>
      <IconButton aria-label='show 10 new notifications' color='inherit'>
        <Badge badgeContent={10} color='secondary'>
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <p>Notifications</p>
    </MenuItem>
    <MenuItem onClick={handleProfileMenuOpen}>
      <IconButton
        aria-label='account of current user'
        aria-controls='primary-search-account-menu'
        aria-haspopup='true'
        color='inherit'
      >
        <AccountCircle />
      </IconButton>
      <p>Profile</p>
    </MenuItem>
  </Menu>
);
export default renderMobileMenu;
