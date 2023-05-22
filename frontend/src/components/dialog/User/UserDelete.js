import { Fragment, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from '@mui/material';
import { deleteUser } from '../../../api/user';
import "../../../style/pricemodal.css";
import { toast } from 'react-hot-toast';

export default function MyModal({ item, index, allUsersUpdate }) {
  const { email, username } = item;
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function handleDelete() {
    const res = await deleteUser(email);
    const data = [];
    if (res == "success") {
      toast.success('Delete success');
      setIsOpen(false);
      allUsersUpdate(data, index, "delete");
    } else {
      toast.error("Delete error");
    }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center" onClick={openModal}>
        <IconButton aria-label="delete" >
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Delete user</DialogTitle>
        <DialogContent>
          <div>email : {email}</div>
          <div style={{ height: "10px" }} />
          <div>Username : {username}</div>
          <div style={{ height: "10px" }} />
        </DialogContent>
        <DialogActions>
          <Button sx={{ background: "#2e3539" }} onClick={closeModal} variant="contained">
            Back
          </Button>
          <Button sx={{ background: "#2e3539" }} onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
