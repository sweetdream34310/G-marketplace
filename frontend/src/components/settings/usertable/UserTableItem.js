import * as React from 'react';
import UserEdit from '../../dialog/User/UserEdit'
import UserDelete from '../../dialog/User/UserDelete'
import '../../../style/settings.css'

export default function UserTableItem({ item, idheader, index, allUsersUpdate }) {

  const roleItem = item.role;
  return (
    <div className='table-item-board'>
      <div className='table-item-avatar' />
      <div className='table-item-body'>
        <div className='table-item-label'><a className='label-item'>{item.username}</a></div>
        <div className='table-item-label'><a className='label-item'>{item.email}</a></div>
        {roleItem == 'admin' ? <div className='table-item-label '><a className='label-item table-item-label-role-admin'>{roleItem}</a></div> :
          roleItem == 'user' ? <div className='table-item-label'><a className='label-item table-item-label-role-user'>{roleItem}</a></div> :
            roleItem == 'Role' ? <div className='table-item-label'><a className='label-item'>{roleItem}</a></div> :
              <div className='table-item-label '><a className='label-item table-item-label-role-other'>{roleItem}</a></div>
        }
        {idheader == 'header' ?
          <div className='table-item-buttons'></div> :
          <div className='table-item-buttons'>
            <div style={{ width: '40px', height: '40px', marginTop: '5px' }}>
              <UserEdit item={item} index = {index} allUsersUpdate={allUsersUpdate}/>
            </div>
            <div style={{ width: '40px', height: '40px', marginTop: '5px' }}>
              <UserDelete item={item} index = {index} allUsersUpdate={allUsersUpdate}/>
            </div>
          </div>
        }
      </div>
    </div>
  );
}