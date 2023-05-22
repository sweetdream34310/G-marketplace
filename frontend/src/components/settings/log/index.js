import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getLogs } from "../../../api/log";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit, PriceChange } from "@mui/icons-material";
import { toast } from "react-hot-toast";
import { Button } from "@mui/material";

export default function AcccessibleTable() {
  const [logs, setLogs] = React.useState([]);

  const fetchData = async () => {
    const data = await getLogs();
    if (data.message == "no logs") {
      setLogs([]);
    } else if (data.message == "success") {
      setLogs(data.data);
      // console.log(data)
    } else {
      toast.error("Log fetch error occured. Try again later.");
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>
          {logs.length == 0 ? "no log" : `logs: ${logs.length}`}
        </caption>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Marketplace</TableCell>
            <TableCell>SKU</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Updated Price</TableCell>
            <TableCell>Timestamp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.marketplace}</TableCell>
              <TableCell>{row.sku}</TableCell>
              <TableCell>
                {row.action == "business" ? (
                  <div>
                    {" "}
                    <a style={{ color: "red" }}>business</a>
                    <a style={{ width: "10px" }}></a>
                  </div>
                ) : (
                  <div></div>
                )}

                {row.price}
              </TableCell>
              <TableCell align="center">{row.suggestedPrice}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
