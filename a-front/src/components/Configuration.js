import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useSnackbar } from 'notistack';

export function Configuration() {
  const { closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState({ url: 'http://localhost:3000/config', info: { method: 'get' } })
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
      console.log(response)
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
      <div className={classes.title}>
        <Button variant="contained">Refresh</Button>
        <Button variant="contained">Add</Button>
        <input placeholder="Name of configuration item" />
        <Divider orientation="vertical"></Divider>
        <input placeholder="Value of configuration item" />
        <Divider orientation="vertical"></Divider>
        <input placeholder="Description of configuration item" />
      </div>
      <Divider />
      <div className={classes.plainPaper}>
      { items && items.map(item => (
        <Accordion className={classes.container} key={item.name}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>{item.name}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.secondaryHeading}>{item.value}</Typography>
            </div>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            {/* <div className={classes.column} />
            <div className={classes.column}>
              <Chip label="Barbados" />
            </div>
            <div className={clsx(classes.column, classes.helper)}>
              <Typography variant="caption">
                {item.desription}
              </Typography>
            </div> */}
            <h6>{item.value}</h6>
            <h6>{item.description}</h6>
          </AccordionDetails>
          <Divider />
          <AccordionActions>
            <Button variant="contained" size="small">Delete</Button>
            <Button variant="contained" size="small" color="primary">
              Update
                                  </Button>
          </AccordionActions>
        </Accordion>

      ))}
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  )
}
