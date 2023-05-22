import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector, useDispatch } from "react-redux";
import { FILTER_TYPES } from '../../../actions/actionType';
export default function ComboBox(props) {
  let datas = props.dataList;
  let item = props.item;

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    item == 'SKU' ? dispatch({ type: FILTER_TYPES.SKU_SELECT, payload: value }) :
      item == 'ASIN' ? dispatch({ type: FILTER_TYPES.ASIN_SELECT, payload: value }) :
        item == 'Fullfilment type' ? dispatch({ type: FILTER_TYPES.FULFIL_SELECT, payload: value }) :
          console.log('ss');
  }
  return (
    <Autocomplete
      disablePortal
      multiple={true}
      id="combo-box-demo"
      options={datas}
      sx={{ width: 1000 }}
      renderInput={(params) => <TextField {...params} label={item} />}
      onChange={handleChange}
    />
  );
}
