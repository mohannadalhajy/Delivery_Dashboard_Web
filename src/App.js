import './App.css';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from "react-sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import loadable from '@loadable/component'
import { initProfile, profileMe } from './redux/User/Actions';
import AuthRoute from './components/AuthRoute';
import { ADD_CLIENT_ROUTE, ADD_DRIVER_ROUTE, ADD_DRIVER_VEHICLE_ROUTE, ADD_ORDER_ROUTE, ADD_VEHICLE_ROUTE, CLIENTS_ROUTE, CLIENT_DETAILS_ROUTE, DASHBOARD_ROUTE, DRIVERS_ROUTE, DRIVERS_VEHICLES_ROUTE, DRIVER_DETAILS_ROUTE, EDIT_CLIENT_ROUTE, EDIT_DRIVER_ROUTE, EDIT_ORDER_ROUTE, EDIT_VEHICLE_ROUTE, LOGIN_ROUTE, ORDERS_ROUTE, ORDER_DETAILS_ROUTE, PREFIX_ROUTE, RELEASE_DRIVER_ROUTE, RELEASE_VEHICLE_ROUTE, VEHICLES_DRIVERS_ROUTE, VEHICLES_ROUTE, VEHICLES_TRANSACTIONS_ROUTE, VEHICLE_DETAILS_ROUTE  } from './constants';
import { getClients } from './redux/clients/Actions';
const login = loadable(() => import('./components/profile/login'));
const clients = loadable(() => import('./components/clients'));
const clientDetails = loadable(() => import('./components/clients/details'));
const editClient = loadable(() => import('./components/clients/edit'));
const addClient = loadable(() => import('./components/clients/add'));
const orders = loadable(() => import('./components/orders'));
const orderDetails = loadable(() => import('./components/orders/details'));
const editOrder = loadable(() => import('./components/orders/edit'));
const addOrder = loadable(() => import('./components/orders/add'));
const drivers = loadable(() => import('./components/drivers'));
const driverDetails = loadable(() => import('./components/drivers/details'));
const editDriver = loadable(() => import('./components/drivers/edit'));
const addDriver = loadable(() => import('./components/drivers/add'));
const vehicles = loadable(() => import('./components/vehicles'));
const vehicleDetails = loadable(() => import('./components/vehicles/details'));
const editVehicle = loadable(() => import('./components/vehicles/edit'));
const addVehicle = loadable(() => import('./components/vehicles/add'));
const addDriverVehicle = loadable(() => import('./components/driverVehicle/add'));
const releaseVehicle = loadable(() => import('./components/driverVehicle/releaseVehicle'));
const releaseDriver = loadable(() => import('./components/driverVehicle/releaseDriver'));
const vehiclesDrivers = loadable(() => import('./components/driverVehicle/drivers'));
const driversvehicles = loadable(() => import('./components/driverVehicle/vehicles'));
const vehiclesTransactions = loadable(() => import('./components/driverVehicle/transactions'));
const dashboard = loadable(() => import('./components/Dashboard'));
const SideBarContent = loadable(() => import('./components/sidebar'));
const NavMenu = loadable(() => import('./components/NavMenu'));
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">loading</div>
  </div>
);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const mql = window.matchMedia(`(min-width: 800px)`);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    (async () => {
      let accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        try {
          dispatch(profileMe);
          dispatch(getClients({}));
          console.log("done")
        } catch (error) {
          console.log("failed")
        }
      }
      else dispatch(initProfile);
    })();
  }, [dispatch]);
  const handle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <div>
      <Router>
        <React.Suspense fallback={loading}>
          {user.user.user_name === undefined ? <React.Fragment /> :
            <NavMenu setCollapsed={setCollapsed} collapsed={collapsed} />}
          <Sidebar
            sidebar={<SideBarContent />}
            open={collapsed && user.user.user_name !== undefined}
            docked={collapsed && mql.matches && user.user.user_name !== undefined}
            onSetOpen={handle}
            styles={{ sidebar: { background: "white" }, root: { top: user.user.user_name === undefined ? 0 : 60 } }}>
              <Switch>
                <Route exact path={LOGIN_ROUTE} component={login} />
                <AuthRoute path={ADD_DRIVER_VEHICLE_ROUTE} component={addDriverVehicle} />
                <AuthRoute path={RELEASE_VEHICLE_ROUTE} component={releaseVehicle} />
                <AuthRoute path={RELEASE_DRIVER_ROUTE} component={releaseDriver} />
                <AuthRoute path={VEHICLES_DRIVERS_ROUTE} component={vehiclesDrivers} />
                <AuthRoute path={DRIVERS_VEHICLES_ROUTE} component={driversvehicles} />
                <AuthRoute path={VEHICLES_TRANSACTIONS_ROUTE} component={vehiclesTransactions} />

                <AuthRoute path={DASHBOARD_ROUTE} component={dashboard} />
                
                <AuthRoute path={ADD_ORDER_ROUTE} component={addOrder} />
                <AuthRoute path={EDIT_ORDER_ROUTE} component={editOrder} />
                <AuthRoute path={ORDER_DETAILS_ROUTE} component={orderDetails} />
                <AuthRoute path={ORDERS_ROUTE} component={orders} />

                <AuthRoute path={ADD_DRIVER_ROUTE} component={addDriver} />
                <AuthRoute path={EDIT_DRIVER_ROUTE} component={editDriver} />
                <AuthRoute path={DRIVER_DETAILS_ROUTE} component={driverDetails} />
                <AuthRoute path={DRIVERS_ROUTE} component={drivers} />
                

                <AuthRoute path={ADD_VEHICLE_ROUTE} component={addVehicle} />
                <AuthRoute path={EDIT_VEHICLE_ROUTE} component={editVehicle} />
                <AuthRoute path={VEHICLE_DETAILS_ROUTE} component={vehicleDetails} />
                <AuthRoute path={VEHICLES_ROUTE} component={vehicles} />

               
                <AuthRoute path={ADD_CLIENT_ROUTE} component={addClient} />
                <AuthRoute path={EDIT_CLIENT_ROUTE} component={editClient} />
                <AuthRoute path={CLIENT_DETAILS_ROUTE} component={clientDetails} />
                <AuthRoute path={CLIENTS_ROUTE} component={clients} />
                <AuthRoute path={PREFIX_ROUTE} component={clients} />

              </Switch>
          </Sidebar>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;