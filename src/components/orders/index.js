import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { getOrders } from '../../redux/orders/Actions';
import { Button, CircularProgress, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core';
import ListOrders from './list';
import AddIcon from '@material-ui/icons/Add';
import BasicPagination from '../Base/BasicPagination';
import { ADD_ORDER_ROUTE, ORDER_STATUS_TYPES } from '../../constants';
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
const Orders = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const orders = useSelector(state => state.Orders);
  const classes = useStyles();
  const [type, setType] = useState()
  const setOrders = (ordersType) => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    dispatch(getOrders({ page, take, type: ordersType }));
    setCurrPage(page);
    setCountInPage(take);
  }
  useEffect(() => {
    setOrders()
  }, [])

  const setOrdersByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getOrders({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  const handleChangeType = (e) => {
    setType(e.target.value)
    if (e.target.value === "All")
      setOrders()
    else setOrders(e.target.value)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {(type && type !== "All") || orders.orders.length > 0 ? <FormControl
          className={classes.TextField}
          variant="standard" fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            id="type"
            required
            value={type}
            name="type"
            onChange={handleChangeType}
            label="Type">
            {ORDER_STATUS_TYPES.map((type, index) => (<MenuItem value={index}>{type}</MenuItem>))}
            <MenuItem value="">All</MenuItem>
          </Select>
        </FormControl> : <React.Fragment />}
        {!orders ? <div></div>
          : orders.loading ? <div className={classes.CircularProgress}>
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
      </div>
    </div>
  );
}
export default Orders;
