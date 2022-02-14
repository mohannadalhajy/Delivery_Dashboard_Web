import React from "react";
import { makeStyles } from "@material-ui/core";
import SidebarContent from "./SidebarContent";
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
  return (<SidebarContent classes={classes} />)
}