import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import s from "./Dialogbox.module.css";
const ConsultResolved = ({ open, close, onsubmit }) => {
  const deleteBrandFunc = () => {
    close();
    onsubmit("data");
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>Mark As Resolved ?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} style={{ backgroundColor: "green" }} onClick={() => deleteBrandFunc()}>
              Save
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default ConsultResolved;
