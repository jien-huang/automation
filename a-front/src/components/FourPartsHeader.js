import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';

export default function FourPartsHeader(params) {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item xs={6} spacing={3}>
            <Paper className={classes.paper}>Metadata</Paper>
            </Grid>
            <Grid item xs={6} spacing={3}>
            <Paper className={classes.paper}>Default</Paper>
            </Grid>
            <Grid item xs={6} spacing={3}>
            <Paper className={classes.paper}>Input</Paper>
            </Grid>
            <Grid item xs={6} spacing={3}>
            <Paper className={classes.paper}>Output</Paper>
            </Grid>
        </Grid>
    )
}