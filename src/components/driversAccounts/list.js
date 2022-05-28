import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { Link } from 'react-router-dom';
import MenuItemDelete from '../Base/MenuItemDelete';
import MenuItemExport from '../Base/MenuItemExport';
import DialogExport from '../Base/DialogExport';
import { Colors } from '../Base/Colors';
import { DRIVERS_ACCOUNTS_ROUTE, EDIT_DRIVER_ACCOUNT_ROUTE } from '../../constants';
import { deleteDriverAccount, SelectAllDriversAccounts, selectDriverAccount } from '../../redux/driversAccounts/Actions';
import DialogDeleteDriversAccounts from './DialogDelete';
const useStyles = makeStyles((theme) => ({
  checkBox: {
    color: '#1a73e8',
    padding: "12px 0 8px 0"
  },
  tableCell: {
    color: 'inherit',
    textDecoration: 'inherit'
  },
  countRow: {
    fontSize: ".6875rem",
    color: "#5f6368",
    fontWeight: "500",
    padding: '10px',
    height: '20px',
    display: 'flex'
  },
  TableRow: {
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: "#f2f2f2"
    },
    "&:hover .actions": {
      opacity: "1"
    },
    "& .actions": {
      opacity: "0"
    },
    "&:hover .image": {
      display: "none"
    },
    "& .image": {
      display: "table-cell"
    },
    "&:hover .checkbox": {
      display: "table-cell"
    },
    "& .checkbox": {
      display: "none"
    },
    "& .hideImage": {
      display: "none"
    }
  },
  selectedCell: {
    fontSize: '.875rem',
    fontWeight: '500px',
    color: '#1a73e8',
    whiteSpace: 'nowrap',
    fontFamily: 'Google Sans, Roboto,Arial,sans-serif'
  },
  busyDriver: {
    backgroundColor: 'red',
    color: 'white',
    "&:hover": {
      backgroundColor: "red",
    }
  },
  menuItemSelected: {
    backgroundColor: 'green',
    color: 'white',
    "&:hover": {
      backgroundColor: "green",
    }
  },
  menuItemRoot: {
    "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
      backgroundColor: "green"
    }
  },
  availableDriver: {
    backgroundColor: '#1a73e8',
    color: 'white',
    "&:hover": {
      backgroundColor: "#1a73e8",
    }
  }
}));
const encode = (string) => {
  var number = "";
  var length = string.length;
  for (var i = 0; i < length; i++)
    number += string.charCodeAt(i);
  return number;
}
function ListDriversAccounts({ driverDriversAccounts }) {
  const dispatch = useDispatch();
  const [ItemId, setItemId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [openDeleteOne, setOpenDeleteOne] = useState(false);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actions, setActions] = useState(null);
  const classesColors = Colors()
  const colors = [
    classesColors.red,
    classesColors.purple,
    classesColors.pink,
    classesColors.indigo,
    classesColors.blue,
    classesColors.teal,
    classesColors.green,
    classesColors.yellow,
    classesColors.lightBlue,
    classesColors.amber,
    classesColors.orange,
    classesColors.deepOrange,
    classesColors.lime,
    classesColors.cyan,
    classesColors.brown,
    classesColors.grey,
    classesColors.lightGreen,
    classesColors.blueGrey,
  ]

  const records = useSelector(state => state.DriversAccounts);
  const [openExport, setOpenExport] = useState(false);
  const handleSelect = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleActions = (event) => {
    setActions(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseActions = () => {
    setActions(null);
  };
  const handleOpenDeleteOne = () => {
    setOpenDeleteOne(true);
  };

  const handleCloseDeleteOne = () => {
    setOpenDeleteOne(false);
  };

  const toggleSelectALL = (checkType) => {
    dispatch(SelectAllDriversAccounts(checkType))
  };

  return (
    <div >
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); toggleSelectALL(true); }}>All</MenuItem>
        <MenuItem onClick={() => { handleClose(); toggleSelectALL(false) }}>None</MenuItem>
      </Menu>

      <Menu
        id="simple-menu2"
        anchorEl={records.selectedCount !== 0 ? actions : handleCloseActions}
        keepMounted
        open={Boolean(actions)}
        onClose={handleCloseActions}>
        <MenuItemExport setOpen={setOpenExport} />
        <MenuItemDelete setOpen={setOpenDelete} />
      </Menu>
      <TableContainer>
        <Table>
          <TableHead>
            {records.selectedCount !== 0 ?
              <TableRow role="checkbox">
                <TableCell size='small'>
                  {records.selectedCount === records.records.length ?
                    <IconButton
                      className={classes.checkBox}
                      onClick={() => toggleSelectALL(false)}>
                      <CheckBoxIcon />
                    </IconButton>
                    : <IconButton
                      className={classes.checkBox}
                      onClick={() => toggleSelectALL(false)}>
                      <IndeterminateCheckBoxIcon />
                    </IconButton>}
                  <IconButton
                    className={classes.checkBox}
                    onClick={handleSelect}>
                    <ArrowDropDownOutlinedIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left" size='small'>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleActions}>
                    <Tooltip title="More Actions">
                      <MoreVertIcon />
                    </Tooltip>
                  </IconButton></TableCell>
                <TableCell align="left" size='small'></TableCell>
                <TableCell align="left" size='small'></TableCell>
                <TableCell align="left" size='small'></TableCell>
                <TableCell className={classes.selectedCell}>{records.selectedCount + " selected"}</TableCell>
                <TableCell align="left" size='small'></TableCell>
              </TableRow>
              :
              <TableRow role="checkbox">
                <TableCell size='small' padding='checkbox'>
                </TableCell>
                {!driverDriversAccounts ? <TableCell align="left">Driver name</TableCell> : <React.Fragment />}
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left" size='small'></TableCell>
                <TableCell align="right" size='small'></TableCell>
              </TableRow>
            }
            <TableRow classes={{ root: classes.countRow }}>
              DriversAccounts<span>({records.count})</span>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.records.map((item, index) => (
              <TableRow
                role="checkbox"
                hover
                classes={{
                  root: classes.TableRow
                }}
                selected={item.checked}
                key={item.id}>
                <TableCell size='small' padding='checkbox' class={item.checked ? "" : "checkbox"}>
                  <Checkbox
                    checked={item.checked}
                    style={{ color: '#1a73e8' }}
                    onChange={() => {
                      dispatch(selectDriverAccount(item.id))
                    }}
                    inputProps={{ 'aria-label': 'primary checkbox' }} />
                </TableCell>
                <TableCell size='small' padding='checkbox' class={item.checked ? "hideImage" : "image"}>
                  <Avatar className={colors[(encode(item.driverName?item.driverName:"D")) % colors.length]}>{item.driverName ? item.driverName[0] : item.emirate ? item.emirate[0] : ""}</Avatar>
                </TableCell>

                {!driverDriversAccounts ? <TableCell
                  align="left"
                  className={classes.tableCell}>
                  {item.driverName}
                </TableCell> : <TableCell />}
                <TableCell
                  align="left"
                  className={classes.tableCell}>
                  {item.amount}
                </TableCell>
                <TableCell
                  align="left"
                  className={classes.tableCell}>
                  {item.date}
                </TableCell>
                <TableCell align="left" size='small' class="actions">
                  <IconButton
                    size="small"
                    className={classes.button}
                    onClick={() => {
                      setItemId(item.id);
                      handleOpenDeleteOne();
                    }}>
                    <Tooltip title="Delete"><DeleteIcon /></Tooltip>
                  </IconButton>
                </TableCell>
                <TableCell align="left" size='small' class="actions">
                  <Link
                    style={{ color: 'inherit', textDecoration: 'inherit' }}
                    to={EDIT_DRIVER_ACCOUNT_ROUTE + '?' + item.id}>
                    <IconButton
                      className={classes.button}>
                      <Tooltip title="Edit"><EditIcon size="small" /></Tooltip>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogDeleteDriversAccounts open={openDelete} setOpen={setOpenDelete} />
      <DialogExport open={openExport} setOpen={setOpenExport} />
      <Dialog
        open={openDeleteOne}
        onClose={handleCloseDeleteOne}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this driver account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteOne} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              dispatch(deleteDriverAccount(ItemId));
              handleCloseDeleteOne();
            }}
            color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

    </div>);
}
export default ListDriversAccounts;