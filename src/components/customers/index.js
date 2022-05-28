import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { getCustomers } from '../../redux/customers/Actions';
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import ListCustomers from './list';
import BasicPagination from '../Base/BasicPagination';
import { ADD_CUSTOMER_ROUTE } from '../../constants';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
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
const Customers = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const customers = useSelector(state => state.Customers);
  const classes = useStyles();
  useEffect(() => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    dispatch(getCustomers({ page, take }));
    setCurrPage(page);
    setCountInPage(take);
  }, [location, dispatch, countInPage])

  const setCustomersByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getCustomers({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!customers ? <div></div>
          : customers.loading && customers.customers.length <= 0 ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : customers.customers.length <= 0 ? <div>There is not customers</div>
              :
              <React.Fragment>
                <ListCustomers />
                <br />
                <BasicPagination
                  count={customers.pageCount}
                  page={currPage}
                  setPage={setCustomersByPage} />
              </React.Fragment>
        }
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CUSTOMER_ROUTE}>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add customer
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default Customers;