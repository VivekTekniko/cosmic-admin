import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination, Grid } from "@mui/material";
import s from "./Dialogbox.module.css";
import { useState } from "react";
import { notificationHandler } from "../../utils/Notification";
import { confirm_booking_api } from "../api/role";
import { verifydoc_api } from "../api/testimonial";
import { send_vendor_msg_api } from "../api/admin";
const Vendormessage = ({ open, close, data }) => {
  const [reason, setreason] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const rejectfun = async () => {
    if (reason === "") return alert("Please enter a reason");
    setisLoading(true);
    const temp = {
      msg: reason,
      vendor_id: data._id,
    };

    try {
      let res = await send_vendor_msg_api(temp);
      console.log(res);
      if (res.data.status) {
        setisLoading(false);
        close();
        setreason("");
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
          <div>Do you want to Message {data.name} ?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Message</label>
                <textarea
                  rows={3}
                  type="text"
                  className="form-control"
                  spellCheck={false}
                  value={reason}
                  onChange={(e) => setreason(e.target.value)}
                  placeholder="Enter Message"
                />
              </div>
            </Grid>
          </Grid>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => rejectfun()}>
              Submit
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default Vendormessage;
