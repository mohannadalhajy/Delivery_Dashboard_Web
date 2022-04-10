import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import List from './list';
import AddIcon from '@material-ui/icons/Add';
import BasicPagination from '../Base/BasicPagination';
import { getClientsAccounts } from '../../redux/clientsAccounts/Actions';
import { ADD_CLIENT_ACCOUNT_ROUTE } from '../../constants';
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
const ClientsAccounts = () => {
  let history = useHistory();
  const [countInPage, setCountInPage] = useState(50);
  const [currPage, setCurrPage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const records = useSelector(state => state.ClientsAccounts);
  const classes = useStyles();
  const [type, setType] = useState()
  const setClientsAccounts = () => {
    var str = location.search;
    let page = new URLSearchParams(str).get("page")
    let take = new URLSearchParams(str).get("take")
    dispatch(getClientsAccounts({ page, take }));
    setCurrPage(page);
    setCountInPage(take);
  }
  useEffect(() => {
    setClientsAccounts()
  }, [])

  const setClientsAccountsByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    dispatch(getClientsAccounts({ page, take }));
    setCurrPage(page)
    history.push("?&page=" + page + "&take=" + take)
  }
  const handleChangeType = (e) => {
    setType(e.target.value)
    if (e.target.value === "All")
      setClientsAccounts()
    else setClientsAccounts(e.target.value)
  }
  return (
    <div >
      <div style={{ padding: "30px" }}>
        {!records ? <div></div>
          : records.loading ? <div className={classes.CircularProgress}>
            <CircularProgress />
          </div>
            : records.records.length <= 0 ? <div>There is not records</div>
              :
              <React.Fragment>
                <List />
                <br />
                <BasicPagination
                  count={records.pageCount}
                  page={currPage}
                  setPage={setClientsAccountsByPage} />
              </React.Fragment>
        }
        <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CLIENT_ACCOUNT_ROUTE}>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Delivery amount
          </Button>
        </Link>
      </div>
    </div>
  );
}
export default ClientsAccounts;