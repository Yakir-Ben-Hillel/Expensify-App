import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { connect } from 'react-redux';
import { startLogout } from '../../redux/actions/auth';

interface IMenu {
  anchorEl: HTMLElement | null;
  open: boolean;
  menuId: string;
  handleMenuClose(): void;
  startLogout: () => Promise<void>;
}
const renderMenu: React.FC<IMenu> = ({
  anchorEl,
  open,
  menuId,
  handleMenuClose,
  startLogout
}) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    id={menuId}
    keepMounted
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={open}
    onClose={handleMenuClose}
  >
    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    <MenuItem onClick={() => startLogout() && handleMenuClose}>Logout</MenuItem>
  </Menu>
);
const mapDispatchToProps = {
  startLogout
};
export default connect(
  null,
  mapDispatchToProps
)(renderMenu);
