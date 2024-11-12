import React, { useState, useEffect } from "react";
import s from "./services.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { notificationHandler } from "../../utils/Notification";
import { useLocation } from "react-router-dom";
import { Card, Grid, Table, TableBody, TableCell, TableHead } from "@mui/material";
import { addService_api, updateService_api } from "../api/service";
const AddSkill = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [serviceName, setserviceName] = useState("");


  const pagetype = location?.state?.pagetype;
  const id = location?.state?.data?._id;

  useEffect(() => {
    if (pagetype == "Edit") {

      setserviceName(location?.state?.data?.name)

    }

  }, [location]);

  const createService = async () => {
    if (pagetype == "Add") {
      try {
        let temp = {
          name: serviceName
        }
        let res = await addService_api(temp);
        console.log(res, 'resposjjh')
        if (res.data.status) {
          console.log(res);
          navigate("/service-list");
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
    if (pagetype == "Edit") {
      let temp = {
        name: serviceName
      }
      try {
        let res = await updateService_api(id, temp);
        if (res.data.status) {
          navigate("/service-list");
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
  };


  return (
    <>
      <div className="">

        <Card className={s["admin_container"]}>
          <div className={s["title"]} onClick={() => navigate(-1)}>
            <BiArrowBack />
            Back
          </div>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Services Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={serviceName}
                  onChange={(e) => setserviceName(e.target.value)}
                  placeholder="Services Name"
                />
              </div>
            </Grid>

          </Grid>
          <div className={s["form-login-btn"]} onClick={() => createService()}>
            <Custombutton>{pagetype == "Add" ? "Submit" : "Update"} </Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddSkill;
