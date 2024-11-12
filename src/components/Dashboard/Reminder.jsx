import { Card, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import s from "./dashboard.module.css";
import {
  fetchAllDashboard_api,
  fetchVendorDashboard_api,
} from "../api/dashboard";
import Cookies from "js-cookie";
import { FaWhatsapp } from "react-icons/fa6";

const Reminder = () => {
  const [dashboard, setDashboard] = useState({});
  const [expModal, setExpModal] = useState(false);
  const role = Cookies.get("role");

  useEffect(() => {
    fetchAllDashboardFunc();
  }, []);

  useEffect(() => {
    if (role == "Vendor" && dashboard?.remainingLeadValue<=11) {
      // console.log(dashboard?.remainingLeadValue<=11,"dashboard.remainingLeadValue==21")

      setTimeout(() => {
        setExpModal(true);
      }, [1000]);
      setInterval(() => {
        setExpModal(true);
      }, [10000]);
      // notificationHandler({ type: "danger", msg: "Your Package Expired Soon!" });
    }
  }, [dashboard?.remainingLeadValue]);

  const fetchAllDashboardFunc = async () => {
    let callFunc =
      role === "Admin" || role == "Super Admin"
        ? fetchAllDashboard_api()
        : fetchVendorDashboard_api();
    let res = await callFunc;
    try {
      if (res.data.status) {
        setDashboard(res.data.data);
      } else {
        console.log("Status False!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const phoneNumber = "8368107705"; // WhatsApp number
  const message =
    "Hello, I would like to know renew my package please renew my package soon !";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  return (
    <div>
      <Dialog
        open={expModal}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth="true"
        onClose={() => setExpModal(false)}
      >
        <DialogTitle className={s.dialog_title}>
          <div>Your Package Expired soon , Please renew it Now!</div>
        </DialogTitle>
        <DialogContent className={s.cardpopup_content}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div
              className={s.employee_gl_popup}
              onClick={() => setExpModal(false)}
            >
              Cancel
            </div>
            <a className={s.employee_gl_popup_del} href={whatsappUrl}>
              Renew Now <FaWhatsapp fontSize="28px" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reminder;
