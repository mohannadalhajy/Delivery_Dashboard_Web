import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    RadioGroup,
    FormControlLabel,
    Radio,
    Divider,
    makeStyles
} from '@material-ui/core';
import { DOWNLOAD_EXCEL_API_URL } from '../../constants/index';
import { useSelector } from 'react-redux';
import DialogProgress from './DialogProgress';
//const FileDownload = require('js-file-download');
const client = require('../../redux/clients/API');
const useStyles = makeStyles((theme) => ({
    disableTransform: {
        textTransform: 'none'
    }
}));
function DialogExport({ open, setOpen }) {
    const classes = useStyles();
    const [openDownloadExcel, setOpenDownloadExcel] = useState(false);
    const [exportType, setExportType] = useState("xlsx");
    const [openProgress, setOpenProgress] = useState(false);
    const [selectType, setSelectType] = useState("all");
    const Clients = useSelector(state => state.Clients);

    const handleCloseDownloadExcel = () => {
        setOpenDownloadExcel(false);
    };
    const exportClients = () => {
        let body = [];
        if (selectType !== "all")
            Clients.clients.forEach(element => {
                if (element.checked) {
                    body.push(element.id);
                }
            });
        body = selectType === "all" ? ["all"] : body
        setOpenProgress(true)
        const promise = client.exportExcel(body)
        promise.then(res => {
            setOpenProgress(false)
            setOpenDownloadExcel(true)
            setOpen(false)
        }).catch(err => {
            setOpenProgress(false)
        });
    }

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Export Clients
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <RadioGroup
                            required={true}
                            aria-label="gender"
                            name="selectType"
                            id="selectType"
                            value={selectType}
                            onChange={e => setSelectType(e.target.value)}>
                            <FormControlLabel value="selected" disabled={Clients.selectedCount === 0} control={<Radio />} label={"Selected Client (" + Clients.selectedCount + ")"} />
                            <FormControlLabel value="all" control={<Radio />} label={"All Client (" + Clients.count + ")"} />
                        </RadioGroup>
                        <Divider />
                        Export as
                        <RadioGroup
                            required={true}
                            aria-label="gender"
                            name="exportType"
                            id="exportType"
                            value={exportType}
                            onChange={e => setExportType(e.target.value)}>
                            <FormControlLabel value="xlsx" control={<Radio />} label="Excel" />
                        </RadioGroup>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        className={classes.disableTransform}
                        color="primary">
                        Cancel
                    </Button>
                    <Button onClick={exportClients}
                        className={classes.disableTransform}
                        color="primary">
                        Export
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openDownloadExcel}
                onClose={handleCloseDownloadExcel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Download Clients
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to download the File?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDownloadExcel} color="primary">
                        No
                    </Button>
                    <a style={{ color: '#2962ff', textDecoration: 'inherit' }} href={DOWNLOAD_EXCEL_API_URL}>
                        <Button
                            onClick={() => {
                                handleCloseDownloadExcel();
                            }}
                            color="primary" autoFocus>
                            Yes
                        </Button>
                    </a>
                </DialogActions>
            </Dialog>
            {openProgress ? <DialogProgress type="export" /> : <React.Fragment />}

        </React.Fragment>
    );
}
export default DialogExport;