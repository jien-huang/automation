import React from 'react';
import { useStyles } from './Styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import { RESULT_TYPE } from '../utils/Constants';

export default function ResultDetails({ info }) {
    const classes = useStyles();

    if (Array.isArray(info)) {
        return (
            info.map(element => {
                return (
                    <Grid container item xs={12} spacing={3} key={element.id}>
                        <Accordion className={classes.content} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header" >
                                <Grid container item xs={4} spacing={3}>
                                    <Typography className={classes.heading}><strong>{element.name}</strong></Typography>
                                </Grid>
                                <Grid container item xs={4} spacing={3}>
                                    {element.result === RESULT_TYPE.SUCCESS && <Typography color="primary" className={classes.secondaryHeading}>{element.result}</Typography>}
                                    {element.result === RESULT_TYPE.FAILED && <Typography color="error" className={classes.secondaryHeading}>{element.result}</Typography>}
                                    {element.result === RESULT_TYPE.IGNORED && <Typography color="textSecondary" className={classes.secondaryHeading}>{element.result}</Typography>}
                                </Grid>
                                <Grid container item xs={4} spacing={3}>
                                    <Typography className={classes.secondaryHeading}>{element.time_stamp}</Typography>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                {Array.isArray(element.content) &&
                                    <Grid container item xs={12} spacing={3}>
                                        <ResultDetails info={element.content} />
                                    </Grid>}
                                {!Array.isArray(element.content) &&
                                    <Grid container item xs={12} spacing={3}>
                                        <Typography className={classes.secondaryHeading}>{element.content}</Typography>
                                    </Grid>}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                )
            })

        );
    }
    return (
        <Accordion className={classes.content} key={info.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1c-content"
                id="panel1c-header" >
                <Grid container item xs={4} spacing={3}>
                    <Typography className={classes.heading}><strong>{info.name}</strong></Typography>
                </Grid>
                <Grid container item xs={4} spacing={3}>
                    {info.result === RESULT_TYPE.SUCCESS && <Typography color="primary" className={classes.secondaryHeading}>{info.result}</Typography>}
                    {info.result === RESULT_TYPE.FAILED && <Typography color="error" className={classes.secondaryHeading}>{info.result}</Typography>}
                    {info.result === RESULT_TYPE.IGNORED && <Typography color="textSecondary" className={classes.secondaryHeading}>{info.result}</Typography>}
                </Grid>
                <Grid container item xs={4} spacing={3}>
                    <Typography className={classes.secondaryHeading}>{info.time_stamp}</Typography>
                </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
                <Grid container item xs={11} spacing={3}>
                    <Typography className={classes.secondaryHeading}>{info.content}</Typography>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}



