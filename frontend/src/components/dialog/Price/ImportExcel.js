import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import {
  MARKETPLACE_TYPES,
  NOTIFICATION_TYPES,
} from "../../../actions/actionType";
import ImportTable from "./ImportTable";
import LoadingButton from '@mui/lab/LoadingButton';
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { putPriceWithSkuArray } from "../../../api/sp_api/PutPriceWithSkuArray";
import ImportResModal from "./ImportResModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  priceUpdateWithArray,
  isOpen,
  handleModalOpen,
}) {
  const userProfile = jwt_decode(localStorage.getItem("token"));
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch();
  const [modalData, setModalData] = React.useState([]);
  // const [open, setOpen] = React.useState(false);
  const [differentData, setDiffernetData] = React.useState([]);

  const getSpData = useSelector((state) => state.marketplace.spData);
  const getimportData = useSelector((state) => state.marketplace.importData);
  const getimportDataName = useSelector(
    (state) => state.marketplace.importDataName
  );
  const setMarketPlace = useSelector(
    (state) => state.marketplace.setMarketPlace
  );

  const handleClose = () => {
    dispatch({ type: MARKETPLACE_TYPES.GET_IMPORT_DATA, payload: [] });
    dispatch({ type: MARKETPLACE_TYPES.GET_IMPORT_DATA_NAME, payload: "" });
    handleModalOpen(false);
  };

  const setMarketplaceNameFromAbbr = (abbreviation) => {
    let marketplaceName = "";
    if (abbreviation == "UK") {
      marketplaceName = "Amazon.co.uk (UK)";
    } else if (abbreviation == "DE") marketplaceName = "Amazon.de (Germany)";
    else if (abbreviation == "FR") marketplaceName = "Amazon.fr (France)";
    else if (abbreviation == "IT") marketplaceName = "Amazon.it (Italy)";
    else if (abbreviation == "ES") marketplaceName = "Amazon.es (Spain)";
    else if (abbreviation == "NL") marketplaceName = "Amazon.nl (Netherlands)";
    else if (abbreviation == "SE") marketplaceName = "Amazon.se (Sweden)";
    else if (abbreviation == "PL") marketplaceName = "Amazon.pl (Poland)";
    else if (abbreviation == "BE") marketplaceName = "Amazon.be (Belgium)";
    else if (abbreviation == "TR") marketplaceName = "Amazon.tr (Turkey)";
    else marketplaceName = abbreviation;

    return marketplaceName;
  };

  const updateData = async () => {
    setLoading(true);
    if (getimportData.length == 0) {
      toast.error("There is no updated data");
    } else {
      let data = [...getimportData];
      data.map((item) => {
        const tempName = setMarketplaceNameFromAbbr(item.Marketplace);
        item.Marketplace = tempName;
      });

      const sendData = {
        email: userProfile.email,
        role: userProfile.role,
        username: userProfile.username,
        data: data,
      };

      const res = await putPriceWithSkuArray(sendData);

      setModalData(res.data);
      setOpen(true);
      setLoading(false)
      dispatch({
        type: NOTIFICATION_TYPES.NOTIFICATION_TYPES,
        payload: res.notificationStatus,
      });
    }
  };

  const closeModal = () => {
    priceUpdateWithArray(differentData);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        // onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <Tooltip title="Close">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {getimportDataName}
            </Typography>
            <LoadingButton
              color="success"
              onClick={updateData}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Update</span>
            </LoadingButton>
          </Toolbar>
        </AppBar>
        <div style={{ height: "30px" }}></div>
        <ImportTable />
      </Dialog>
      <ImportResModal
        isOpen={open}
        modalData={modalData}
        closeModal={closeModal}
      />
    </div>
  );
}
