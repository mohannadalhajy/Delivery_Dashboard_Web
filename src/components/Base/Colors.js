import {
    makeStyles
} from '@material-ui/core';
import {
    deepOrange,
    deepPurple,
    red,
    pink,
    indigo,
    blue,
    lightBlue,
    cyan,
    teal,
    green,
    lightGreen,
    lime,
    yellow,
    amber,
    orange,
    brown,
    grey,
    blueGrey
} from '@material-ui/core/colors';

export const Colors = makeStyles((theme) => ({
    deepOrange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    indigo: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    lightBlue: {
        color: theme.palette.getContrastText(lightBlue[500]),
        backgroundColor: lightBlue[500],
    },
    cyan: {
        color: theme.palette.getContrastText(cyan[500]),
        backgroundColor: cyan[500],
    },
    teal: {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    lightGreen: {
        color: theme.palette.getContrastText(lightGreen[500]),
        backgroundColor: lightGreen[500],
    },
    lime: {
        color: theme.palette.getContrastText(lime[500]),
        backgroundColor: lime[500],
    },
    yellow: {
        color: theme.palette.getContrastText(yellow[500]),
        backgroundColor: yellow[500],
    },
    amber: {
        color: theme.palette.getContrastText(amber[500]),
        backgroundColor: amber[500],
    },
    orange: {
        color: theme.palette.getContrastText(orange[500]),
        backgroundColor: orange[500],
    },
    brown: {
        color: theme.palette.getContrastText(brown[500]),
        backgroundColor: brown[500],
    },
    grey: {
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[500],
    },
    blueGrey: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blueGrey[500],
    }
}));
