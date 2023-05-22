import * as React from 'react';
import '../../../style/settings.css'
import { Grid } from '@mui/material';
import CompanyPermission from './subpermissions/Company';
import VendorPermission from './subpermissions/Vendor';
import SalesPermission from './subpermissions/Sales';
import CustomerPermission from './subpermissions/Customer';
import { getRole } from '../../../api/role';

export default function Permission({ option, rolename, isOpen, setPermission, getPermission }) {

  const [role, setRole] = React.useState({})
  const [open, setOpen] = React.useState(false);
  const [permissions, setPermissions] = React.useState([]);
  // const [companyPermission, setComapanyPermission] = React.useState([]);
  // const [salesPermission, setSalesPermission] = React.useState([]);
  // const [vendorPermission, setVendorPermission] = React.useState([]);
  // const [customerPermission, setCustomerPermission] = React.useState([]);

  const fetchData = async () => {
    const data = await getRole(rolename);
    setPermissions(data.permissions)
    // console.log(data)
    // getPermissions(data.permissions);
    // data.permissions.map((permission) => {
      // if(permission == "Company") {
      //   setComapanyPermission(permission.data);
      // }
      // if(permission.name == "Sales") {
      //   setSalesPermission(permission.data);
      // }
      // if(permission.name == "Vendors") {
      //   setVendorPermission(permission.data);
      // }
      // if(permission.name == "Customers") {
      //   setCustomerPermission(permission.data);
      // }
    // })
    setOpen(isOpen);
  }

  React.useEffect(() => {
    if (option == 'edit' && isOpen) {
      fetchData();
    }
    if(option == 'view all') {
      setOpen(isOpen)
    }
  }, [isOpen])

  return (
    <div className='permission-body'>
      {/* <Grid container spacing={4}> */}
        {/* <Grid item xs={12} xl={4}>
          <div className='permission-subbody'>
            <CompanyPermission option={option} permissions = {companyPermission} isOpen={open} setPermission = {setPermission}/>
          </div>
        </Grid> */}
        {/* <Grid item xs={12} xl={4}> */}
          <div className='permission-subbody'>
            <SalesPermission option={option} permissions = {permissions} isOpen={open} setPermission = {setPermission} getPermission = {getPermission}/>
            {/* <VendorPermission option={option} permissions = {vendorPermission} isOpen={open} setPermission = {setPermission}/> */}
          </div>
        {/* </Grid> */}
        {/* <Grid item xs={12} xl={4}>
          <div className='permission-subbody'>
            <CustomerPermission option={option} permissions = {customerPermission} isOpen={open} setPermission = {setPermission}/>
          </div>
        </Grid> */}
      {/* </Grid> */}
    </div>
  );
}