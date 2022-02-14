import React from 'react';
import {
  makeStyles,
  MenuItem,
  IconButton,
  ListItemIcon,
  Typography
} from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
const useStyles = makeStyles((theme) => ({
  menuIcon: {
    minWidth: "0px",
    textTransform: "none",
    marginRight: "5px"
  }
}));

function MenuItemExport({ setOpen, sideBar }) {
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
          <PublishIcon />
        </IconButton>
        :
        <ListItemIcon className={classes.menuIcon}>
          <PublishIcon />
        </ListItemIcon>
      }
      <Typography variant="inherit">
        Export
      </Typography>
    </MenuItem>
  );
}


export default MenuItemExport;