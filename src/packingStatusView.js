import React from "react";
import PropTypes from "prop-types";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Box from '@material-ui/core/Box';
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
import Checkbox from "@material-ui/core/Checkbox";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";


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
  { id: "orderNo", align: "center", disablePadding: false, label: "Order #" },
  { id: "sku", align: "center", disablePadding: false, label: "SKU" },
  {
    id: "productName",
    align: "center",
    disablePadding: false,
    label: "Product Name"
  },
  {
    id: "marketplace",
    align: "center",
    disablePadding: false,
    label: "Marketplace"
  },
  {
    id: "employee",
    align: "center",
    disablePadding: false,
    label: "Employee"
  },
  {
    id: "noItem",
    align: "center",
    disablePadding: false,
    label: "No Item"
  },
  {
    id: "tagChange",
    align: "center",
    disablePadding: false,
    label: "Tag Change"
  },
  {
    id: "fulfilledDate",
    align: "center",
    disablePadding: true,
    label: "Fulfilled Date"
  }
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
        Packing Data Access
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
  subSum: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
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
  const [totalOrders, setTotalOrders] = React.useState(0);
  const [totalNoItem, setTotalNoItem] = React.useState(0);
  const [totalTagChange, setTotalTagChange] = React.useState(0);
  const [selectedDates, setSelectedDates] = React.useState([]);
  const [selectedItemDetails, setSelectedItemDetails] = React.useState([]);
  const [dateList, setDateList] = React.useState([]);
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [employeeList, setEmployeeList] = React.useState([]);
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

  const handleDateFilterChange = event => {
    setSelectedDates(event.target.value);
  }

  const handleItemDetailsFilterChange = event => {
    setSelectedItemDetails(event.target.value);
  }

  const handleEmployeeFilterChange = event => {
    setSelectedEmployees(event.target.value);
  }

  const handleDeleteDateFilter = () => {
    setSelectedDates([]);
  }

  const handleDeleteItemDetailsFilter = itemDetail => () => setSelectedItemDetails(selectedItemDetails.filter(item => item !== itemDetail));

  const handleDeleteEmployeeFilter = () => {
    setSelectedEmployees([]);
  }

  const handleButtonCleanAllFilter = () => {
    handleDeleteDateFilter();
    setSelectedItemDetails([]);
    handleDeleteEmployeeFilter();
  }

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

  const converNumberFormat = num => {
    if (0 === num) return '0';

    let numStr = '';
    let thousand = 1;
    while (0 < num) {
      numStr = `${num%10}${1000 === thousand ? ',' : ''}${numStr}`;
      thousand = (1000 === thousand ? 10 : thousand * 10);
      num = Math.floor(num/10);
    }

    return numStr;
  }

  const getData = fileDownloadYn => {
    const orderDateFr = `${selectedDateFr.getFullYear()}${(
      "0" +
      (selectedDateFr.getMonth() + 1)
    ).slice(-2)}${("0" + selectedDateFr.getDate()).slice(-2)}`;
    const orderDateTo = `${selectedDateTo.getFullYear()}${(
      "0" +
      (selectedDateTo.getMonth() + 1)
    ).slice(-2)}${("0" + selectedDateTo.getDate()).slice(-2)}`;
    const url = `/order/statistic/packing_status?order_date_fr=${orderDateFr}&order_date_to=${orderDateTo}&file_download=${fileDownloadYn ||
      "N"}`;

    const getRowDataAsync = url => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          const dateSet = new Set();
          const employeeSet = new Set();
          let totalNoItemSum = 0;
          let totalTagChangeSum = 0;
          json.forEach(orderItem => {
            orderItem.ORDER_DATE = converDateFormat(orderItem.ORDER_DATE);
            dateSet.add(orderItem.ORDER_DATE);
            orderItem.EMPLOYEE_NAME && employeeSet.add(orderItem.EMPLOYEE_NAME);
            totalNoItemSum += (orderItem.NO_ITEM_YN === 'Y' ? 1 : 0);
            totalTagChangeSum += (orderItem.TAG_CHANGE_YN === 'Y' ? 1 : 0);
          });
          setDateList([...dateSet]);
          setEmployeeList([...employeeSet]);
          setTotalOrders(json.length);
          setTotalNoItem(totalNoItemSum);
          setTotalTagChange(totalTagChangeSum);
          setRows(json);
        })
        .catch(error => {});
    };

    const fileDownloadAsync = url => {
      fetch(url).then(response => {
        const filename = response.headers
          .get("Content-Disposition")
          .split("filename=")[1];
        response.blob().then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename);
          link.click();
        });
      });
    };

    const func = {
      N: getRowDataAsync,
      Y: fileDownloadAsync
    };

    func[fileDownloadYn || "N"](url);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid container alignItems="center"> 
                <Grid item className={classes.subSum} xs={2}>
                  <Box textAlign="left">Total Orders</Box>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <Box textAlign="right">{converNumberFormat(totalOrders)}</Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item className={classes.subSum} xs={2}>
                  <Box textAlign="left">Total No Item</Box>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <Box textAlign="right">{converNumberFormat(totalNoItem)}</Box>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item className={classes.subSum} xs={2}>
                  <Box textAlign="left">Total Tag Change</Box>
                </Grid>
                <Grid item xs={2}>
                  <Paper className={classes.paper}>
                    <Box textAlign="right">{converNumberFormat(totalTagChange)}</Box>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid 
              item
              style={{display: "flex"}}
              xs={6}
            >
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => getData("N")}
                  >
                    Search
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={() => getData("Y")}>
                    Download
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={9}>
              <Grid container alignItems="flex-end">
                <Grid item>
                  <Paper>
                    <Button 
                      color="primary"
                      onClick={handleButtonCleanAllFilter}
                    >
                      CLEAN ALL
                    </Button>
                  {0 < selectedDates.length ? (
                    <Chip
                      key={'Date'}
                      label={'Date'}
                      onDelete={handleDeleteDateFilter}
                      className={classes.chip}
                    />
                    ) : <React.Fragment />
                  }
                  {-1 < selectedItemDetails.indexOf('No Item') ? (
                    <Chip
                      key={'No Item'}
                      label={'No Item'}
                      onDelete={handleDeleteItemDetailsFilter('No Item')}
                      className={classes.chip}
                    />
                    ) : <React.Fragment />
                  }
                  {-1 < selectedItemDetails.indexOf('Tag Change') ? (
                    <Chip
                      key={'Tag Change'}
                      label={'Tag Change'}
                      onDelete={handleDeleteItemDetailsFilter('Tag Change')}
                      className={classes.chip}
                    />
                    ) : <React.Fragment />
                  }
                  {0 < selectedEmployees.length ? (
                    <Chip
                      key={'Employee'}
                      label={'Employee'}
                      onDelete={handleDeleteEmployeeFilter}
                      className={classes.chip}
                    />
                    ) : <React.Fragment />
                  }
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <FormControl className={classes.formControl}>
                <InputLabel id="date-filter-multiple-select-label">Date</InputLabel>
                <Select
                  labelId="date-filter-multiple-select-label"
                  id="date-filter-multiple-select"
                  multiple
                  value={selectedDates}
                  onChange={handleDateFilterChange}
                  input={<Input id="date-filter-multiple-select-input" />}
                  // renderValue={selected => selected.join(", ")}
                  renderValue={selected => <em>Selected</em>}
                >
                  {dateList.map(date => (
                    <MenuItem key={date} value={date}>
                      <Checkbox checked={selectedDates.indexOf(date) > -1} />
                      <ListItemText primary={date} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl className={classes.formControl}>
                <InputLabel id="item-details-filter-multiple-select-label">Item Details</InputLabel>
                <Select
                  labelId="item-details-filter-multiple-select-label"
                  id="item-details-filter-multiple-select"
                  multiple
                  value={selectedItemDetails}
                  onChange={handleItemDetailsFilterChange}
                  input={<Input id="item-details-filter-multiple-select-input" />}
                  // renderValue={selected => selected.join(", ")}
                  renderValue={selected => <em>Selected</em>}
                >
                  {['No Item', 'Tag Change'].map(itemDetail => (
                    <MenuItem key={itemDetail} value={itemDetail}>
                      <Checkbox checked={selectedItemDetails.indexOf(itemDetail) > -1} />
                      <ListItemText primary={itemDetail} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={1}>
              <FormControl className={classes.formControl}>
                <InputLabel id="employee-filter-multiple-select-label">employee</InputLabel>
                <Select
                  labelId="employee-filter-multiple-select-label"
                  id="employee-filter-multiple-select"
                  multiple
                  value={selectedEmployees}
                  onChange={handleEmployeeFilterChange}
                  input={<Input id="employee-filter-multiple-select-input" />}
                  // renderValue={selected => selected.join(", ")}
                  renderValue={selected => <em>Selected</em>}
                >
                  {employeeList.map(employee => (
                    <MenuItem key={employee} value={employee}>
                      <Checkbox checked={selectedEmployees.indexOf(employee) > -1} />
                      <ListItemText primary={employee} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
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
                .filter(row => (selectedDates.length < 1 || -1 < selectedDates.indexOf(row.ORDER_DATE))
                   && (selectedItemDetails.length < 1 || (row.NO_ITEM_YN === 'Y' && -1 < selectedItemDetails.indexOf('No Item')))
                   && (selectedItemDetails.length < 1 || (row.TAG_CHANGE_YN === 'Y' && -1 < selectedItemDetails.indexOf('Tag Change')))
                   && (selectedEmployees.length < 1 || -1 < selectedEmployees.indexOf(row.EMPLOYEE_NAME))
                  )
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
                      <TableCell align="center">
                        {row.ORDER_DATE}
                      </TableCell>
                      <TableCell align="center">
                        {row.CHANNEL_ORDER_NO}
                      </TableCell>
                      <TableCell align="left">{row.STD_SKU}</TableCell>
                      <TableCell align="left">{row.PRODUCT_NAME}</TableCell>
                      <TableCell align="center">{row.MARKET_NAME}</TableCell>
                      <TableCell align="center">{row.EMPLOYEE_NAME}</TableCell>
                      <TableCell align="center">
                        <DoneOutlineRoundedIcon
                          color={
                            row.NO_ITEM_YN === "Y" ? "primary" : "disabled"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <DoneOutlineRoundedIcon
                          color={
                            row.TAG_CHANGE_YN === "Y" ? "primary" : "disabled"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        {"01" === row.SHIPPING_STATUS
                          ? `${converDateFormat(row.PROC_DT)}`
                          : ""}
                      </TableCell>
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
