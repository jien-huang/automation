import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useStyles } from './Styles';
import { useSnackbar } from 'notistack';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];


export default function Results() {
  const { closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [request, setRequest] = useState({ url: 'http://localhost:3000/tests', info: { method: 'get' } });
  const [items, setItems] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  function useItems(request) {
    useEffect(() => {
      if (!request || !request.url || !request.info) {
        return;
      }
      setLoading(true);
      fetch(request.url, request.info).then(
        response => {
          const statusCode = response.status;
          var data = response.json();
          if (statusCode >= 400) {
            // replace this with global popup
            closeSnackbar('Error status: ' + statusCode + ' Message: ' + response.statusText, { variant: 'error' });
          }
          return Promise.all([statusCode, data]);
        }
      ).then(([statusCode, data]) => {
        handleRequest(statusCode, data);
      }).catch((error) => {
        closeSnackbar('Error : ' + error, { variant: 'error' });
      }).finally(() => {
        setLoading(false);
      });
    }, [request]);
  }
  function handleRequest(statusCode, response) {
    if (statusCode < 400) {
      // console.log(response)
      if (response) {
        // it should always return the new structure: even just update one item.
        setItems(response);
      }
    }
  }
  return (
    <div className={classes.content}>
      <Backdrop className={classes.backdrop} open={loading} >
        <CircularProgress color="inherit" />
      </Backdrop>
      <h2>Results</h2>

      <Paper className={classes.content}>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="summary">
            <TableBody>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Total Results</TableCell>
                <TableCell align="right">331</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Passed</TableCell>
                <TableCell align="right">101 ignored</TableCell>
                <TableCell align="right">300</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Failed</TableCell>
                <TableCell align="right">31</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Divider className={classes.divider} />

      <div className={classes.plainPaper}>
        {/* put table here */}
        <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      </div>



    </div>
  );
}
