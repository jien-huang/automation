import React, { useState, useEffect } from 'react';
// import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import useFetch from 'use-http';
import { columns, API_GET_ALL_RESULTS, checkItemMatch, DEBOUNCE_PAUSE } from '../utils/Constants';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Switch from '@material-ui/core/Switch';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { debounce, filter } from 'lodash';
import { InputAdornment } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default function Results() {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('end');
  const { get, response, loading, error } = useFetch(process.env.REACT_APP_HOST_URL)
  const [items, setItems] = useState();
  const [display, setDisplay] = useState(items);
  const [dense, setDense] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ignored, setIgnored] = useState(0);
  const [success, setSuccess] = useState(0);
  const [failed, setFailed] = useState(0);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    // console.log(response)
    if (error) {
      enqueueSnackbar('Error Happen! Code:' + response.status + ' Message: ' + error.message, { variant: 'error' });
    }
  }, [error, response]);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setDisplay(items)
  }, [items])

  useEffect(() => {
    calculate()
  }, [display])

  useEffect(() => { 
    setDisplay(items) 
  }, [items])

  const search = debounce(() => {
    if (!searchString || searchString === null || searchString.length === 0) {
      if (items && items.length > 0) {
        setDisplay(items);
      }

    } else {
      var newDisplay = filter(items, function (item) {
        return checkItemMatch(item, searchString)
      })
      setDisplay(newDisplay);
    }

  }, DEBOUNCE_PAUSE)

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchString(e.target.value);
  }

  useEffect(() => { 
    search() 
  }, [searchString]);

  function calculate() {
    if (display && display.length > 0) {
      var _success = 0;
      var _ignored = 0;
      var _failed = 0;
      display.forEach(element => {
        if (element.result === 'Success') {
          _success++;
        }
        if (element.result === 'Ignored') {
          _ignored++;
        }
        if (element.result === 'Failed') {
          _failed++;
        }

      });
      setFailed(_failed);
      setSuccess(_success);
      setIgnored(_ignored);
    }
  }

  async function loadData() {
    const data = await get(API_GET_ALL_RESULTS);
    if (response.ok) {
      // console.log(data)
      setItems(data);
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    if (!array || array.length <= 0) {
      return [];
    }
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={classes.conorInline} >
        <Grid container item xs={12} >
          <h2>Results</h2>
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

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        ActionsComponent={() => {
          return (<div className={classes.conorInline}><FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense"
          />
          </div>)
        }}
        count={display ? display.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      {display && display.length > 0 &&
        <div>
          <Paper elevation={3} className={classes.content}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="summary" size={dense ? 'small' : 'medium'}>
                <TableBody>
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Total Results</TableCell>
                    <TableCell align="right">{display.length}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Passed</TableCell>
                    <TableCell align="right">{ignored} (Ignored)</TableCell>
                    <TableCell align="right">{ignored + success}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>Failed</TableCell>
                    <TableCell align="right">{failed}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Divider className={classes.divider} />

          <div className={classes.plainPaper}>
            {/* put table here */}
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table" className={classes.table} size={dense ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        sortDirection={orderBy == column.id ? order : false}
                        style={{ minWidth: column.minWidth }}
                      >
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : 'asc'}
                          onClick={createSortHandler(column.id)}
                        >
                          {column.label}
                          {orderBy === column.id ? (
                            <span className={classes.visuallyHidden}>
                              {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </span>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(display, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    return (
                      <TableRow hover style={{ height: (dense ? 4 : 64) }} role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.id !== "id" && value}
                              {column.id === "id" && <Link href={`results/oneResult/${value}`} color={"inherit"}>{value}</Link>}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

          </div>
        </div>
      }
    </div>
  );
}
