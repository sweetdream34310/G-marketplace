import { Fragment, useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Permission from "../../settings/permissions/Permission";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-hot-toast";
import "../../../style/pricemodal.css";
import { Button } from "@mui/material";
import { createRole } from "../../../api/role";

export default function MyModal({ allRolesUpdate }) {
  let [isOpen, setIsOpen] = useState(false);
  const [roleAdd, setRoleAdd] = useState("");
  const [option, setOption] = useState("view all");

  let [toggleDatas, setToggleDatas] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  async function saveRole() {
    if (roleAdd == "") {
      toast.error("Type name value");
    }
    if (roleAdd != "") {
      if (toggleDatas.length == 0) {
        toast.error("No permissions, set at least one.");
      } else {
        let saveData = {
          rolename: roleAdd,
          permissions: toggleDatas,
        };

        const res = await createRole(saveData);

        if (res.data == "success") {
          toast.success("success");
          allRolesUpdate(roleAdd, 0, "add");
          setIsOpen(false);
        } else {
          toast.error(res.data);
        }
      }
    }
  }

  const handleChange = (event) => {
    setRoleAdd(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  const setPermission = (permissionData) => {
    const index = toggleDatas.indexOf(permissionData);

    if (index == -1) {
      toggleDatas.push(permissionData);
    } else {
      toggleDatas.splice(index, 1);
    }

    setToggleDatas([...toggleDatas]);
  };

  return (
    <>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ marginRight: "10px" }}
      >
        <Button
          aria-label="delete"
          size="medium"
          variant="contained"
          sx={{ background: "#2e3539" }}
          onClick={openModal}
        >
          ADD
        </Button>
      </div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Add new role</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Role"
            type="String"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <Permission
            option={option}
            isOpen={isOpen}
            rolename="role"
            setPermission={setPermission}
          />
        </DialogContent>
        <DialogActions>
          <div onClick={closeModal}>
            <IconButton aria-label="delete">
              <ArrowBackIosIcon />
            </IconButton>
          </div>
          <div onClick={saveRole}>
            <IconButton aria-label="delete">
              <AddIcon />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    </>
  );
}
