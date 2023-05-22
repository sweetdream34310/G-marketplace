import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast';
import { updateTask } from '../../../api/task';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";
import { IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';

export default function MyModal({ updateEditTask, content }) {
  let [isOpen, setIsOpen] = useState(false);

  const [newTask, setNewTask] = useState(content);

  function closeModal() {
    setIsOpen(false)
  }

  async function saveTask() {
    if (newTask == "") {
      toast.error('Fill the task');
    } else if (newTask == content) {
      toast.error('No change');
    } else {
      const res = await updateTask(content, newTask);

      if (res == 'success') {
        updateEditTask(newTask)
        toast.success('success');
        setIsOpen(false);
      } else {
        toast.error(res);
      }
    }
  }

  const handleTaskInputChange = (event) => {
    setNewTask(event.target.value);
  }

  function handleClick() {
    setIsOpen(true)
  }

  return (
    <>
      <Tooltip arrow placement="left" title="Edit" onClick={handleClick}>
        <IconButton color="default">
          <Edit />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={closeModal} PaperProps={{ sx: { width: "50%", minWidth: '400px' } }}>
        <DialogTitle>Edit task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Edit task"
            type="text"
            fullWidth
            defaultValue={content}
            variant="standard"
            onChange={handleTaskInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ background: "#2e3539" }}
            onClick={closeModal}
            variant="contained"
          >
            Back
          </Button>
          <Button
            sx={{ background: "#2e3539" }}
            onClick={saveTask}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
