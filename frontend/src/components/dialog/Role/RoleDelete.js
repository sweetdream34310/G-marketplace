import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from '@mui/material';
import { deleteRolewithName } from "../../../api/role";
import "../../../style/pricemodal.css";
import toast from "react-hot-toast";

export default function MyModal({ role, index, allRolesUpdate }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function deleteRole() {
    let data = {
      rolename: role,
    };
    let res = await deleteRolewithName(data);
    if (res.data == "success") {
      toast.success("success");
      setIsOpen(false);
      allRolesUpdate(role, index, "delete");
    }
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <IconButton aria-label="delete" onClick={openModal}>
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
        <DialogTitle>Delete role</DialogTitle>
        <DialogContent>
          <div>role name : {role}</div>
          <div style={{ height: "10px" }} />
        </DialogContent>
        <DialogActions>
          <Button sx={{ background: "#2e3539" }} onClick={closeModal} variant="contained">
            Back
          </Button>
          <Button sx={{ background: "#2e3539" }} onClick={deleteRole} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
