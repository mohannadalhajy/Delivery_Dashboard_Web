import React from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/User/Actions';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../constants/index';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    color:"#5f6368",
    backgroundColor:"#fff",
    flexGrow: 1,
    height: "60px",
    boxShadow:"0px 0px 0px 0px rgba(0,0,0,0.2),0px 0px 0px 0px rgba(0,0,0,0.14),0px 0px 0px 0px rgba(0,0,0,0.12)",
  },
  grow: {
    flexGrow: 1,
    boxShadow:"0px"
  },
  menuButton: {
    color: "#5f6368",
    marginRight: theme.spacing(2),
  },
  title: {
    color: "#5f6368",
    display: 'none',
    fontSize:'22px',
    lineHeight:'24px',
    width:'137px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    position: 'relative',
    color:"black",
    background:"#f1f3f4",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    border:'1px solid transparent',
    borderRadius:'8px',
    height:'46px',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    color: "#5f6368",
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function NavMenu({ setCollapsed, collapsed }) {
  const classes = useStyles();
  const [anchorProfile, setanchorProfile] = React.useState(null);
  const dispatch = useDispatch();
  const user = useSelector(state => state.User);
  const openProfile = Boolean(anchorProfile);
  const history = useHistory();

  const handleMenu = (event) => {
    //setAnchorEl(event.currentTarget);
    setCollapsed(!collapsed)
  };
  const handleprofile = (event) => {
    setanchorProfile(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setanchorProfile(null);
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={handleMenu}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Sinbad
          </Typography>
          <div className={classes.grow} />
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleprofile}
              color="inherit"
              size="medium"
            >
            <AccountCircle/>
            </IconButton>
            <Menu
              id="menu-appbar-profile"
              anchorEl={anchorProfile}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={openProfile}
              onClose={handleCloseProfile}
            >
              {user.user.user_name === undefined ?
                <div>
                  <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to={LOGIN_ROUTE}>
                    <MenuItem onClick={handleCloseProfile}>Login</MenuItem>
                  </Link>
                </div> :
                <div>
                  <MenuItem onClick={()=>{
                    handleCloseProfile();
                    history.push(PROFILE_ROUTE);
                  }}>Profile</MenuItem>
                
                  <MenuItem onClick={() => {
                    handleCloseProfile();
                    dispatch(logout());
                  }}>Logout</MenuItem>
                </div>
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
