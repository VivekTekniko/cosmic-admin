import React, { useState } from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import s from "./Dialogbox.module.css";
import Custombutton from "../../Common/Custombutton";
// import OtpInput from "react-otp-input";
const EmailVerification = ({ open, close }) => {
  const [otp, setotp] = useState("");
  const handleChange = (otp) => {
    setotp(otp);
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div className={s["title-verify"]}>
            <h3>Email Verification</h3>
            <p>We have send you One Time Password to your registered email</p>
          </div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          {/* <OtpInput
            inputStyle={{
              border: "1px solid #000 ",
              borderRadius: "8px",
              width: "100%",
              margin: "15px 10px",
              height: "54px",
              fontSize: "15px",
              color: "rgb(206 32 47)",
              fontWeight: "400",
              caretColor: "white",
            }}
            focusStyle={{
              border: "1px solid #000",
              outline: "none",
            }}
            value={otp}
            onChange={handleChange}
            numInputs={4}
            separator={<span>-</span>}
          /> */}
          <input className="form-control mb-3" maxLength={6} placeholder="Enter Otp" />
          <div className={s["veryfy-btn"]}>Veryfy Account</div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};
export default EmailVerification;
