import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getAllRolenames } from '../../api/role';
// const options = [`'admin'`, `'accounting v1'`, `'accounting v2'`, `'manager'`, `'user'`];

export default function ControllableStates({ role, onChange }) {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  const [options, setOptions] = React.useState([]);

  const fetchData = async () => {
    const data = await getAllRolenames();
    setOptions(data);
  }

  React.useEffect(() => {
    fetchData();
  }, [])
  return (
    <div>
      <Autocomplete
        onChange={(event, newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
        inputValue= {inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Role" variant="standard"/>}
      />
    </div>
  );
}