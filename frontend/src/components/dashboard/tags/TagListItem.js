import '../../../style/tasklist.css'
// import { useSelector } from "react-redux";
// import TagDelete from '../../dialog/Tag/TagDelete'
// import TagEdit from '../../dialog/Tag/TagEdit';
// import { useState } from 'react';

// function TagListItem({ status, content, updateDeleteTag }) {

//   const [contentDisplay, setContentDisplay] = useState(content)
//   const routerSelectedTitle = useSelector((state) => state.selectedRouter.selectedRouterTitle);

//   let label = ''
//   status == "success" ? label = 'Tag finished' : status == 'pending' ? label = 'Pending now' : label = 'New tag';

//   const updateEditTag = (data) => {
//     setContentDisplay(data)
//   }

//   return <div className={status == 'success' ? "tasklist-item task-complete-color" : status == "pending" ? "tasklist-item task-pending-color" : "tasklist-item task-notcompleted-color"} >
//     <div style={{ display: 'flex' }}>
//       <div className='tasklist-item-id'>
//         <div className={status == 'success' ? "lable-center-x success-icon" : status == "pending" ? "lable-center-x pending-icon" : "lable-center-x new-icon"} ></div>
//       </div>

//       <div >
//         <div style={{ marginTop: '5px' }} className='task-title'>{label}</div>
//         <div style={{ height: '5px' }} />
//         <div style={{display:'flex'}}>
//           <div> Marketplace &nbsp;: &nbsp;{contentDisplay.marketplace}</div>
//           <div style={{ height: '5px' }} />
//           <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SKU &nbsp;: &nbsp;{contentDisplay.sku}</div>
//         </div>

//         <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; tag &nbsp;:&nbsp; {contentDisplay.tagContent}</div>

//       </div>
//     </div>
//     {routerSelectedTitle != 'Dashboard' ?
//       <div className='list-item-action'>
//         {/* <TagEdit updateEditTag = {updateEditTag} content= {contentDisplay}/> */}
//         {/* <TagDelete updateDeleteTag ={updateDeleteTag} content= {contentDisplay}/> */}
//       </div> : <div />}
//   </div>;
// }
// export default TagListItem;

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions({ content }) {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{`@${content.username}`}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marketplace : {content.marketplace}
          </Typography>
          <div style={{ height: '10px' }}></div>
          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SKU : {content.sku}
          </Typography>
          <div style={{ height: '20px' }}></div>

          <Typography>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content : {content.tagContent}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}