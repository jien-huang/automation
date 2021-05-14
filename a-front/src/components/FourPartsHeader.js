import React from 'react';
import { useStyles } from './Styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function FourPartsHeader(params) {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item xs={6} >
                <Paper elevation={3} className={classes.paper}>Metadata</Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper elevation={3} className={classes.paper}>Default</Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper elevation={3} className={classes.paper}>Input</Paper>
            </Grid>
            <Grid item xs={6} >
                <Paper elevation={3} className={classes.paper}>Output</Paper>
            </Grid>

            <pre>{JSON.stringify(params.info, null, 2)}</pre>
        </Grid>
    )
}