import React, { useState } from 'react';
import { useStyles } from './Styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export default function OneTriItems({info, deleteData, updateData}) {
    const [updated, setUpdated] = useState(false);
    const classes = useStyles();
    const [value, setValue] = useState(info.value);
    const [description, setDescription] = useState(info.description);

    const handleValueChange = (e) => {
        setValue(e.target.value)
        setUpdated(true)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
        setUpdated(true)
    }

    return (
        <Accordion className={classes.content} key={info.name}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <Grid container item xs={5} spacing={3}>
                <Typography className={classes.heading}><strong>{info.name}</strong></Typography>
              </Grid>
              <Grid container item xs={7} spacing={3}>
                <Typography className={classes.secondaryHeading}>{info.value}</Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              {/* <Paper elevation={3} className={classes.inline} > */}
              <Grid container item xs={5} spacing={3}>
                <TextField label="Value" fullWidth onChange={handleValueChange} className={classes.input} value={value} />
              </Grid>
              <Grid xs={2} container item spacing={3} />
              <Grid container item xs={5} spacing={3}>
                <TextField label="Description" fullWidth onChange={handleDescriptionChange} className={classes.inut} value={description} />
              </Grid>
              {/* </Paper> */}
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button variant="contained" size="small" onClick={() => deleteData(info.name)}>Delete</Button>
              <Button variant="contained" size="small" disabled={!updated} color="primary" onClick={() => updateData({"name": info.name, "value":value, "description": description })}>Update</Button>
            </AccordionActions>
          </Accordion>

    )
}