import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { toast } from "react-hot-toast";
import { putItemWithSKU } from "../../../api/sp_api/PutItemWithSku";
import { putItemBusinessWithSKU } from "../../../api/sp_api/putItemBusinessWithSKU";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Edit, PriceChange } from "@mui/icons-material";
import "../../../style/pricemodal.css";
import { Button, Tooltip } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { putNotification } from "../../../api/notification";
import { outstandingActivitySendEmail } from "../../../api/email";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";

export default function MyModal({
  index,
  priceUpdate,
  row,
  marketplace,
  socket,
  tableData,
}) {
  const userProfile = jwt_decode(localStorage.getItem("token"));

  const setMarketPlace = useSelector(
    (state) => state.marketplace.setMarketPlace
  );

  let [isOpen, setIsOpen] = useState(false);

  const [groupByAsinFulfilment, setGroupByAsinFulfilment] = useState([
    { sku: "J001" },
  ]);

  const [newPrice, setNewPrice] = useState("");
  const [newBusinessPrice, setNewBusinessPrice] = useState("");
  const [loading, setLoading] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const updatePriceWithSKU = async (item) => {
    const sendData = {
      email: userProfile.email,
      username: userProfile.username,
      oldPrice: item.price,
      marketplace: marketplace,
      sku: item.sku,
      newPrice: newPrice,
    };
    const res = await putItemWithSKU(sendData);
    if (res == "ACCEPTED") {
      setLoading(false);
      toast.success(`${item.sku} update price accepted`);
      priceUpdate(item.index, newPrice, "price");
    } else {
      toast.error(res);
    }
  };

  const updateBusinessPriceWithSKU = async (item) => {
    const sendData = {
      email: userProfile.email,
      username: userProfile.username,
      oldPrice: item.businessPrice,
      marketplace: marketplace,
      sku: item.sku,
      newPrice: newBusinessPrice,
    };
    const res = await putItemBusinessWithSKU(sendData);
    if (res == "ACCEPTED") {
      setLoading(false);
      toast.success(`${item.sku} update price accepted`);
      priceUpdate(item.index, newBusinessPrice, "business");
    } else {
      toast.error(res);
    }
  };

  const priceValidation = (newValue, oldValue) => {
    const thresholdUp = oldValue * 1.15;
    const thresholdDown = oldValue * 0.85;

    if (newValue < thresholdUp && newValue > thresholdDown) return true;
    else return false;
  };

  async function savePrice() {
    if (row.businessPrice == undefined) {
      console.log("-----------business price undefined");
      if (newPrice == "") {
        toast.error("Fill the price field.");
      } else if (newPrice == row.price) {
        toast.error("No changes in price.");
      } else {
        setLoading(true);

        let groupForAuthorisation = [];

        // console.log(groupByAsinFulfilment)
        groupByAsinFulfilment.map(async (item, idx) => {
          const isValid = priceValidation(newPrice, item.price);

          if (isValid) {
            await updatePriceWithSKU(item);
          } else {
            const data = {
              fromEmail: userProfile.email,
              action: "price",
              content: setMarketPlace,
              sku: item.sku,
              currentPrice: item.price,
              suggestedPrice: newPrice,
              fulfilType: item.fulfilType,
            };

            groupForAuthorisation.push(data);
          }
        });

        if (groupForAuthorisation.length != 0) {
          const res = await putNotification(groupForAuthorisation);
          setLoading(false);

          if (res.message == "success") {
            socket.emit("notification", {
              email: userProfile.email,
              room: "room",
            });

            groupForAuthorisation.map((item) => {
              toast.success(`Request success... ${item.sku} will be checked.`);
            });

            await outstandingActivitySendEmail(groupForAuthorisation);
          }
        }
      }
    } else {
      if (newPrice == row.price) {
        toast.error("No changes in price.");
      } else if (newBusinessPrice == row.businessPrice) {
        toast.error("No changes in business price.");
      } else if (newPrice == "" && newBusinessPrice == "") {
        toast.error("Fill at least one field");
        
      } else if (newPrice != "" && newBusinessPrice != "") {
        setLoading(true);

        console.log("-----------all have value");

        // in case of fill two fileds.
        let groupForAuthorisation = [];

        groupByAsinFulfilment.map(async (item, idx) => {
          const isValid = priceValidation(newPrice, item.price);
          const isBusinessValid = priceValidation(
            newBusinessPrice,
            item.businessPrice
          );
          if (isValid) {
            await updatePriceWithSKU(item);
          } else {
            const data = {
              fromEmail: userProfile.email,
              action: "price",
              content: setMarketPlace,
              sku: item.sku,
              currentPrice: item.price,
              suggestedPrice: newPrice,
              fulfilType: item.fulfilType,
            };

            groupForAuthorisation.push(data);
          }

          if (isBusinessValid) {
            await updateBusinessPriceWithSKU(item);
          } else {
            const data = {
              fromEmail: userProfile.email,
              action: "business",
              content: setMarketPlace,
              sku: item.sku,
              currentPrice: item.price,
              suggestedPrice: newBusinessPrice,
              fulfilType: item.fulfilType,
            };

            groupForAuthorisation.push(data);
          }

          if (groupForAuthorisation.length != 0) {
            const res = await putNotification(groupForAuthorisation);

            if (res.message == "success") {
              setLoading(false);
              socket.emit("notification", {
                email: userProfile.email,
                room: "room",
              });

              groupForAuthorisation.map((item) => {
                toast.success(
                  `Request success... ${item.sku} will be checked.`
                );
              });

              await outstandingActivitySendEmail(groupForAuthorisation);
            }
          }
        });
      } else if (newPrice != "") {
        setLoading(true);

        let groupForAuthorisation = [];

        groupByAsinFulfilment.map(async (item, idx) => {
          const isValid = priceValidation(newPrice, item.price);
          if (isValid) {
            await updatePriceWithSKU(item);
          } else {
            const data = {
              fromEmail: userProfile.email,
              action: "price",
              content: setMarketPlace,
              sku: item.sku,
              currentPrice: item.price,
              suggestedPrice: newPrice,
              fulfilType: item.fulfilType,
            };

            groupForAuthorisation.push(data);
          }
        });

        if (groupForAuthorisation.length != 0) {
          const res = await putNotification(groupForAuthorisation);

          if (res.message == "success") {
            setLoading(false);
            socket.emit("notification", {
              email: userProfile.email,
              room: "room",
            });

            groupForAuthorisation.map((item) => {
              toast.success(`Request success... ${item.sku} will be checked.`);
            });

            await outstandingActivitySendEmail(groupForAuthorisation);
          }
        }
      } else if (newBusinessPrice != "") {
        setLoading(true);

        console.log("-----------normal not valid");

        let groupForAuthorisation = [];

        groupByAsinFulfilment.map(async (item, idx) => {
          const isBusinessValid = priceValidation(
            newBusinessPrice,
            item.businessPrice
          );

          if (isBusinessValid) {
            await updateBusinessPriceWithSKU(item);
          } else {
            const data = {
              fromEmail: userProfile.email,
              action: "business",
              content: setMarketPlace,
              sku: item.sku,
              currentPrice: item.businessPrice,
              suggestedPrice: newBusinessPrice,
              fulfilType: item.fulfilType,
            };

            groupForAuthorisation.push(data);
          }
        });

        if (groupForAuthorisation.length != 0) {
          const res = await putNotification(groupForAuthorisation);

          if (res.message == "success") {
            setLoading(false);
            socket.emit("notification", {
              email: userProfile.email,
              room: "room",
            });

            groupForAuthorisation.map((item) => {
              toast.success(`Request success... ${item.sku} will be checked.`);
            });

            await outstandingActivitySendEmail(groupForAuthorisation);
          }
        }
      }
    }
  }

  const handlePriceInputChange = (event) => {
    setNewPrice(event.target.value);
  };

  const handleBusinessPriceInputChange = (event) => {
    setNewBusinessPrice(event.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  const getGroupData = (sku, fulfilType) => {
    let temp = [];
    const firstFourLetter = sku.substring(0, 4);
    tableData.map((item, idx) => {
      if (
        item.sku.substring(0, 4) == firstFourLetter &&
        item.fulfilType == fulfilType
      ) {
        temp.push({
          sku: item.sku,
          price: item.price,
          fulfilType: item.fulfilType,
          index: idx,
          businessPrice: item.businessPrice,
        });
      }
    });

    // console.log(temp)
    setGroupByAsinFulfilment(temp);
  };

  useEffect(() => {
    getGroupData(row.sku, row.fulfilType);
  }, []);

  return (
    <>
      <Tooltip arrow placement="left" title="Edit price">
        <IconButton color="primary" onClick={openModal}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={closeModal}>
        <DialogTitle>Edit product price</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <a style={{ color: "red" }}>SKU : </a> {row.sku}
          </DialogContentText>
          <div style={{ height: "30px" }}></div>
          <DialogContentText>
            <a style={{ color: "red" }}>Amazon price : </a> {row.price}
          </DialogContentText>
          {row.businessPrice === undefined ? (
            <div></div>
          ) : (
            <DialogContentText>
              <a style={{ color: "red" }}>Business price : </a>{" "}
              {row.businessPrice}
            </DialogContentText>
          )}

          <div style={{ height: "30px" }}></div>
          <DialogContentText>
            <a style={{ color: "red" }}>
              {" "}
              Group of {groupByAsinFulfilment[0].sku.substring(0, 4)} :{" "}
            </a>{" "}
            {groupByAsinFulfilment.length}
          </DialogContentText>
          <div style={{ height: "30px" }}>
            <a style={{ color: "red" }}>Same Group Products</a>
          </div>
          {groupByAsinFulfilment.map((item, idx) => (
            <DialogContentText key={idx}>{item.sku}</DialogContentText>
          ))}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Amazon price"
            type="number"
            fullWidth
            variant="standard"
            onChange={handlePriceInputChange}
          />
          {(row.businessPrice === undefined || setMarketPlace == 'Amazon.co.uk (UK)') ? (
            <div></div>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New Business price"
              type="number"
              fullWidth
              variant="standard"
              onChange={handleBusinessPriceInputChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            aria-label="delete"
            sx={{ background: "#2e3539" }}
            variant="contained"
            onClick={closeModal}
          >
            Back
          </Button>
          <LoadingButton
            loading={loading}
            loadingPosition="end"
            endIcon={<SendIcon />}
            variant="contained"
            sx={{ background: "#2e3539" }}
            onClick={savePrice}
          >
            Update
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
