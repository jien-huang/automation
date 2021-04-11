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

export function Configuration() {
  const { closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState({ url: 'http://localhost:3000/config', info: { method: 'get' } })
  const [items, setItems] = useState([]);
  useItems(request)

  function useItems(request) {
    useEffect(() => {
      if (!request || !request.url || !request.info) {
        return;
      }
      setLoading(true)
      fetch(request.url, request.info).then(
        response => {
          const statusCode = response.status;
          var data = response.json();
          if (statusCode >= 400) {
            // replace this with global popup
            closeSnackbar('Error status: ' + statusCode + ' Message: ' + response.statusText, { variant: 'error' })
          }
          return Promise.all([statusCode, data]);
        }
      ).then(([statusCode, data]) => {
        handleRequest(statusCode, data);
      }).catch((error) => {
        closeSnackbar('Error : ' + error, { variant: 'error' })
      }).finally(() => {
        setLoading(false)
      })
    }, [request])
  }

  function handleRequest(statusCode, response) {
    if (statusCode < 400) {
      // console.log(response)
      if (response) {
        setItems(response)
      } else {
        setItems([...items, { response }])
      }
    }
  }

  return (
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Configurations</h2>
      <Paper className={classes.inline}>
        <Button size="small" variant="contained">Refresh</Button>
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
  )
}
