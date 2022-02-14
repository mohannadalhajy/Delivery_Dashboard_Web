import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../redux/clients/Actions';
import { getDrivers } from '../../redux/drivers/Actions';
import { getOrders } from '../../redux/orders/Actions';
import { getVehicles } from '../../redux/vehicles/Actions';
import AddIcon from '@material-ui/icons/Add';
import {
    Grid,
    makeStyles,
    Button,
    MenuItem
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ADD_CLIENT_ROUTE, ADD_DRIVER_ROUTE, ADD_ORDER_ROUTE, ADD_VEHICLE_ROUTE } from '../../constants';
const useStyles = makeStyles((theme) => ({
    card: {
        border: '1px solid #dadce0',
        borderRadius: "8px",
        marginBottom: "16px",
        maxWidth: '500px',
        padding: "20px",
        margin: "20px"
    },
    labelDetails: {
        fontSize: '1em',
        fontFamily: 'Hind Guntur, sans-serif',
        color: '#054231'
    },

    button1: {
        padding: '10px 16px',
        borderRadius: '50px',
        position: 'relative',
        overflow: 'hidden',
        margin: '10px',
        fontSize: '16px',
        fontFamily: 'philosopher',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        borderColor: 'darkgray',
        border: '1px solid',
        "&:hover": {
            boxShadow: '0px 1px 3px 0px rgba(60,64,67,0.302),0 4px 8px 3px rgba(60,64,67,0.149)',
        }
    }
}));
const Dashboard = () => {
    //let history = useHistory();
    const dispatch = useDispatch();
    const [countInPage, ] = useState(50);
    const clients = useSelector(state => state.Clients);
    const drivers = useSelector(state => state.Drivers);
    const orders = useSelector(state => state.Orders);
    const vehicles = useSelector(state => state.Vehicles);
    const classes = useStyles();
    useEffect(() => {
        // var str = location.search;
        // let page = new URLSearchParams(str).get("page")
        // let take = new URLSearchParams(str).get("take")
        dispatch(getClients({}));
        dispatch(getDrivers({}));
        dispatch(getOrders({}));
        dispatch(getVehicles({}));
        // setCurrPage(page);
        // setCountInPage(take);
    }, [dispatch, countInPage])
    return (
        <div >
            <div style={{ padding: "30px" }}>
                <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">

                    <Grid item xs={12} md={6} >
                        <div className={classes.card}>
                            Client Details<br />
                            <div className={classes.labelDetails}><br />Total clients:{clients.count}</div>
                            <div className={classes.labelDetails}><br />Total orders:{orders.count}</div>
                            <div className={classes.labelDetails}><br />Total drivers:{drivers.count}</div>
                            <div className={classes.labelDetails}><br />Total vehicles:{vehicles.count}</div>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={3} >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CLIENT_ROUTE}>
                            <MenuItem>
                                <Button startIcon={<AddIcon />} className={classes.button1}>
                                    Add Client
                                </Button>
                            </MenuItem>
                        </Link>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_ORDER_ROUTE}>
                            <MenuItem>
                                <Button startIcon={<AddIcon />} className={classes.button1}>
                                    Add Order
                                </Button>
                            </MenuItem>
                        </Link>
                    </Grid>
                    <Grid item xs={6} md={3} >
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_DRIVER_ROUTE}>
                            <MenuItem>
                                <Button startIcon={<AddIcon />} className={classes.button1}>
                                    Add driver
                                </Button>
                            </MenuItem>
                        </Link>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_VEHICLE_ROUTE}>
                            <MenuItem>
                                <Button startIcon={<AddIcon />} className={classes.button1}>
                                    Add vehicle
                                </Button>
                            </MenuItem>
                        </Link>
                    </Grid>
                </Grid>



            </div>
        </div>
    );
}
export default Dashboard;