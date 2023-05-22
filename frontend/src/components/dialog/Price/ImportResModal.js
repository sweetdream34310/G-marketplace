import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import "../../../style/pricemodal.css";

export default function MyModal({ isOpen, modalData, closeModal }) {

  function handleClickOk() {
    closeModal()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} PaperProps={{ sx: { width: "50%", minWidth: '400px' } }}>
        <DialogTitle>Import data status</DialogTitle>
        <DialogContent>
          {modalData.map((item, idx) => (
            <div key={idx}> {item.Marketplace}/{item.sku} : <a style={{color:'red'}}>{item.message}</a> ({item.action})</div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={handleClickOk}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
