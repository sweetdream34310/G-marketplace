import * as React from 'react';
import RoleEdit from '../../dialog/Role/RoleEdit'
import RoleDelete from '../../dialog/Role/RoleDelete'
import '../../../style/settings.css'

export default function RoleTableItem({ rolename, idheader, index, allRolesUpdate }) {

  return (
    <div className='table-item-board'>
      <div className='table-item-body'>
        <div className='table-item-label'>{rolename}</div>
        {idheader == 'header' ?
          <div className='table-item-buttons'></div> :
          <div className='table-item-buttons'>
            {/* <div className='table-item-edit-icon' /> */}
            <div style={{ width: '40px', height: '40px', marginTop: '5px' }}>
              <RoleEdit role={rolename} allRolesUpdate = {allRolesUpdate}/>
            </div>
            <div style={{ width: '40px', height: '40px', marginTop: '5px' }}>
              <RoleDelete role={rolename} index = {index} allRolesUpdate = {allRolesUpdate}/>
            </div>

          </div>
        }
      </div>
    </div>
  );
}