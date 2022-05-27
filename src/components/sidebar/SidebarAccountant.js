import React from "react";
import {
  PREFIX_ROUTE,
  CLIENTS_ROUTE,
  ADD_CLIENT_ROUTE,
  ADD_ORDER_ROUTE,
  ORDERS_ROUTE,
  DRIVERS_ROUTE,
  DASHBOARD_ROUTE,
  CUSTOMERS_ROUTE,
  ADD_CHARGE_ROUTE,
  CHARGES_ROUTE,
  ADD_CLIENT_ACCOUNT_ROUTE,
  CLIENTS_ACCOUNTS_ROUTE,
  ADD_DRIVER_ACCOUNT_ROUTE,
  DRIVERS_ACCOUNTS_ROUTE,
  ADD_DRIVER_ROUTE
} from '../../constants/index';
import {
  Menu,
  MenuItem,
  Button,
  IconButton
} from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineSharpIcon from '@material-ui/icons/PersonOutlineSharp';
import { useSelector } from 'react-redux';
import BusinessIcon from '@material-ui/icons/Business';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
// import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import RemoveIcon from '@mui/icons-material/Remove';
export default function SideBarContent({ classes }) {
  const location = useLocation();
  const Clients = useSelector(state => state.Clients);
  return (
    <div>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={DASHBOARD_ROUTE}>
        <MenuItem>
          <Button startIcon={<RemoveIcon />} className={classes.button1}>
            Home
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CLIENT_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add Client
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_DRIVER_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add Driver
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_ORDER_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add order
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CHARGE_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Add charge
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_CLIENT_ACCOUNT_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Delivery amount
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_DRIVER_ACCOUNT_ROUTE}>
        <MenuItem>
          <Button startIcon={<AddIcon />} className={classes.button1}>
            Driver amount
          </Button>
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={CLIENTS_ROUTE}>
        <MenuItem className={location.pathname === CLIENTS_ROUTE || location.pathname === PREFIX_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <BusinessIcon />
          </IconButton>
          Clients {Clients.count}
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ORDERS_ROUTE}>
        <MenuItem className={location.pathname === ORDERS_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <FactCheckIcon />
          </IconButton>
          Orders
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={DRIVERS_ROUTE}>
        <MenuItem className={location.pathname === ORDERS_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Drivers
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={CUSTOMERS_ROUTE}>
        <MenuItem className={location.pathname === CUSTOMERS_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Customers
        </MenuItem>
      </Link>
      {/* <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={VEHICLES_ROUTE}>
                  <MenuItem className={location.pathname === VEHICLES_ROUTE ? classes.clientsLink : ""}>
                    <IconButton
                      edge="start"
                      aria-label="menu"
                      className={classes.icon}
                    >
                      <TwoWheelerIcon />
                    </IconButton>
                    Vehicles
                  </MenuItem>
                </Link> */}
      {/* <MenuItem><PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button {...bindTrigger(popupState)} className={classes.button1}>
              Operations
            </Button>
            <Menu {...bindMenu(popupState)}>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={ADD_DRIVER_VEHICLE_ROUTE}>
                <MenuItem>
                  <Button startIcon={<AddIcon />} className={classes.button1}>
                    Vehicle delivery
                  </Button>
                </MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={RELEASE_VEHICLE_ROUTE}>
                <MenuItem>
                  <Button startIcon={<RemoveIcon />} className={classes.button1}>
                    Release Vehicle
                  </Button>
                </MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={RELEASE_DRIVER_ROUTE}>
                <MenuItem>
                  <Button startIcon={<RemoveIcon />} className={classes.button1}>
                    Release Driver
                  </Button>
                </MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={VEHICLES_DRIVERS_ROUTE}>
                <MenuItem>
                  <Button startIcon={<RemoveIcon />} className={classes.button1}>
                    Vehicles Drivers
                  </Button>
                </MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={DRIVERS_VEHICLES_ROUTE}>
                <MenuItem>
                  <Button startIcon={<RemoveIcon />} className={classes.button1}>
                    Drivers Vehicles
                  </Button>
                </MenuItem>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={VEHICLES_TRANSACTIONS_ROUTE}>
                <MenuItem>
                  <Button startIcon={<RemoveIcon />} className={classes.button1}>
                    Vehicles transactions
                  </Button>
                </MenuItem>
              </Link>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      </MenuItem> */}
      
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={CHARGES_ROUTE}>
        <MenuItem className={location.pathname === CHARGES_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Charges
        </MenuItem>
      </Link>
      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={CLIENTS_ACCOUNTS_ROUTE}>
        <MenuItem className={location.pathname === CLIENTS_ACCOUNTS_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Amounts delivered
        </MenuItem>
      </Link>

      <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={DRIVERS_ACCOUNTS_ROUTE}>
        <MenuItem className={location.pathname === CLIENTS_ACCOUNTS_ROUTE ? classes.clientsLink : ""}>
          <IconButton
            edge="start"
            aria-label="menu"
            className={classes.icon}
          >
            <PersonOutlineSharpIcon />
          </IconButton>
          Driver amounts
        </MenuItem>
      </Link>
    </div>
  );
}