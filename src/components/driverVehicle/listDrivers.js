import React from 'react';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    checkBox: {
        color: '#1a73e8',
        padding: "12px 0 8px 0"
    },
    tableCell: {
        color: 'inherit',
        textDecoration: 'inherit'
    },
    countRow: {
        fontSize: ".6875rem",
        color: "#5f6368",
        fontWeight: "500",
        padding: '10px',
        height: '20px',
        display: 'flex'
    },
    TableRow: {
        '&.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: "#f2f2f2"
        },
        "&:hover .actions": {
            opacity: "1"
        },
        "& .actions": {
            opacity: "0"
        },
        "&:hover .image": {
        },
        "& .image": {
            display: "table-cell"
        },
        "&:hover .checkbox": {
            display: "table-cell"
        },
        "& .checkbox": {
            display: "none"
        },
        "& .hideImage": {
            display: "none"
        }
    },
    selectedCell: {
        fontSize: '.875rem',
        fontWeight: '500px',
        color: '#1a73e8',
        whiteSpace: 'nowrap',
        fontFamily: 'Google Sans, Roboto,Arial,sans-serif'
    }
}));

function ListDriversVehicles({records}) {
    const classes = useStyles();

    return (
        <div >
            <TableContainer>
                <Table>
                    <TableHead>

                        <TableRow role="checkbox">
                            <TableCell align="left">Driver name</TableCell>
                            <TableCell align="left">Vehicle number</TableCell>
                            <TableCell align="left">Transport type</TableCell>
                            <TableCell align="left">Start date</TableCell>
                            <TableCell align="left">End date</TableCell>
                            <TableCell align="left" size='small'></TableCell>
                            <TableCell align="right" size='small'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((item, index) => (
                            <TableRow
                                role="checkbox"
                                hover
                                classes={{
                                    root: classes.TableRow
                                }}
                                key={item.id}>

                                <TableCell
                                    align="left"
                                    className={classes.tableCell}>
                                    {item.nick_name}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}
                                >{item.number}</TableCell>
                                <TableCell
                                    align="left"
                                    className={classes.tableCell}>
                                    {item.type}</TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="left">
                                    {item.start_date}</TableCell>
                                <TableCell
                                    className={classes.tableCell}
                                    align="left">
                                    {item.end_date?item.end_date:item.start_date?"Current":""}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>);
}
export default ListDriversVehicles;