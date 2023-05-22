import { React, Fragment, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { createTag } from "../../../api/tag";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import "../../../style/pricemodal.css";
import { IconButton, Tooltip } from "@mui/material";
import { Label, NoteAdd } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import { getAllUsers } from "../../../api/user";

export default function MyModal({ marketplace, sku, updateNewTag, index }) {
  let [isOpen, setIsOpen] = useState(false);

  const [newTag, setNewTag] = useState("");

  const [selectValue, setSelectValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }

  async function saveTag() {
    if (newTag == "") {
      toast.error("Write the tag content");
    } else if (selectValue == null) {
      toast.error("Set the user");
    } else {
      const res = await createTag(marketplace, sku, newTag, selectValue);

      if (res == "success") {
        updateNewTag(newTag, selectValue, index);
        toast.success("success");
        setIsOpen(false);
      } else {
        toast.error(res);
      }
    }
  }

  const handleTagInputChange = (event) => {
    setNewTag(event.target.value);
  };

  function handleNewClick() {
    setIsOpen(true);
  }

  const getUsers = async () => {
    const userList = await getAllUsers();
    const data = [];
    userList.map((userItem) => {
      data.push(userItem.username);
    });
    setOptions(data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Tooltip arrow placement="right" title="New tag">
        <IconButton color="info" onClick={handleNewClick}>
          <NoteAdd />
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Create a tag</DialogTitle>
        <DialogContent>
          <div>{marketplace}</div>
          <div style={{ height: "10px" }} />
          <div>sku : {sku}</div>
          <div style={{ height: "10px" }} />
          <Autocomplete
            value={selectValue}
            onChange={(event, newValue) => {
              setSelectValue(newValue);
              // onChange(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="controllable-states-demo"
            options={options}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="User" variant="standard" />
            )}
          />
          <div style={{ height: "10px" }} />
          <TextField
            autoFocus
            margin="dense"
            id="tag"
            label={selectValue == null ? "New Tag" : `@${selectValue}`}
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTagInputChange}
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
            onClick={saveTag}
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
