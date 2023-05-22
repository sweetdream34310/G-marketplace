import * as React from 'react';
import '../../../style/settings.css'
import UserTableItem from './UserTableItem';
import { getAllUsers } from '../../../api/user';
import UserAdd from '../../dialog/User/UserAdd'
export default function UserTable() {

  const tableHead = {
    username: 'Username',
    email: 'Email',
    role: 'Role',
    extraPermission: 'Extra Permission'
  }

  const [allUsers, setAllUsers] = React.useState([]);

  const allUsersUpdate = (data, index, option) => {
    let updateddData = [...allUsers];
    if (option == "edit") {
      updateddData[index] = data
    }
    if (option == 'delete') {
      updateddData.splice(index, 1);
    }
    if(option == 'add') {
      window.location.reload()
    }
    setAllUsers(updateddData);
  }

  const fetchData = async () => {
    const data = await getAllUsers();
    setAllUsers(data)
  }

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className='table-board'>
      <div className='table-head'>
        <a className='table-head-label'>User Management</a>
        <UserAdd allUsersUpdate = {allUsersUpdate}/>
      </div>
      <div className='table-main'>
        <UserTableItem idheader='header' item={tableHead} />
        <div className='table-main-body'>
          {allUsers.map((row, idx) => (
            <UserTableItem item={row} index={idx} key={idx} allUsersUpdate={allUsersUpdate} />
          ))}
        </div>
      </div>
    </div>
  );
}