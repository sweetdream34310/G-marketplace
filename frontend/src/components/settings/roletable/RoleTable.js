import * as React from 'react';
import '../../../style/settings.css'
import RoleTableItem from './RoleTableItem';
import RoleAdd from '../../dialog/Role/RoleAdd'
import { getAllRolenames } from '../../../api/role';

export default function RoleTable() {

  const tableHead = 'Role name'

  const [datas, setDatas] = React.useState([]);

  const fetchData = async () => {
    const data = await getAllRolenames();
    setDatas(data);
  }

  const allRolesUpdate = (data, index, option) => {
    window.location.reload()
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='table-board role-board'>
      <div className='table-head role-head'>
        <a className='table-head-label'>Role Management</a>
        <RoleAdd allRolesUpdate = {allRolesUpdate}/>
      </div>
      <div className='table-main'>
        <RoleTableItem idheader='header' rolename={tableHead} />
        <div className='table-main-body'>
          {datas.map((row, idx) => (
            <RoleTableItem rolename={row} key={idx} index= {idx} allRolesUpdate = {allRolesUpdate}/>
          ))}
        </div>
      </div>
    </div>
  );
}