import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast';
import { deleteTask } from '../../../api/task';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";
import { IconButton, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function MyModal({ updateDeleteTask, content }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  async function handleDelete() {

    const res = await deleteTask(content);

    if (res == 'success') {
      updateDeleteTask(content)
      toast.success('success');
      setIsOpen(false);
    } else {
      toast.error(res);
    }
  }

  function handleClick() {
    setIsOpen(true)
  }

  return (
    <>
      <Tooltip arrow placement="right" title="Delete">
        <IconButton color="default" onClick={handleClick}>
          <Delete />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={closeModal} PaperProps={{ sx: { width: "20%", minWidth: '350px' } }}>
        <DialogTitle>Delete task</DialogTitle>
        <DialogContent>
          <a>delete &nbsp; "{content}" </a>
        </DialogContent>
        <DialogContent>
          <a>Are you sure ?  </a>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ background: "#2e3539" }}
            onClick={closeModal}
            variant="contained"
          >
            No
          </Button>
          <Button
            sx={{ background: "#2e3539" }}
            onClick={handleDelete}
            variant="contained"
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
