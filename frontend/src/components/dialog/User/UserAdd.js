import { Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import AutoComplete from "../../settings/AutoComplete";
import { toast } from "react-hot-toast";
import { createUser } from "../../../api/user";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { randomCharacterGenerator } from "../../../function/randomCharacterGenerator";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../../api/email";
import { useEffect } from "react";
import "../../../style/pricemodal.css";

export default function MyModal({ allUsersUpdate }) {
  // const { email, role, username } = item;

  const Navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userAccount, setUserAccount] = useState({});

  function closeModal() {
    setIsOpen(false);
  }

  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const getAccount = () => {
    try {
      const tokenDecode = jwt_decode(localStorage.getItem("token"));
      setUserAccount(tokenDecode);
    } catch (error) {
      Navigate("/login");
    }
  };

  async function saveUser() {
    if (newEmail == "") {
      toast.error("Fill the email");
    } else if (newRole == "") {
      toast.error("Set the role");
    } else if (!newEmail.match(validRegex)) {
      toast.error("Invalid email");
    } else {
      const sendData = {
        email: newEmail,
        username: "New_User",
        role: newRole,
        password: newPassword,
      };
      try {
        const emailRes = await sendEmail(
          userAccount.username,
          userAccount.email,
          newEmail,
          newPassword
        );
        if (emailRes == 200) {
          const res = await createUser(sendData);
          if (res == "success") {
            setIsOpen(false);
            allUsersUpdate(sendData, 0, "add");
          } else {
            toast.error(res);
          }
        }
      } catch (error) {
        toast.error("Error occured.");
      }
    }
  }

  const handleChange = (newValue) => {
    setNewRole(newValue);
  };

  const handleEmailInputChange = (event) => {
    setNewEmail(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
    const randomPassword = randomCharacterGenerator(10);
    setNewPassword(randomPassword);
  }

  useEffect(() => {
    getAccount();
  }, []);

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
          Invite
        </Button>
      </div>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        PaperProps={{ sx: { width: "50%", minWidth: "400px" } }}
      >
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Temp password : <a style={{ color: "red" }}>{newPassword}</a>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleEmailInputChange}
          />
          <AutoComplete onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button sx={{ background: "#2e3539" }} onClick={closeModal} variant="contained">
            Back
          </Button>
          <Button sx={{ background: "#2e3539" }} onClick={saveUser} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
