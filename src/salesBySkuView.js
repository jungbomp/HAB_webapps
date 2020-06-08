import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: "orderDate",
    align: "center",
    disablePadding: true,
    label: "Order Date"
  },
  {
    id: "standardSku",
    align: "center",
    disablePadding: true,
    label: "Standard SKU"
  },
  {
    id: "productName",
    align: "center",
    disablePadding: false,
    label: "Product Name" 
  },
  {
    id: "totalOrder",
    align: "center",
    disablePadding: false,
    label: "Total Order"
  },
  {
    id: "habAmazon",
    align: "center",
    disablePadding: false,
    label: "HAB Amazon Order"
  },
  {
    id: "habSears",
    align: "center",
    disablePadding: false,
    label: "HAB Sears Order"
  },
  {
    id: "habWalmart",
    align: "center",
    disablePadding: false,
    label: "HAB Walmart Order"
  },
  {
    id: "habShopify",
    align: "center",
    disablePadding: false,
    label: "HAB Website Order"
  },
  {
    id: "mxAmazon",
    align: "center",
    disablePadding: false,
    label: "MX Amazon Order"
  },
  {
    id: "mxEbay",
    align: "center",
    disablePadding: true,
    label: "MX eBay Order"
  },
  {
    id: "mxWalmart",
    align: "center",
    disablePadding: true,
    label: "MX Walmart Order"
  },
  {
    id: "habEbay",
    align: "center",
    disablePadding: false,
    label: "Skyhigh eBay Order"
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: "1 1 100%",
    textAlign: "center"
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Sales By SKU
      </Typography>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  paper: {
    width: "100%",
    justifyContent: "center",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [selectedDateFr, setSelectedDateFr] = React.useState(new Date());
  const [selectedDateTo, setSelectedDateTo] = React.useState(new Date());
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      // const newSelecteds = rows.map(n => n.name);
      // setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDateChangeFr = date => {
    setSelectedDateFr(date);
  };

  const handleDateChangeTo = date => {
    setSelectedDateTo(date);
  };

  const converDateFormat = yyyymmdd => {
    const MMM = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec"
    };

    const yyyy = yyyymmdd.slice(0, 4);
    const mm = yyyymmdd.slice(4, 6);
    const dd = yyyymmdd.slice(-2);

    return `${MMM[mm]} ${dd}, ${yyyy}`;
  };
  
  const getData = (fileDownloadYn) => {
    const orderDateFr = `${selectedDateFr.getFullYear()}${("0" + (selectedDateFr.getMonth() + 1)).slice(-2)}${("0" + selectedDateFr.getDate()).slice(-2)}`;
    const orderDateTo = `${selectedDateTo.getFullYear()}${("0" + (selectedDateTo.getMonth() + 1)).slice(-2)}${("0" + selectedDateTo.getDate()).slice(-2)}`;
    const url = `/order/statistic/sales_by_sku?order_date_fr=${orderDateFr}&order_date_to=${orderDateTo}&file_download=${fileDownloadYn || 'N'}`;

    const getRowDataAsync = url => {
      fetch(url)
      .then(response => response.json())
      .then(json => setRows(json))
      .catch(error => {
    
      });
    };
    
    const fileDownloadAsync = url => {
      fetch(url)
      .then(response => {
        const filename = response.headers.get('Content-Disposition').split('filename=')[1];
        response.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename);
          link.click();
        });
      });
    };

    const func = {
        "N": getRowDataAsync,
        "Y": fileDownloadAsync
    }

    func[fileDownloadYn || 'N'](url);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid
            container
            direction="row"
            spacing={2}
            justify="flex-end"
            alignItems="flex-end"
          >
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="none"
                style={{ width: 140 }}
                id="date-picker-fr"
                label="Order Date From"
                value={selectedDateFr}
                onChange={handleDateChangeFr}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="none"
                style={{ width: 140 }}
                id="date-picker-to"
                label="Order Date To"
                value={selectedDateTo}
                onChange={handleDateChangeTo}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => getData('N')}>
                Search
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => getData('Y')}>
                Download
              </Button>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        </MuiPickersUtilsProvider>
        <Grid container></Grid>
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"small"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // const isItemSelected = isSelected(row.name);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={event => handleClick(event, row.name)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell> */}
                      <TableCell align="center">{converDateFormat(row.ORDER_DATE)}</TableCell>
                      <TableCell align="left">{row.STD_SKU}</TableCell>
                      <TableCell align="left">{row.PRODUCT_NAME}</TableCell>
                      <TableCell align="right">{row.TOTAL_ORDER_CNT}</TableCell>
                      <TableCell align="right">{row[1] || 0}</TableCell>
                      <TableCell align="right">{row[8] || 0}</TableCell>
                      <TableCell align="right">{row[2] || 0}</TableCell>
                      <TableCell align="right">{row[3] || 0}</TableCell>
                      <TableCell align="right">{row[4] || 0}</TableCell>
                      <TableCell align="right">{row[5] || 0}</TableCell>
                      <TableCell align="right">{row[6] || 0}</TableCell>
                      <TableCell align="right">{row[7] || 0}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[50, 100, 200, 500, 1000, 2000, 3000, 5000]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
