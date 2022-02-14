import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectClient,
    SelectAll,
    deleteClient
} from '../../redux/clients/Actions';
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
import { CLIENT_DETAILS_ROUTE, EDIT_CLIENT_ROUTE, IMAGES_CLIENTS_API_URL } from '../../constants/index';
import MenuItemDelete from '../Base/MenuItemDelete';
import MenuItemExport from '../Base/MenuItemExport';
import DialogDeleteClients from './DialogDeleteClients';
import DialogExport from '../Base/DialogExport';
import { Colors } from '../Base/Colors';
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
    }
}));

function ListClients() {
    const dispatch = useDispatch();
    const [ItemIdDelete, setItemIdDelete] = useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const [openDeleteOne, setOpenDeleteOne] = useState(false);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [actions, setActions] = React.useState(null);
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
    const Clients = useSelector(state => state.Clients);
    const [openExport, setOpenExport] = useState(false);
    const handleSelect = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const getDetailsRoute = (id) =>{
        return CLIENT_DETAILS_ROUTE + '?&id=' + id
    }
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
        dispatch(SelectAll(checkType))
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
                anchorEl={Clients.selectedCount !== 0 ? actions : handleCloseActions}
                keepMounted
                open={Boolean(actions)}
                onClose={handleCloseActions}>
                <MenuItemExport setOpen={setOpenExport} />
                <MenuItemDelete setOpen={setOpenDelete} />
            </Menu>
            <TableContainer>
                <Table>
                    <TableHead>
                        {Clients.selectedCount !== 0 ?
                            <TableRow role="checkbox">
                                <TableCell size='small'>
                                    {Clients.selectedCount === Clients.clients.length ?
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
                                <TableCell className={classes.selectedCell}>{Clients.selectedCount + " selected"}</TableCell>
                                <TableCell align="left" size='small'></TableCell>
                            </TableRow>
                            :
                            <TableRow role="checkbox">
                                <TableCell size='small' padding='checkbox'>
                                </TableCell>
                                <TableCell align="left">Company name</TableCell>
                                <TableCell align="left">Client name</TableCell>
                                <TableCell align="left">Points</TableCell>
                                <TableCell align="left">Emirate</TableCell>
                                <TableCell align="left" size='small'></TableCell>
                                <TableCell align="right" size='small'></TableCell>
                            </TableRow>
                        }
                        <TableRow classes={{ root: classes.countRow }}>
                            Clients<span>({Clients.count})</span>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Clients.clients.map((item, index) => (
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
                                            dispatch(selectClient(item.id))
                                        }}
                                        inputProps={{ 'aria-label': 'primary checkbox' }} />
                                </TableCell>
                                <TableCell size='small' padding='checkbox' class={item.checked ? "hideImage" : "image"}>
                                    {item.image ?
                                        <img src={IMAGES_CLIENTS_API_URL + '/' + item.image} width="36px" alt="avatar" />
                                        :
                                        <Avatar className={colors[index % colors.length]}>{item.user_name[0]}</Avatar>
                                    }
                                </TableCell>

                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item.id)}>
                                    {item.company_name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item.id)}
                                >{item.client_name}</TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                    component={Link}
                                    to={getDetailsRoute(item.id)}>
                                    {item.points}</TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="left"
                                    component={Link}
                                    to={getDetailsRoute(item.id)}>
                                    {item.emirate}</TableCell>
                                <TableCell align="left" size='small' class="actions">
                                    <IconButton
                                        size="small"
                                        className={classes.button}
                                        onClick={() => {
                                            setItemIdDelete(item.id);
                                            handleOpenDeleteOne();
                                        }}>
                                        <Tooltip title="Delete"><DeleteIcon /></Tooltip>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="left" size='small' class="actions">
                                    <Link
                                        style={{ color: 'inherit', textDecoration: 'inherit' }}
                                        to={EDIT_CLIENT_ROUTE + '?' + item.id}>
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
            <DialogDeleteClients open={openDelete} setOpen={setOpenDelete} />
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
                        Are you sure you want to delete this Client?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteOne} color="primary">
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            dispatch(deleteClient(ItemIdDelete));
                            handleCloseDeleteOne();
                        }}
                        color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

        </div>);
}
export default ListClients;