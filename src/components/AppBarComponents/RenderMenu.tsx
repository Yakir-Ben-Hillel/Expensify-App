import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
interface IMenu {
  anchorEl: HTMLElement | null;
  open: boolean;
  menuId:string;
  handleMenuClose(): void;
}
const renderMenu: React.FC<IMenu> = ({ anchorEl, open,menuId, handleMenuClose }) => (
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
  </Menu>
);
export default renderMenu;
