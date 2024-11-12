import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination, Grid } from "@mui/material";
import s from "./Dialogbox.module.css";
import { useState } from "react";
import { notificationHandler } from "../../utils/Notification";
import { confirm_booking_api } from "../api/role";
import { verifydoc_api } from "../api/testimonial";
const RejectDoc = ({ open, close, _id, data, onsubmit }) => {
  const [reason, setreason] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const rejectfun = async () => {
    if (reason === "") return alert("Please enter a reason");
    try {
      const temp = {
        doc_id: data._id,
        status: "false",
        reason: reason,
      };
      let res = await verifydoc_api(_id, temp);
      if (res.data.status) {
        console.log(res);
        close();
        setreason("");
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        console.log("status false!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to Reject {data.name} ?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <div className="form-group">
                <label for="exampleInputEmail1">Reason For Reject</label>
                <textarea
                  rows={3}
                  type="text"
                  className="form-control"
                  value={reason}
                  onChange={(e) => setreason(e.target.value)}
                  placeholder="Reason For Reject"
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

export default RejectDoc;
