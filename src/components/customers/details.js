import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Divider,
  Grid,
  makeStyles,
  IconButton,
  Tooltip,
  Button,
  CircularProgress
} from '@material-ui/core';
import BaseDisplayImage from '../Base/BaseDisplayImage';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BaseWaiting from '../Base/BaseWaiting';
import { deleteCustomer } from '../../redux/customers/Actions';
import ListOrders from '../orders/list';
import BasicPagination from '../Base/BasicPagination';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersSuccessAction } from '../../redux/orders/Actions';
//import Orders from '../orders';
const { IMAGES_CUSTOMERS_API_URL, EDIT_CUSTOMER_ROUTE, CUSTOMERS_ROUTE, EMIRATES } = require('../../constants/index');
const APICustomer = require('../../redux/customers/API');
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0 8px",
    display: 'flex',
    flexGrow: 1,
  },
  CircularProgress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '65vh'
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

function CustomerDetails() {
  const classes = useStyles();
  const [customer, setCustomer] = useState();
  const [currPage, setCurrPage] = useState(1);
  const waitText = 'Please wait'
  const [error, setError] = useState(waitText);
  const [srcImage, setSrcImage] = useState(process.env.PUBLIC_URL + '/assets/profile.webp');
  const location = useLocation();
  const [expand, setExpand] = React.useState(false);
  const orders = useSelector(state => state.Orders);
  const [viewOrders, setViewOrders] = React.useState(false);
  const dispatch = useDispatch()
  const [countInPage, ] = useState(50);
  const [id, setId] = React.useState(false);
  useEffect(() => {
    var str = location.search;
    let id = new URLSearchParams(str).get("id")
    setId(id);
    let promise;
    promise = APICustomer.getById(id);
    promise.then(res => {
      setCustomer(res.data.result);
      if (res.data.result.image) setSrcImage(IMAGES_CUSTOMERS_API_URL + '/' + res.data.result.image);
    }).catch(
      err => {
        setCustomer(undefined)
        setError("Network failed")
      }
    );
    const ordersPromise = APICustomer.getOrders(id, 1, countInPage)
    ordersPromise.then(response => {
      const orders = response.data.result.result.map(item => { return { ...item, checked: false } });
      dispatch(getOrdersSuccessAction({ ...response.data.result, orders: orders }));
    })
  }, [location, countInPage, dispatch]);
  const setOrdersByPage = (page, take) => {
    if (take === undefined) take = countInPage;
    const ordersPromise = APICustomer.getOrders(id, page, take)
    ordersPromise.then(response => {
      const orders = response.data.result.result.map(item => { return { ...item, checked: false } });
      dispatch(getOrdersSuccessAction({ ...response.data.result, orders: orders }));
    })
    //dispatch(getOrders({ page, take }));
    setCurrPage(page)
    //history.push("?&page=" + page + "&take=" + take)
  }
  return <div className={classes.root}>

    {customer !== undefined ?

      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid item xs={12}>
          <div>
            <BaseDisplayImage
              srcImage={srcImage}
              Id={id}
              smallName={(customer.customerNameEnglish ? customer.customerNameEnglish : "")}
              //userName={(customer.userName ? customer.userName : "")}
              bigName={customer.companyNameEnglish}
              editRoute={EDIT_CUSTOMER_ROUTE}
              baseRoute={CUSTOMERS_ROUTE}
              deleteRecord={deleteCustomer}
            />
            <Divider variant="middle" />

            <div className={classes.card}>
              <Grid container direction="row" justify="center" className={classes.actionButton} alignItems="stretch">
                <Grid item xs={9} >
                  Customer Details
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
              {customer.userName ?
                <div className={classes.labelDetails}><br />User name: {customer.userName}</div>
                : <div></div>}
              {customer.emirate ?
                <div className={classes.labelDetails}><br />Emirate: {EMIRATES[customer.emirate]}</div>
                : <div></div>}
              {customer.city ?
                <div className={classes.labelDetails}><br />City: {customer.city}</div>
                : <div></div>}
              {customer.customerPhone ?
                <div className={classes.labelDetails}><br />Customer phone: {customer.customerPhone}</div>
                : <div></div>}
              {customer.companyPhone ?
                <div className={classes.labelDetails}><br />Company phone: {customer.companyPhone}</div>
                : <div></div>}
              {customer.amount && expand ?
                <div className={classes.labelDetails}><br />Amount: {customer.amount}</div>
                : <div></div>}
              {customer.companyTypeEnglish && expand ?
                <div className={classes.labelDetails}><br />Company type: {customer.companyTypeEnglish}</div>
                : <div></div>}
              {customer.contractDate && expand ?
                <div className={classes.labelDetails}><br />Contract date: {customer.contractDate}</div>
                : <div></div>}
              {customer.serviceStartDate && expand ?
                <div className={classes.labelDetails}><br />Service start date: {customer.serviceStartDate}</div>
                : <div></div>}
              {customer.serviceEndDate && expand ?
                <div className={classes.labelDetails}><br />Service end date: {customer.serviceEndDate}</div>
                : <div></div>}
              {customer.latitude && expand ?
                <div className={classes.labelDetails}><br />Latitude: {customer.latitude}</div>
                : <div></div>}
              {customer.longitude && expand ?
                <div className={classes.labelDetails}><br />Longitude: {customer.longitude}</div>
                : <div></div>}
              {expand && customer.notes ? customer.notes
                : <div></div>}
            </div>

          </div>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => setViewOrders(!viewOrders)} startIcon={<FactCheckIcon />} className={classes.button1}>
            View orders
          </Button>
        </Grid>
        <Grid item xs={12}>
          {viewOrders ? !orders ? <div></div>
            : orders.loading && orders.orders.length <= 0 ? <div className={classes.CircularProgress}>
              <CircularProgress />
            </div>
              : orders.orders.length <= 0 ? <div>There is not orders</div>
                :
                <React.Fragment>
                  <ListOrders customerOrders={true} />
                  <br />
                  <BasicPagination
                    count={orders.pageCount}
                    page={currPage}
                    setPage={setOrdersByPage} />
                </React.Fragment>
            : <div />}
        </Grid>
      </Grid>
      :
      <div>
        <BaseWaiting error={error} />

      </div>
    }
  </div>;
}
export default CustomerDetails;