import * as React from 'react';
import '../../../style/settings.css'
import PemrmissionBody from './Permission'

export default function Permission() {

  return (
    <div className='permission-board'>
      <div className='permission-head'>
        <a className='table-head-label'>All Permissions</a>
      </div>
      <PemrmissionBody />
    </div>
  );
}