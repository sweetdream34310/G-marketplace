import '../../style/tasklist.css'
import * as React from "react";
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
import Avatar from '@mui/material/Avatar';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GppGoodIcon from '@mui/icons-material/GppGood';
import "../../style/pricemodal.css";

import { Button } from '@mui/material';
import { deleteNotification } from "../../api/notification"
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { PRICE_UPDATE_REQ_STATUS } from '../../actions/actionType'
import { putItemWithSKU } from '../../api/sp_api/PutItemWithSku'
import { toast } from 'react-hot-toast';

export default function CustomizedAccordions({ content, update, socket }) {

  const tokenDecode = jwt_decode(localStorage.getItem("token"))
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = React.useState(false)

  const handleAccept = async () => {
    const data = {
      email: content.email,
      fromEmail: tokenDecode.email,
      action: 'accept',
      content: content.content,
      currentPrice: content.currentPrice,
      suggestedPrice: content.suggestedPrice,
      sku: content.sku,
    }
    const res = await deleteNotification(data)
    if (res.message == 'success') {
      socket.emit('notification', {email: tokenDecode.email, room: 'room'})
      setModalOpen(false)
      window.location.reload();
    }
  }

  const handleReject = async () => {
    const data = {
      email: content.email,
      fromEmail: tokenDecode.email,
      action: 'reject',
      content: content.content,
      currentPrice: content.currentPrice,
      suggestedPrice: content.suggestedPrice,
      sku: content.sku,
    }
    const res = await deleteNotification(data)
    if (res.message == 'success') {
      socket.emit('notification', {email: tokenDecode.email, room: 'room'})
      setModalOpen(false)
      window.location.reload();
    }
  }

  const handleOK = async () => {
    const data = {
      email: content.email,
      fromEmail: tokenDecode.email,
      action: 'ok',
      content: content.content,
      currentPrice: content.currentPrice,
      suggestedPrice: content.suggestedPrice,
      sku: content.sku,
    }
    const res = await deleteNotification(data)
    if (res.message == 'success') {
      await update();
      if (content.action == 'accept') {
        const sendData = {
          marketplace: content.content,
          sku: content.sku,
          newPrice: content.suggestedPrice,
        }

        const res = await putItemWithSKU(sendData);
        if (res == 'ACCEPTED') {
          toast.success('Accept success');
        } else {
          toast.error(res);
        }
        dispatch({ type: PRICE_UPDATE_REQ_STATUS.PRICE_UPDATE_REQ_STATUS, payload: true });
      }

      setModalOpen(false)
    }
  }

  return (
    <div>
      <div className='price-auth-item' onClick={() => setModalOpen(true)}>
        <a style={{ marginLeft: '30px' }}>Price update request from @{content.username}</a>
      </div>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>{content.action == 'price' ? `Price update request from @ ${content.username}` : content.action == 'accept' ? `Price update request accepted by @${content.username}` : `Price update request rejected by @${content.username}`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Marketplace : <a style={{ color: 'red' }}>{content.content}</a>
          </DialogContentText>
          <div style={{ height: '20px' }}></div>
          <DialogContentText>
            SKU : <a style={{ color: 'red' }}>{content.sku}</a>
          </DialogContentText>
          <div style={{ height: '20px' }}></div>
          <DialogContentText>
            Current price : <a style={{ color: 'red' }}>{content.currentPrice}</a>
          </DialogContentText>
          <div style={{ height: '20px' }}></div>
          <DialogContentText>
            Suggested price : <a style={{ color: 'red' }}>{content.suggestedPrice}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {
            content.action == 'price' ?
              <>
                <Button aria-label="delete" sx={{ background: "#2e3539" }} variant="contained" onClick={handleReject}>Reject</Button>
                <Button aria-label="delete" sx={{ background: "#2e3539" }} variant="contained" onClick={handleAccept}>Accept</Button>
              </>
              :
              <Button aria-label="delete" sx={{ background: "#2e3539" }} variant="contained" onClick={handleOK}>OK</Button>
          }

        </DialogActions>
      </Dialog>
    </div>
  );
}