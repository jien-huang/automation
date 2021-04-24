import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import useFetch from 'use-http';

export default function OneResult() {
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
    const [items, setItems] = useState([]);

    useEffect(() => {
        // console.log(response)
        if (error) {
            enqueueSnackbar('Error Happen! Code:' + response.status + ' Message: ' + error.message, { variant: 'error' });
        }
    }, [error, response]);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const data = await get("/v1/results/oneResult/" + id);
        if (response.ok) {
            setItems(data);
        }
    }


    return (
        <pre>{JSON.stringify(items, null, 2)}</pre>
    );

}