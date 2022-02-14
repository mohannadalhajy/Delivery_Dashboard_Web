import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
  Button
} from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
import EditIcon from '@material-ui/icons/Edit';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { EDIT_ORDER_ROUTE, ORDERS_ROUTE } from '../../constants';
const APIOrder = require('../../redux/orders/API');
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 8px",
    display: 'flex',
    flexGrow: 1,
  },
  labelDetails: {
    fontSize: '1em',
    fontFamily: 'Hind Guntur, sans-serif',
    color: '#054231'
  },
  card: {
    border: '1px solid #dadce0',
    borderRadius: "8px",
    marginBottom: "16px",
    maxWidth: '500px',
    padding: "20px",
    margin: "20px"
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

function OrderDetails() {
  const classes = useStyles();
  const [order, setOrder] = useState();
  const waitText = 'Please wait'
  const [error, setError] = useState(waitText);
  const location = useLocation();
  const [expand, setExpand] = React.useState(false);
  useEffect(() => {
    var str = location.search;
    let id = new URLSearchParams(str).get("id")
    let promise;
    promise = APIOrder.getById(id);
    promise.then(res => {
      setOrder(res.data.result);
    }).catch(
      err => {
        setOrder(undefined)
        setError("Network failed")
      }
    );
  }, [location]);


  return <div className={classes.root}>

    {order !== undefined ?

      <Grid container direction="row" alignItems="stretch">
        <Grid item xs={12}>
          <div className={classes.card}>
            <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
              <Grid item xs={9} >
                Order Details
              </Grid>
              <Grid item xs={3} >
                <IconButton
                  size="small"
                  onClick={() => { setExpand(!expand) }}
                >
                  {expand ?
                    <Tooltip title="Show less">
                      <ExpandLessIcon />
                    </Tooltip> :
                    <Tooltip title="Show more">
                      <ExpandMoreIcon />
                    </Tooltip>}
                </IconButton>
              </Grid>
            </Grid>

            {order.company_name ?
              <div className={classes.labelDetails}><br />Company name: {order.company_name}</div>
              : <div></div>}

            {order.driver_name ?
              <div className={classes.labelDetails}><br />Driver name: {order.driver_name}</div>
              : <div></div>}
            {order.status ?
              <div className={classes.labelDetails}><br />Status: {order.status}</div>
              : <div></div>}

            {order.points !== null ?
              <div className={classes.labelDetails}><br />Points: {order.points}</div>
              : <div></div>}
            {order.emirate ?
              <div className={classes.labelDetails}><br />Emirate: {order.emirate}</div>
              : <div></div>}
            {order.transport_type && expand ?
              <div className={classes.labelDetails}><br />Transport type: {order.transport_type}</div>
              : <div></div>}
            {order.type && expand ?
              <div className={classes.labelDetails}><br />Type: {order.type}</div>
              : <div></div>}
            {order.amount && expand ?
              <div className={classes.labelDetails}><br />Amount: {order.amount}</div>
              : <div></div>}
            {order.customer_name && expand ?
              <div className={classes.labelDetails}><br />Customer name: {order.customer_name}</div>
              : <div></div>}
            {order.customer_phone && expand ?
              <div className={classes.labelDetails}><br />Customer phone: {order.customer_phone}</div>
              : <div></div>}
            {order.address && expand ?
              <div className={classes.labelDetails}><br />Customer address: {order.address}</div>
              : <div></div>}
            {order.start_date && expand ?
              <div className={classes.labelDetails}><br />Start date: {order.start_date}</div>
              : <div></div>}
            {expand && order.end_date ?
              <div className={classes.labelDetails}><br />End date: {order.end_date}</div>
              : <div></div>}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Link style={{ color: 'inherit', textDecoration: 'inherit', marginLeft: '12px' }} to={ORDERS_ROUTE}>
            <Button startIcon={<FactCheckIcon />} className={classes.button1}>
              Orders
            </Button>
          </Link>
          <Link style={{ color: 'inherit', textDecoration: 'inherit', marginLeft: '12px' }} to={EDIT_ORDER_ROUTE + '?' + order.id}>
            <Button startIcon={<EditIcon />} className={classes.button1}>
              Edit order
            </Button>
          </Link>
        </Grid>
      </Grid>

      :
      <div>
        <BaseWaiting error={error} />

      </div>
    }
  </div>;
}
export default OrderDetails;