import { React, Fragment, useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";
import { IconButton, Tooltip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { toast } from 'react-hot-toast';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getLog } from '../../../api/log';

export default function MyModal({ marketplace, sku }) {
  let [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState([]);

  function closeModal() {
    setIsOpen(false)
  }

  function handleClick() {
    getLogs();
    setIsOpen(true)
  }

  const getLogs = async () => {

    const logList = await getLog(marketplace, sku);

    if (logList.message == 'no logs') {
      setLogs([])
    } else if (logList.message == 'success') {
      setLogs(logList.data)
      // console.log(data)
    } else {
      toast.error('Log fetch error occured. Try again later.')
    }
  }

  return (
    <>
      <Tooltip arrow placement="right" title="View log" onClick={handleClick}>
        <IconButton color="info">
          <HistoryIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={closeModal} keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { width: "80%", minWidth: '400px', maxWidth: '1000px', height: "auto", borderRadius: '10px' } }}
      >
        <DialogTitle>Log &nbsp;&nbsp;&nbsp;&nbsp; {marketplace} &nbsp;&nbsp;&nbsp;&nbsp; {sku} </DialogTitle>
        <DialogContent>
          <Table aria-label="caption table" sx={{ minWidth: 650 }}>
            <caption>{logs.length == 0 ? 'no log' : `logs: ${logs.length}`}</caption>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell >Username</TableCell>
                <TableCell >Action</TableCell>
                <TableCell >Price</TableCell>
                <TableCell >Updated Price</TableCell>
                <TableCell >Timestamp</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.email}
                  </TableCell>
                  <TableCell >{row.username}</TableCell>
                  <TableCell >{row.action}</TableCell>
                  <TableCell >{row.price}</TableCell>
                  <TableCell align='center'>{row.suggestedPrice}</TableCell>
                  <TableCell >{row.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ background: "#2e3539" }}
            onClick={closeModal}
            variant="contained"
          >
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
