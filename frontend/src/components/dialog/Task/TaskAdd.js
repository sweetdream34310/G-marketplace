import { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast';
import { createTask } from '../../../api/task';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";

export default function MyModal({updateNewTask}) {
  let [isOpen, setIsOpen] = useState(false);

  const [newTask, setNewTask] = useState('');

  function closeModal() {
    setIsOpen(false)
  }

  async function saveTask() {
    if (newTask == "") {
      toast.error('Fill the task');
    } else {
      
      const res = await createTask(newTask);

      if (res == 'success') {
        updateNewTask({
          taskContent : newTask,
          status : 'new'
        })
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

  function handleNewClick() {
    setIsOpen(true)
  }

  return (
    <>
      <Button
        sx={{ background: "#2e3539" }}
        onClick={handleNewClick}
        variant="contained"
      >
        Add New
      </Button>
      <Dialog open={isOpen} onClose={closeModal}  PaperProps={{ sx: { width: "50%", minWidth: '400px' } }}>
        <DialogTitle>Create a task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="New task"
            type="text"
            fullWidth
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
