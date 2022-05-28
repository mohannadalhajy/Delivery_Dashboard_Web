import React from 'react';
import {
  makeStyles,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles((theme) => ({
  menuIcon: {
    minWidth: "0px",
    textTransform: "none",
    marginRight: "5px"
  }
}));

function MenuItemDelete({ setOpen, sideBar }) {
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };


  return (
    <MenuItem onClick={handleOpen}>
      {sideBar ?
        <IconButton
          edge="start"
          aria-label="menu"
          className={classes.icon}
        >
          <DeleteIcon />
        </IconButton>
        :
        <ListItemIcon className={classes.menuIcon}>
          <DeleteIcon />
        </ListItemIcon>
      }
      <Typography variant="inherit">
        Delete
      </Typography>
    </MenuItem>
  );
}


export default MenuItemDelete;