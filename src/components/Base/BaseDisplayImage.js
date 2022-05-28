import React from 'react';
import {
  Button,
  Grid,
  IconButton,
  Hidden,
  Menu,
  Divider,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import MenuItemDelete from './MenuItemDelete';
const useStyles = makeStyles((theme) => ({
  buttonUpload: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // first: {
  //   paddingBottom: "8px"
  // },
  labelFirst: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center'
  },
  closeLink: {
    margin: "4px"
  },
  edit: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  bigName: {
    justifyContent: 'left',
    alignItems: 'center',
    margin: "5px",
    marginTop: "10px",
    fontSize: "1.75rem"
  },
  smallName: {
    justifyContent: 'left',
    alignItems: 'center',
    margin: "5px",
    fontSize: "1.125rem"
  },
  bigNameXS: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "5px",
    fontSize: "1.75rem"
  },
  smallNameXS: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "5px",
    fontSize: "1.125rem",
  },
  saveButton: {
    backgroundColor: "#1a73e8",
    textTransform: "none",
    color: "white",
    "&:hover": {
      backgroundColor: "#1a73e8",
    }
  }
}));


function BaseDisplayImage({ srcImage, Id, smallName, bigName, editRoute, baseRoute, deleteRecord }) {
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = React.useState(false);

  const [optionMenu, setOptionMenu] = React.useState(null);

  const openOptionMenu = (event) => {
    setOptionMenu(event.currentTarget);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const closeOptionMenu = () => {
    setOptionMenu(null);
  };
  //className={classes.first}
  return (
    <Grid container md={12} direction="row" alignItems="stretch" >
      <Menu
        id="simple-menu"
        anchorEl={optionMenu}
        keepMounted
        open={Boolean(optionMenu)}
        onClose={closeOptionMenu}
      >
        <MenuItemDelete setOpen={setOpenDelete} />
      </Menu>
      <Grid item xs={1} className={classes.closeLink}>
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={baseRoute}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            size="small"
          >
            <Tooltip title="Back">
              <ArrowBackIcon />
            </Tooltip>
          </IconButton>
        </Link>
      </Grid>
      <Hidden smUp >
        <Grid item xs={7} className={classes.labelFirst}>
        </Grid>
        <Grid item xs={3} className={classes.edit}>
          <IconButton
            size="small"
            color="primary"
            onClick={openOptionMenu}>
            <Tooltip title="Options">
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
          <Link
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            to={editRoute + '?' + Id}>
            <IconButton
              edge="start"
              color="primary"
              aria-label="menu"
              size="small"
            >
              <Tooltip title="Edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" />
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={3} md={2} className={classes.buttonUpload}>
        <img src={srcImage}
          alt="Profile"
          style={{
            width: '162px',
            height: '162px',
            margin: '10px 20px',
            borderRadius: '100px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%'
          }} />
      </Grid>
      <Hidden smUp >
        <Grid item xs={12} className={classes.bigNameXS}>
          {bigName}
        </Grid>
        <Grid item xs={12} className={classes.smallNameXS}>
          {smallName ?
            smallName
            : <React.Fragment />}
        </Grid>

      </Hidden>

      <Hidden xsDown>
        <Grid item sm={5} md={6} className={classes.bigName}>
          <Grid container sm={12} className={classes.bigName}>
            {bigName}
          </Grid>
          <Grid container sm={12} className={classes.smallName}>
            {smallName ?
              smallName
              : <React.Fragment />}
          </Grid>
        </Grid>
        <Grid item sm={2} className={classes.edit}>
          <IconButton
            size="small"
            color="primary"
            onClick={openOptionMenu}>
            <Tooltip title="Options">
              <MoreVertIcon />
            </Tooltip>
          </IconButton>
          <Link
            style={{ color: 'inherit', textDecoration: 'inherit' }}
            to={editRoute + '?' + Id}>
            <Button type="submit" variant="contained" className={classes.saveButton}>Edit</Button>
          </Link>
        </Grid>
      </Hidden>
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteRecord(Id));
              handleCloseDelete();
              history.push(baseRoute);
            }}
            color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </Grid>
  );
}
export default BaseDisplayImage;