import { React, Fragment, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { updateTag, deleteTag } from '../../../api/tag';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";
import { IconButton, Tooltip } from '@mui/material';
import { NoteAlt } from '@mui/icons-material';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllUsers } from '../../../api/user';

export default function MyModal({ marketplace, sku, updateEditTag, index, content }) {
  let [isOpen, setIsOpen] = useState(false);

  const userName = content.substring(1, content.indexOf(' :'));
  const tag = content.substring(content.indexOf(' : ') + 3);
  // console.log(tag)
  const [newTag, setNewTag] = useState(tag);

  const [selectValue, setSelectValue] = useState(userName);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  function closeModal() {
    setIsOpen(false)
  }

  async function saveTag() {
    if (selectValue == null) {
      toast.error('Please set the user.')
    } else if (newTag == "") {
      const res = await deleteTag(marketplace, sku, tag);
      if (res == 'success') {

        updateEditTag(newTag, selectValue, index)

        toast.success('success');
        setIsOpen(false);
      } else {
        toast.error(res);
      }
    } else if (newTag == tag && selectValue == userName) {
      toast.error('No change');
    } else {
      const res = await updateTag(marketplace, sku, tag, newTag, selectValue);

      if (res == 'success') {

        updateEditTag(newTag, selectValue, index)

        toast.success('success');
        setIsOpen(false);
      } else {
        toast.error(res);
      }
    }
  }

  const handleTagInputChange = (event) => {
    setNewTag(event.target.value);
  }

  function handleClick() {
    setIsOpen(true)
  }

  const getUsers = async () => {
    const userList = await getAllUsers();
    const data = [];
    userList.map((userItem) => {
      data.push(userItem.username)
    })
    setOptions(data);
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <>
      <Tooltip arrow placement="left" title="Edit tag" onClick={handleClick}>
        <IconButton color="success">
          <NoteAlt />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={closeModal} PaperProps={{ sx: { width: "50%", minWidth: '400px' } }}>
        <DialogTitle>Edit tag</DialogTitle>
        <DialogContent>
          <div>{marketplace}</div>
          <div style={{ height: '10px' }} />
          <div>sku : {sku}</div>
          <div style={{ height: '10px' }} />
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
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="User" variant="standard" />}
          />
          <div style={{ height: '10px' }} />
          <TextField
            autoFocus
            margin="dense"
            id="tag"
            label={selectValue == null ? "New Tag" : `@${selectValue}`}
            type="text"
            fullWidth
            defaultValue={tag}
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
  )
}
