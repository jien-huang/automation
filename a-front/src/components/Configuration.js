import React, { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from 'notistack';
import useFetch from 'use-http';
import Grid from '@mui/material/Grid';
import { debounce, filter } from 'lodash';
import { InputAdornment } from '@mui/material';
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
    <Grid container item xs={12} spacing={1}>
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.conorInline} >
        <Grid container item xs={12} >
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
      
      
      <Paper elevation={3} className={classes.content}>
        
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
    </Grid>
  );
}
