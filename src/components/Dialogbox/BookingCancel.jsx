import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination, Grid } from "@mui/material";
import s from "./Dialogbox.module.css";
import { useState } from "react";
import { notificationHandler } from "../../utils/Notification";
import { confirm_booking_api } from "../api/role";
const BookingCancel = ({ open, close, booking_id, onsubmit }) => {
  const [reason, setreason] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const cancelbookingfun = async () => {
    if (reason === "") {
      notificationHandler({ type: "danger", msg: "Please Enter Reason For Cancellation" });
    }

    setisLoading(true);
    const temp = {
      status: "true",
      reason: reason,
    };
    try {
      let res = await confirm_booking_api(temp, booking_id);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        setreason("");
        close();
        onsubmit();
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        setisLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to Cancel Booking ?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Reason For Cancellation</label>
                <textarea
                  rows={3}
                  type="text"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setreason(e.target.value)}
                  placeholder="Reason For Cancellation"
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => cancelbookingfun()}>
              Submit
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default BookingCancel;
