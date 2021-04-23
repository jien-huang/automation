import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from 'use-http';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {DATA_TYPE} from '../utils/Constants';


export function TestBoard(props) {
    const [updated, setUpdated] = useState(false);
    const classes = useStyles();
    const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)

    return (
        <Paper className={classes.content} >
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            <IconButton className={classes.iconButton} aria-label="Filter">
                <SearchIcon />
            </IconButton>
            <TextField
                className={classes.input}
                placeholder="Filter"
                inputProps={{ 'aria-label': 'Filter' }}
            />
        &nbsp;&nbsp;&nbsp;&nbsp;
            <Button size="small" variant="contained" disabled = {!updated} color="primary">Update</Button>
        &nbsp;&nbsp;
            <Button size="small" variant="contained" color="secondary">Delete</Button>&nbsp;&nbsp;
        &nbsp;&nbsp;
            <Divider className={classes.divider} />
            {props.info && props.info.type === DATA_TYPE.CASE && <h2>This is a case</h2>}
            {props.info && props.info.type === DATA_TYPE.DATA && <h2>This is a data</h2>}
            {props.info && props.info.type === DATA_TYPE.UI && <h2>This is a ui</h2>}
            {props.info && props.info.type === DATA_TYPE.SUITE && <h2>This is a suite</h2>}
            {props.info && props.info.type === DATA_TYPE.ROOT && <h2>This is a root</h2>}
            {props.info && props.info.type === DATA_TYPE.FOLDER && <h2>This is a folder</h2>}
            <pre>{JSON.stringify(props.info, null, 2)}</pre>
        </Paper>
    )
}