import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import AutoComplete from "../../settings/AutoComplete";
import { toast } from "react-hot-toast";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from '@mui/material';
import { updateUsernameRole } from "../../../api/user";
import "../../../style/pricemodal.css";

export default function MyModal({ item, index, allUsersUpdate }) {
  
  const { email, role, username } = item;
  
  let [isOpen, setIsOpen] = useState(false);
  const [roleEdit, setRoleEdit] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  async function saveUser() {
    if (roleEdit == "") {
      toast.error("Set the role");
    } else if (roleEdit == role) {
      toast.error("No changes");
    } else {
      const sendData = {
        email: email,
        username: username,
        role: roleEdit,
      };
      const res = await updateUsernameRole(sendData);
      if (res == "success") {
        toast.success("Update Success");
        setIsOpen(false);
        allUsersUpdate(sendData, index, "edit");
      } else {
        toast.error("Update Error");
      }
    }
  }

  const handleChange = (newValue) => {
    setRoleEdit(newValue);
  };

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <IconButton aria-label="delete" onClick={openModal}>
          <EditIcon />
        </IconButton>
      </div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Edit user role</DialogTitle>
        <DialogContent>
          <div>email : {email}</div>
          <div style={{ height: "10px" }} />
          <div>Username : {username}</div>
          <div style={{ height: "10px" }} />
          <AutoComplete role={role} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button sx={{ background: "#2e3539" }} onClick={closeModal} variant="contained">
            Back
          </Button>
          <Button sx={{ background: "#2e3539" }} onClick={saveUser} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}