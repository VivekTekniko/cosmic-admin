import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import s from "./admin.module.css"
import { Grid } from '@mui/material';
import { notificationHandler } from '../../utils/Notification';
import { addRemark } from '../api/customerTable';

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

export default function ReasonModal({ open, setOpen, customerId }) {
    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [reason, setreason] = React.useState()

    console.log(reason, " this is the reason in the api")

    const handleAddRemark = async (e, row) => {

        let data = {
            status: "Reject",
            reason: reason
        }
        try {
            let res = await addRemark(data, customerId)
            if (res.data.status) {
                // fetchallCustomersFunc()
                setOpen(false)
                notificationHandler({
                    type: "success",
                    msg: "Add Remark Successfully",
                });
            } else {
                notificationHandler({ type: "success", msg: res.data.message });
            }
        } catch (error) {
            notificationHandler({ type: "danger", msg: error.message });
            console.log(error);
        }
    }

    const handleReason = (e) => {
        setreason(e.target.value)
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                       Please give your reason for rejection<span style={{ color: "red" }}>*</span>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Grid xs={12}>
                            <div className='form-group'>
                                <textarea className='form-control' placeholder='Write your reason' name='reason' onChange={handleReason} />
                            </div>
                        </Grid>
                    </Typography>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}>
                            <span className={s["title"]} onClick={() => handleAddRemark()}>
                                Submit
                            </span>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
