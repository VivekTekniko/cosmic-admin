import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import s from "./Dialogbox.module.css";
const DeletePopup = ({ open, close, name, onsubmit }) => {
  const deleteBrandFunc = () => {
    onsubmit("data");
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>Do you want to delete {name} ?</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteBrandFunc()}>
              Delete
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePopup;
