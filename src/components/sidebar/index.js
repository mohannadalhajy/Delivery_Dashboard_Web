import React from "react";
import { makeStyles } from "@material-ui/core";
import SidebarAdmin from "./SidebarAdmin";
import SidebarStaff from "./SidebarStaff";
import SidebarAccountant from "./SidebarAccountant";
import { ROLES } from "../../constants";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#13424C',
    backgroundSize: 'cover',
    backgroundPosition: '50% 50%',
  },
  employeesLink: {
    borderRadius: '0px 50px 50px 0px',
    margin: '10px',
    backgroundColor: "#e8f0fe",
    "&:hover": {
      backgroundColor: "#e8f0fe"
    }
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
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
export default function SideBar() {
  const classes = useStyles();
  const AdminRole = ROLES[0]
  const AccountantRole = ROLES[1]
  const StaffRole = ROLES[2]
  const User = useSelector(state => state.User)
  if (User.user.role === AdminRole)
    return <SidebarAdmin classes={classes} />
  else if (User.user.role === AccountantRole)
    return <SidebarAccountant classes={classes} />
  else if (User.user.role === StaffRole)
    return <SidebarStaff classes={classes} />
  return <div></div>
}