import React, { useState, useEffect, useCallback } from 'react';
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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import { useSnackbar } from 'notistack';
import useFetch from 'use-http';
import Grid from '@material-ui/core/Grid';
import { debounce, filter } from 'lodash';
import { InputAdornment } from '@material-ui/core';
import { checkItemMatch, DEBOUNCE_PAUSE } from '../utils/Constants';
import  OneTriItems  from './OneTriItems';

export function Configuration() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const { get, post, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
  const [name, setName] = useState();
  const [value, setValue] = useState();
  const [description, setDescription] = useState();
  const [searchString, setSearchString] = useState('');
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState(items);

  useEffect(() => {
    // console.log(response)
    if (error) {
      enqueueSnackbar('Error Happen! Code:' + response.status + ' Message: ' + error.message, { variant: 'error' });
    }
  }, [error]);



  async function loadData() {
    const data = await get("/v1/config");
    if (response.ok) {
      setItems(data);
    }
  }

  const search = useCallback(debounce(() => {
    if (!searchString || searchString === null || searchString.length === 0) {
      // console.log("in usecallback 1:", items, !searchString, searchString.length)
      if (items.length > 0) {
        setDisplay(items);
      }

    } else {
      var newDisplay = filter(items, function (item) {
        return checkItemMatch(item, searchString)
      })
      setDisplay(newDisplay);
    }

  }, DEBOUNCE_PAUSE), [searchString])



  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {setDisplay(items)}, [items])

  function handleSearch(e) {
    setSearchString(e.target.value);
  }

  useEffect(() => {search()}, [searchString]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleValue(e) {
    setValue(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  async function updateData(updatedData) { // assume we should not update the name, use it as id
    const data = await post("/v1/config/update/" + updatedData.name, updatedData);
    if (response.ok) {
      var itemsCopy = items.filter(() => true);
      var objIndex = itemsCopy.findIndex((obj => obj && obj.name === data.name));
      if (objIndex >= 0) {
        itemsCopy[objIndex] = data;
        setItems(itemsCopy);
      }
    }
  }

  async function deleteData(name) {
    console.log('in delete func')
    await delete("/v1/config/delete/" + name);
    if (response.ok) {
      var itemsCopy = items.filter((obj => obj && obj.name != name));
      setItems(itemsCopy);

    }
  }

  async function addData(newData) {
    const data = await post("/v1/config/add", newData);
    if (response.ok) {
      setItems([...items, data]);
      setName('')
      setValue('')
      setDescription('')
    }
  }

  return (
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.conorInline} >
        <Grid container item xs={18} >
          <h2>Configuration</h2>
        </Grid>
        <Grid container item xs={6} >
        <TextField
          className={classes.searchBox} onChange={handleSearch} value={searchString}
          id="Filter"
          label="Filter"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        </Grid>
      </div>
      
      
      <Paper className={classes.content}>
        
        &nbsp;&nbsp;
        <Button className={clsx(classes.button)} size="small" variant="contained" onClick={() => loadData()}>Refresh</Button>
        &nbsp;&nbsp;
        &nbsp;&nbsp;
        <TextField className={classes.input} placeholder="Name" onChange={handleName} value={name} />
        &nbsp;&nbsp;
        <TextField className={classes.input} placeholder="Value" onChange={handleValue} value={value} />
        &nbsp;&nbsp;
        <TextField className={classes.searchBox} placeholder="Description" onChange={handleDescription} value={description} />
        &nbsp;&nbsp;
        <Button className={classes.button} size="small" onClick={() => addData({ 'name': name, 'value': value, 'description': description })}
          variant="contained" disabled={!name || !value}>Add
        </Button>
      </Paper>

      <Divider className={classes.divider} />
      <div className={classes.plainPaper}>
        {display && display.map(item => (
          <OneTriItems key={item.name} info={item} deleteData={deleteData} updateData={updateData} />
        ))}
      </div>
      {/* <pre>{JSON.stringify(items, null, 2)}</pre> */}
    </div>
  );
}
