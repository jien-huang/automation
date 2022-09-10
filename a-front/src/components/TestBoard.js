import React from 'react';
import { useStyles } from './Styles';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import FourPartsHeader from './FourPartsHeader';


export function TestBoard(props) {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.content} >
            {/* <Backdrop className={classes.backdrop} open={loading} >
                <CircularProgress color="inherit" />
            </Backdrop> */}
            <Divider className={classes.divider} />
            <FourPartsHeader />
            <pre>{JSON.stringify(props.info, null, 2)}</pre>
        </Paper>
    )
}