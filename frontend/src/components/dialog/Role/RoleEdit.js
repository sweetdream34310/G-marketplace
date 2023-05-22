import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Permission from "../../settings/permissions/Permission";
import { updaterole } from "../../../api/role";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-hot-toast";
import "../../../style/pricemodal.css";

export default function MyModal({ role, allRolesUpdate }) {
  let [isOpen, setIsOpen] = useState(false);
  const [roleEdit, setRoleEdit] = useState("");
  const [option, setOption] = useState("view all");

  const [permissions, setPermissions] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  const setPermission = (permissionData) => {
    const index = permissions.indexOf(permissionData);

    if (index == -1) {
      permissions.push(permissionData);
    } else {
      permissions.splice(index, 1);
    }

    setPermissions([...permissions]);
  };

  async function saveRole() {
    if (roleEdit == "") {
      toast.error("Type name value");
    }
    if (roleEdit != "") {

      let saveData = {
        oldRoleName: role,
        newRoleName: roleEdit,
        permissions: permissions,
      };

      const res = await updaterole(saveData);
      if (res == "success") {
        toast.success("success");
        allRolesUpdate(roleEdit, 0, "add");
        setIsOpen(false);
      } else {
        toast.error(res);
      }
    }
  }

  const handleChange = (event) => {
    setRoleEdit(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
    setOption("edit");
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
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Edit role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Role Name"
            type="String"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <div style={{ height: "20px" }} />
          <Permission
            option={option}
            isOpen={isOpen}
            rolename={role}
            setPermission = {setPermission}
            getPermission={setPermissions}
            // getPermissions={getPermissions}
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ background: "#2e3539" }} onClick={closeModal} variant="contained">
            Back
          </Button>
          <Button sx={{ background: "#2e3539" }} onClick={saveRole} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
