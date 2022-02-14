import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    pagination: {    
      flexGrow: 1,
    }
  }));
function BasicPagination ({count, page, setPage, take}) {
    const classes = useStyles();
    return (
      <div className={classes.pagination}>
      <Pagination showFirstButton showLastButton count={count} page={page} color="primary"
      onChange={(event,val)=> {
        setPage(val,undefined)
      }} 
      />
      </div>
    );
}
export default BasicPagination;