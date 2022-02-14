import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getOrders } from '../../redux/orders/Actions';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import ListOrders from './list';
import AddIcon from '@material-ui/icons/Add';
import BasicPagination from '../Base/BasicPagination';
import { ADD_ORDER_ROUTE } from '../../constants';
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
  }
}));
const Orders = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(state => state.Orders);
  const classes = useStyles();
  useEffect(() => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    dispatch(getOrders({ page, take }));
    setCurrPage(page);
    setCountInPage(take);
  }, [location, dispatch, countInPage])

  const setOrdersByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getOrders({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!orders ? <div></div>
          : orders.loading || orders.orders.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : orders.orders.length <= 0 ? <div>There is not orders</div>
              :
              <React.Fragment>
                <ListOrders />
                <br />
                <BasicPagination
                  count={orders.pageCount}
                  page={currPage}
                  setPage={setOrdersByPage} />
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
export default Orders;