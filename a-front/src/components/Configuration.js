import React, { useState, useEffect } from 'react';
import { useStyles } from './Styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useSnackbar } from 'notistack';
import useFetch from 'use-http';

export function Configuration() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    console.log(response)
    if(error) {
      enqueueSnackbar('Error Happen! Code:'+ response.status +' Message: ' + error.message, { variant: 'error' });
    }
  },[error, response]);

  useEffect(() => {
    loadData();
  },[]);

  async function loadData() {
    const data = await get("/v1/config");
    if(response.ok) {
      setItems(data);
    }
  }

  return (
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Configurations</h2>
      <Paper className={classes.content}>
        <Button size="small" variant="contained" onClick={() => loadData()}>Refresh</Button>
        &nbsp;&nbsp;
        <Button size="small" variant="contained">Add</Button>&nbsp;&nbsp;
        &nbsp;&nbsp;
        <TextField placeholder="Name" />
        &nbsp;&nbsp;
        <TextField placeholder="Value" />
        &nbsp;&nbsp;
        <TextField placeholder="Description" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <IconButton className={classes.iconButton} aria-label="Filter">
          <SearchIcon />
        </IconButton>
        <TextField
          className={classes.input}
          placeholder="Filter"
          inputProps={{ 'aria-label': 'Filter' }}
        />

      </Paper>

      <Divider className={classes.divider} />
      <div className={classes.plainPaper}>
        {items && items.map(item => (
          <Accordion className={classes.content} key={item.name}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <div className={classes.column}>
                <Typography className={classes.heading}><strong>{item.name}</strong></Typography>
              </div>
              <div className={classes.column}>
                <Typography className={classes.secondaryHeading}>{item.value}</Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Paper className={classes.inline} >
                <TextField label="Value" fullWidth className={classes.input} defaultValue={item.value} />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <TextField label="Description" fullWidth className={classes.input} defaultValue={item.description} />
              </Paper>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button variant="contained" size="small">Delete</Button>
              <Button variant="contained" size="small" color="primary">Update</Button>
            </AccordionActions>
          </Accordion>

        ))}
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
}
