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
import FourPartsHeader from './FourPartsHeader';


export function TestBoard(props) {
    const [updated, setUpdated] = useState(false);
    const classes = useStyles();
    const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)

    return (
        <Paper elevation={3} className={classes.content} >
            <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop>
            
        
            <Divider className={classes.divider} />
            <FourPartsHeader />
            <pre>{JSON.stringify(props.info, null, 2)}</pre>
        </Paper>
    )
}