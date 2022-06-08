import React, { } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import ListOrders from './list';
import AddIcon from '@material-ui/icons/Add';
import { ADD_ORDER_ROUTE } from '../../constants';
import { useSelector } from 'react-redux';
const useStyles = makeStyles((theme) => ({
  CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
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
  },
  TextField: {
    marginBottom: "20px"
  },
}));
const DailyOrders = () => {
  const classes = useStyles();
  const orders = useSelector(state => state.DailyOrders)
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!orders ? <div></div>
          : orders.loading ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : (orders.orders ? orders.orders.length <= 0 : true) ? <div>There is not orders</div>
              :
              <React.Fragment>
                <ListOrders clientOrders={orders} daily={true}/>
                <br />
              </React.Fragment>
        }
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_ORDER_ROUTE}>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add order
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default DailyOrders;
