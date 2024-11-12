import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from "./admin.module.css"
import { Grid } from '@mui/material';
import { shuffleLead } from '../api/customerTable';
import { notificationHandler } from '../../utils/Notification';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '4px solid  #b22029',
    boxShadow: 24,
    p: 4,
};

const ShufflingModal = ({shuffleModal , setShuffleModal}) => {

    const [days , setDays] = React.useState()
    const [lead , setLead] = React.useState()

    const handleClose=()=>{
        setShuffleModal(false)
    }
 
    const handleSubmit=async()=>{
        let payload={
            duration:days,
            numberOfAssign:lead
        }
   let res = await shuffleLead(payload)
   if(res?.data?.success){
    setShuffleModal(false)
    notificationHandler({ type: "success", msg: "Shuffling data update successfully" });
   }
    }

   const fetchData = async()=>{
    let res = await shuffleLead()
    console.log(res , "resss")
    if(res?.data?.success){
setDays(res?.data?.data?.home?.duration)
setLead(res?.data?.data?.home?.numberOfAssign)
    }
   }

   React.useEffect(()=>{
      fetchData()
   },[])

  return (
    <Modal
    open={shuffleModal}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
>
    <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
           Customize your lead shuffling data
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Grid xs={5}>
                <div className='form-group'>
                    <label>Number of days period to lead shuffle</label>
                    <input type='number' value={days} onChange={(e)=>setDays(e.target.value)} className='form-control' placeholder='Number of days period to lead shuffle' name='reason' />
                </div>
            </Grid>
            <Grid xs={5} style={{marginTop:"10px"}}>
                <div className='form-group'>
                <label>Number of lead to shuffle</label>
                    <input type='number' value={lead} onChange={(e)=>setLead(e.target.value)} className='form-control' placeholder='Number of lead to shuffle' name='reason' />
                </div>
            </Grid>
        </Typography>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
                <span className={s["title"]} onClick={() => handleSubmit()}>
                    Submit
                </span>
            </div>
        </Typography>
    </Box>
</Modal>
  )
}

export default ShufflingModal