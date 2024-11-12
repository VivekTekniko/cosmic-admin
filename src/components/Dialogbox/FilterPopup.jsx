import React from "react";
import { Dialog, DialogActions, DialogTitle, DialogContent, Pagination } from "@mui/material";
import s from "./Dialogbox.module.css";
const FilterPopup = ({ open, close, name, onsubmit }) => {
  const deleteBrandFunc = () => {
    onsubmit("data");
  };
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth="true" onClose={() => close()}>
        <DialogTitle className={s.dialog_title}>
          <div>
            <h3>Filter</h3>
          </div>
          <div className="filter-container">
            <div className="filter-content">
              <h5>Categories</h5>
              <div class="">
                <div class="form-check filter_categories_color">
                  <input class="form-check-input" type="checkbox" id="Vastu" value="" />
                  <label class="form-check-label" for="Vastu">
                    Vastu
                  </label>
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div className={s.employee_gl_popup} onClick={() => close()}>
              Cancel
            </div>
            <div className={s.employee_gl_popup_del} onClick={() => deleteBrandFunc()}>
              Apply
            </div>
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default FilterPopup;
