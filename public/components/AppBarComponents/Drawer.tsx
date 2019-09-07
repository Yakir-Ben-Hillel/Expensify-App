import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HomeIcon from '@material-ui/icons/Home';
import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface IDrawer {
  open: boolean;
  handleDrawerClose(): void;
}
const DrawerHandler: React.FC<IDrawer> = ({ open, handleDrawerClose }) => {
  const classes = useStyles();
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button component={Link} to={'/dashboard'}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem button component={Link} to={'/create'}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary='Add Expense' />
        </ListItem>
        <ListItem button component={Link} to={'/edit'}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary='Edit Expense' />
        </ListItem>
        <ListItem button component={Link} to={'/help'}>
          <ListItemIcon>
            <HelpOutlineIcon />
          </ListItemIcon>
          <ListItemText primary='Help' />
        </ListItem>
      </List>
    </Drawer>
  );
};
export default DrawerHandler;
