import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FilterListIcon from "@mui/icons-material/FilterList";
import LoadingButton from "@mui/lab/LoadingButton";
import jwt_decode from "jwt-decode";
import { Button } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import {
  deleteNotification,
  deleteNotificationArray,
} from "../../api/notification";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { putItemWithSKU } from "../../api/sp_api/PutItemWithSku";
import { putItemBusinessWithSKU } from "../../api/sp_api/putItemBusinessWithSKU";
import { getPermissions } from "../../api/user";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function createData(
  sku,
  currentPrice,
  suggestedPrice,
  content,
  fulfilmentType
) {
  return {
    sku,
    currentPrice,
    suggestedPrice,
    content,
    fulfilmentType,
  };
}

function descendingComparator(a, b, orderBy) {
  if (a == null) return 1;
  if (b == null) return 1;
  // console.log(a, b, orderBy)
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "sku",
    numeric: false,
    disablePadding: true,
    label: "SKU",
  },
  // {
  //   id: "action",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Action",
  // },
  {
    id: "currentPrice",
    numeric: true,
    disablePadding: false,
    label: "Current Price",
  },
  {
    id: "suggestedPrice",
    numeric: true,
    disablePadding: false,
    label: "Suggested Price",
  },
  {
    id: "content",
    numeric: true,
    disablePadding: false,
    label: "Marketplace",
  },

  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "UserName",
  },
  {
    id: "apporval",
    numeric: true,
    disablePadding: false,
    label: "",
  },
  {
    id: "notApporval",
    numeric: true,
    disablePadding: false,
    label: "",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            // sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              // active={orderBy === headCell.id}
              // direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  // onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  // orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, selectedData, notificationData, socket } = props;
  const tokenDecode = jwt_decode(localStorage.getItem("token"));

  const Navigate = useNavigate();

  const handleReject = async () => {
    const resPermission = await getPermissions();

    if (resPermission.includes(5)) {
      const result = notificationData.filter((item) =>
        selectedData.includes(item.sku + item.content + item.action)
      );

      let count = 0;

      let reqData = [];

      result.map(async (item, index) => {
        const data = {
          email: item.email,
          fromEmail: tokenDecode.email,
          action: "reject",
          content: item.content,
          currentPrice: item.currentPrice,
          suggestedPrice: item.suggestedPrice,
          sku: item.sku,
        };
        reqData.push(data);
      });

      const res = await deleteNotificationArray(reqData);
      if (res.message == "success") {
        // await update();
        socket.emit("notification", { email: tokenDecode.email, room: "room" });
        window.location.reload();
      }
    } else {
      toast.error("not permitted.");
      Navigate("/dashboard");
    }
  };

  const updateBusinessPriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemBusinessWithSKU(sendData);

    return res;
  };

  const updatePriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemWithSKU(sendData);

    return res;
    // if (res == "ACCEPTED") {
    //   toast.success(`${item.sku} update price accepted`);
    //   priceUpdate(item.index, newPrice);
    // } else {
    //   toast.error(res);
    // }
  };

  const handleAccept = async () => {
    const resPermission = await getPermissions();

    if (resPermission.includes(5)) {
      const result = notificationData.filter((item) =>
        selectedData.includes(item.sku + item.content + item.action)
      );

      let reqData = [];

      result.map(async (item, index) => {
        const resPriceData = "";

        if (item.action == "price") {
          resPriceData = await updatePriceWithSKU(
            item.currentPrice,
            item.content,
            item.sku,
            item.suggestedPrice
          );
        } else if (item.action == "business") {
          resPriceData = await updateBusinessPriceWithSKU(
            item.currentPrice,
            item.content,
            item.sku,
            item.suggestedPrice
          );
        }

        if (resPriceData == "ACCEPTED") {
          const data = {
            email: item.email,
            fromEmail: tokenDecode.email,
            action: "accept",
            content: item.content,
            currentPrice: item.currentPrice,
            suggestedPrice: item.suggestedPrice,
            sku: item.sku,
          };
          reqData.push(data);
        }
      });

      const res = await deleteNotificationArray(reqData);
      if (res.message == "success") {
        // await update();
        socket.emit("notification", { email: tokenDecode.email, room: "room" });
        window.location.reload();
      }
    } else {
      toast.error("not permitted.");
      Navigate("/dashboard");
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Outstanding Activities
        </Typography>
      )}

      {numSelected > 0 ? (
        <div style={{ display: "flex" }}>
          <Tooltip title="Not Approve">
            <IconButton onClick={handleReject}>
              <RemoveCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Approve">
            <IconButton onClick={handleAccept}>
              <LibraryAddCheckIcon />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedData: PropTypes.array.isRequired,
  notificationData: PropTypes.array.isRequired,
  socket: PropTypes.any.isRequired,
};

export default function EnhancedTable({ socket, notificationData }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("sku");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [loading, setLoading] = React.useState(false);

  const Navigate = useNavigate();

  const tokenDecode = jwt_decode(localStorage.getItem("token"));

  // console.log(notificationData)
  // if(notificationData.sku == undefined) {
  //   notificationData.sku = 'SKU'
  // }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = notificationData.map(
        (n) => n.sku + n.content + n.action
      );
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const updatePriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemWithSKU(sendData);

    return res;
  };

  const updateBusinessPriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemBusinessWithSKU(sendData);

    return res;
  };

  const handleAccept = async (
    email,
    content,
    currentPrice,
    suggestedPrice,
    sku,
    action
  ) => {
    const resPermission = await getPermissions();

    if (resPermission.includes(5)) {
      setLoading(true);

      let resPriceData = "";

      if (action == "price") {
        resPriceData = await updatePriceWithSKU(
          currentPrice,
          content,
          sku,
          suggestedPrice
        );
      } else if (action == "business") {
        resPriceData = await updateBusinessPriceWithSKU(
          currentPrice,
          content,
          sku,
          suggestedPrice
        );
      }

      if (resPriceData == "ACCEPTED") {
        // toast.success(`${item.sku} update price accepted`);
        const data = {
          email: email,
          fromEmail: tokenDecode.email,
          action: "accept",
          content: content,
          currentPrice: currentPrice,
          suggestedPrice: suggestedPrice,
          sku: sku,
        };

        const res = await deleteNotification(data);

        setLoading(false);

        if (res.message == "success") {
          console.log(res, '----------')
          // await update();
          socket.emit("notification", {
            email: tokenDecode.email,
            room: "room",
          });
          window.location.reload();
        }
      }
    } else {
      toast.error("not permitted.");
      Navigate("/dashboard");
    }
  };

  const handleReject = async (
    email,
    content,
    currentPrice,
    suggestedPrice,
    sku
  ) => {
    const resPermission = await getPermissions();

    if (resPermission.includes(5)) {
      setLoading(true);

      const data = {
        email: email,
        fromEmail: tokenDecode.email,
        action: "reject",
        content: content,
        currentPrice: currentPrice,
        suggestedPrice: suggestedPrice,
        sku: sku,
      };
      const res = await deleteNotification(data);
      if (res.message == "success") {
        setLoading(false);
        // await update();
        socket.emit("notification", { email: tokenDecode.email, room: "room" });
        window.location.reload();
      }
    } else {
      toast.error("not permitted.");
      Navigate("/dashboard");
    }
  };

  const handleClick = (event, skuContent) => {
    const selectedIndex = selected.indexOf(skuContent);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, skuContent);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (sku) => selected.indexOf(sku) !== -1;

  // Avoid a layout jump when reaching the last page with empty notificationData.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - notificationData.length)
      : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          selectedData={selected}
          numSelected={selected.length}
          notificationData={notificationData}
          socket={socket}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              // orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={notificationData.length}
            />
            <TableBody>
              {stableSort(notificationData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  // {row.sku == null ? row.sku = '' : row.sku = row.sku}
                  const isItemSelected = isSelected(
                    row.sku + row.content + row.action
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      {row.sku == "a" ? (
                        <TableRow key={index}>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>No data</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      ) : (
                        <TableRow
                          hover
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row._id}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              onClick={(event) =>
                                handleClick(
                                  event,
                                  row.sku + row.content + row.action
                                )
                              }
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="center"
                          >
                            {row.sku}
                          </TableCell>
                          {/* <TableCell align="center">
                            {row.action}
                          </TableCell> */}
                          <TableCell align="center">
                            {row.currentPrice}
                            <div style={{ width: "10px" }}></div>
                            {row.action == "business" ? (
                              <a style={{ color: "red" }}>{row.action}</a>
                            ) : (
                              <a style={{ color: "blue" }}>retail</a>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {row.suggestedPrice}
                          </TableCell>
                          <TableCell align="center">{row.content}</TableCell>
                          <TableCell align="center">{row.username}</TableCell>
                          <TableCell align="center">
                            <LoadingButton
                              loading={loading}
                              loadingPosition="start"
                              startIcon={<BookmarkAddedIcon />}
                              // endIcon={<DoNotTouchIcon />}
                              variant="contained"
                              sx={{ background: "#2e3539" }}
                              onClick={() =>
                                handleAccept(
                                  row.email,
                                  row.content,
                                  row.currentPrice,
                                  row.suggestedPrice,
                                  row.sku,
                                  row.action
                                )
                              }
                            >
                              Approve
                            </LoadingButton>
                          </TableCell>
                          <TableCell align="center">
                            <LoadingButton
                              loading={loading}
                              loadingPosition="end"
                              endIcon={<DoNotTouchIcon />}
                              variant="contained"
                              sx={{ background: "#2e3539" }}
                              onClick={() =>
                                handleReject(
                                  row.email,
                                  row.content,
                                  row.currentPrice,
                                  row.suggestedPrice,
                                  row.sku
                                )
                              }
                            >
                              Not Approved
                            </LoadingButton>
                            {/* <Button
                              variant="contained"
                              color="warning"
                              onClick={() =>
                                handleReject(
                                  row.email,
                                  row.content,
                                  row.currentPrice,
                                  row.suggestedPrice,
                                  row.sku
                                )
                              }
                            >
                              Not Approved
                            </Button> */}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={notificationData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
