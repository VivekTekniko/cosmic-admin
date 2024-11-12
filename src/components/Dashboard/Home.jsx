import { Card, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import s from "./dashboard.module.css";
import Graph from "./Graph";
import Graph1 from "./Graph1";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchAllDashboard_api,
  fetchVendorDashboard_api,
} from "../api/dashboard";
import Cookies from "js-cookie";
import { notificationHandler } from "../../utils/Notification";
import { FaWhatsapp } from "react-icons/fa6";
const Home = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({});
  const [expModal, setExpModal] = useState(false);
  const role = Cookies.get("role");

  useEffect(() => {
    fetchAllDashboardFunc();
  }, []);

  useEffect(() => {
    if (role == "Vendor" && dashboard?.remainingLeadValue<=11) {
      console.log(dashboard?.remainingLeadValue<=11,"dashboard.remainingLeadValue==21")

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
    <>
      <div style={{ paddingInline: "1rem" }}>
        <div className="dashboard-section">
          {role === "Vendor" ? (
            <div
              className={s["dashboard-header-container"]}
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              {/* <Card className={s["dashbord-content"]}>
                  <div class={s["dashboard-main-card"]}>
                    <div class={s["dashboard-card-content"]}>
                      <div class={s["card-title"]}>
                        <h4>Total Customer Assign</h4>
                        <h5>{dashboard?.totalAssignedCustomers}</h5>
                      </div>
                    </div>
                  </div>
                </Card> */}
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Assingned Customer</h4>
                      <h5>{dashboard?.todayAssignedCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Lead </h4>
                      <h5>{dashboard?.totalLeadValue}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Assigned Lead </h4>
                      <h5>{dashboard?.totalAssignedCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Rejected lead </h4>
                      <h5>{dashboard?.leadUnderProcess}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Remaining Lead</h4>
                      <h5>{dashboard?.remainingLeadValue}</h5>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : role === "Admin" ? (
            <div className={s["dashboard-header-container"]}>
              {/* {dashboardData.map((data) => ( */}
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Vendors</h4>
                      <h5>{dashboard?.totalVendors}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Customers</h4>
                      <h5>{dashboard?.totalCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Customers</h4>
                      <h5>{dashboard?.todayCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Rejected Leads</h4>
                      <h5>{dashboard?.totalRejectedLeads}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                className={s["dashbord-content"]}
                onClick={() => navigate("/rejected-List")}
              >
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Rejected Leads</h4>
                      <h5>{dashboard?.todayRejectedLeads}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              {/* ))} */}
            </div>
          ) : (
            <div className={s["dashboard-header-container"]}>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Vendors</h4>
                      <h5>{dashboard?.totalVendors}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Customers</h4>
                      <h5>{dashboard?.totalCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Customers</h4>
                      <h5>{dashboard?.todayCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className={s["dashbord-content"]}>
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Total Rejected Leads</h4>
                      <h5>{dashboard?.totalRejectedLeads}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                className={s["dashbord-content"]}
                onClick={() => navigate("/rejected-List")}
              >
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Rejected Leads</h4>
                      <h5>{dashboard?.todayRejectedLeads}</h5>
                    </div>
                  </div>
                </div>
              </Card>
              <Card
                className={s["dashbord-content"]}
                // onClick={() => navigate("/rejected-List")}
              >
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Assigned Leads</h4>
                      <h5>{dashboard?.todayAssignedCustomers}</h5>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                className={s["dashbord-content"]}
                // onClick={() => navigate("/rejected-List")}
              >
                <div class={s["dashboard-main-card"]}>
                  <div class={s["dashboard-card-content"]}>
                    <div class={s["card-title"]}>
                      <h4>Today Registered Vendor</h4>
                      <h5>{dashboard?.todayVendor}</h5>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
        {/* <div className={s["graph-container"]}>
          <div className={s["graph-content"]}>
            <div className="graph-left" style={{ width: "70%" }}>
              <Graph1 />
            </div>
            <div className="graph-right" style={{ width: "30%" }}>
              <Graph />
            </div>
          </div>
        </div> */}
      </div>
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
    </>
  );
};

export default Home;
