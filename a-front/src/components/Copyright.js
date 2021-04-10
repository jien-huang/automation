import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { useStyles } from './Styles';

export function Copyright() {
    const classes = useStyles();
    return (
        <Typography className={classes.footer}>
            {'Copyright © '} &nbsp;
            <Link color="inherit" href="http://www.automation-test.com/">
                www.automation-test.com
      </Link>{' '} &nbsp;
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
