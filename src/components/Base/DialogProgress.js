import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles
} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    disableTransform: {
        textTransform: 'none'
    },
    progress: {
        width: '200px'
    }
}));
function DialogProgress() {
    const classes = useStyles();
    
    return (
        <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">
            </DialogTitle>
            <DialogContent>
                    <div className={classes.progress}>
                        Wait please
                    </div>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    );
}
export default DialogProgress;