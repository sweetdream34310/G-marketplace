import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import Avatar from "@mui/material/Avatar";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import GppGoodIcon from "@mui/icons-material/GppGood";
import "../../../style/pricemodal.css";
import { Button } from "@mui/material";
import { deleteNotification } from "../../../api/notification";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { PRICE_UPDATE_REQ_STATUS } from "../../../actions/actionType";
import { putItemWithSKU } from "../../../api/sp_api/PutItemWithSku";
import { putItemBusinessWithSKU } from "../../../api/sp_api/putItemBusinessWithSKU";
import { toast } from "react-hot-toast";

export default function MyModal({ item, update, socket }) {
  const tokenDecode = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState(false);

  const updatePriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemWithSKU(sendData);

    return res;
  };

  const updateBusinessPriceWithSKU = async (
    currentPrice,
    marketplace,
    sku,
    suggestedPrice
  ) => {
    const sendData = {
      email: tokenDecode.email,
      username: tokenDecode.username,
      oldPrice: currentPrice,
      marketplace: marketplace,
      sku: sku,
      newPrice: suggestedPrice,
    };
    const res = await putItemBusinessWithSKU(sendData);

    return res;
  };

  const handleAccept = async () => {
    
    let resPriceData = '';

    if (item.action == "price") {
      resPriceData = await updatePriceWithSKU(
        item.currentPrice,
        item.content,
        item.sku,
        item.suggestedPrice
      );

      
    } else if (item.action == "business") {
      resPriceData = await updateBusinessPriceWithSKU(
        item.currentPrice,
        item.content,
        item.sku,
        item.suggestedPrice
      );
    }

    if (resPriceData == "ACCEPTED") {
      const data = {
        email: item.email,
        fromEmail: tokenDecode.email,
        action: "accept",
        content: item.content,
        currentPrice: item.currentPrice,
        suggestedPrice: item.suggestedPrice,
        sku: item.sku,
      };
      const res = await deleteNotification(data);
      if (res.message == "success") {
        // await update();
        socket.emit("notification", {
          email: tokenDecode.email,
          room: "room",
        });
        setModalOpen(false);
        window.location.reload();
      }
    }
  };

  const handleReject = async () => {
    const data = {
      email: item.email,
      fromEmail: tokenDecode.email,
      action: "reject",
      content: item.content,
      currentPrice: item.currentPrice,
      suggestedPrice: item.suggestedPrice,
      sku: item.sku,
    };
    const res = await deleteNotification(data);
    if (res.message == "success") {
      // await update();
      socket.emit("notification", { email: tokenDecode.email, room: "room" });
      setModalOpen(false);
      window.location.reload();
    }
  };

  const handleOK = async () => {
    const data = {
      email: item.email,
      fromEmail: tokenDecode.email,
      action: "ok",
      content: item.content,
      currentPrice: item.currentPrice,
      suggestedPrice: item.suggestedPrice,
      sku: item.sku,
    };
    const res = await deleteNotification(data);
    if (res.message == "success") {
      await update();
      if (item.action == "accept") {
        const sendData = {
          marketplace: item.content,
          sku: item.sku,
          newPrice: item.suggestedPrice,
        };

        const res = await putItemWithSKU(sendData);
        if (res == "ACCEPTED") {
          toast.success("Accept success");
        } else {
          toast.error(res);
        }
        dispatch({
          type: PRICE_UPDATE_REQ_STATUS.PRICE_UPDATE_REQ_STATUS,
          payload: true,
        });
      }

      setModalOpen(false);
    }
  };

  return (
    <>
      <MenuItem onClick={() => setModalOpen(true)}>
        <Avatar>
          {item.action == "price" ? (
            <CurrencyPoundIcon />
          ) : item.action == "reject" ? (
            <CancelScheduleSendIcon />
          ) : item.action == "accept" ? (
            <GppGoodIcon />
          ) : item.action == "business" ? (
            <CorporateFareIcon />
          ) : (
            <CommentBankIcon />
          )}
        </Avatar>{" "}
        {item.action == "price"
          ? "@" + item.username + " want to change the retail price."
          : item.action == "business"
          ? "@" + item.username + " want to change the business price."
          : item.action == "reject"
          ? "@" + item.username + " rejected your price update request"
          : item.action == "accept"
          ? "@" + item.username + " accepted your price update request"
          : item.username + "add a tag for you."}
      </MenuItem>
      <Divider />
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>
          {item.action == "price"
            ? `Price update request from @ ${item.username}`
            : item.action == "business"
            ? "@" + item.username + " want to change the business price."
            : item.action == "accept"
            ? `Price update request accepted by @${item.username}`
            : `Price update request rejected by @${item.username}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Marketplace : <a style={{ color: "red" }}>{item.content}</a>
          </DialogContentText>
          <div style={{ height: "20px" }}></div>
          <DialogContentText>
            SKU : <a style={{ color: "red" }}>{item.sku}</a>
          </DialogContentText>
          <div style={{ height: "20px" }}></div>
          <DialogContentText>
            Current price : <a style={{ color: "red" }}>{item.currentPrice}</a>
          </DialogContentText>
          <div style={{ height: "20px" }}></div>
          <DialogContentText>
            Suggested price :{" "}
            <a style={{ color: "red" }}>{item.suggestedPrice}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {item.action == "price" || item.action == "business" ? (
            <>
              <Button
                aria-label="delete"
                sx={{ background: "#2e3539" }}
                variant="contained"
                onClick={handleReject}
              >
                Reject
              </Button>
              <Button
                aria-label="delete"
                sx={{ background: "#2e3539" }}
                variant="contained"
                onClick={handleAccept}
              >
                Accept
              </Button>
            </>
          ) : (
            <Button
              aria-label="delete"
              sx={{ background: "#2e3539" }}
              variant="contained"
              onClick={handleOK}
            >
              OK
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
