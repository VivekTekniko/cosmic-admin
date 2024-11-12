import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import s from "./admin.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Custombutton from "../../Common/Custombutton";
import { create_banner_api, update_banner_api } from "../api/admin";
import { notificationHandler } from "../../utils/Notification";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { useLocation } from "react-router-dom";
import { Card, Grid } from "@mui/material";
const AddAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location?.state?.data?._id;
  const [isLoading, setisLoading] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("")
  const pagetype = location.state.pagetype;
  useEffect(() => {
    setname(location?.state?.data?.userName);
    setemail(location?.state?.data?.email);
    setpassword(location?.state?.data?.password);
    setconfirmPassword(location?.state?.data?.confirmPassword);
  }, [location]);

  const create_admin = async () => {
    if (pagetype == "Add") {
      const fd = new FormData();
      fd.append("userName", name);
      fd.append("password", password);
      fd.append("email", email);
      fd.append("confirmPassword", confirmPassword);
      // fd.append("profileImage", file);

      try {
        let res = await create_banner_api(fd);
        if (res.data.status) {
          navigate("/admin-list");
          notificationHandler({ type: "success", msg: "Admin created successfully" });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
        }
      } catch (error) {
        notificationHandler({ type: "danger", msg: error.message });
        console.log(error);
      }
    }
    if (pagetype == "Edit") {
      const fd = new FormData();
      fd.append("userName", name);
      fd.append("password", password);
      fd.append("email", email);
      fd.append("confirmPassword", confirmPassword);
      // if (file) {
      //   fd.append("profileImage", file);
      // }
      try {
        let res = await update_banner_api(id, fd);
        if (res.data.status) {
          navigate("/admin-list");
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
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" value={name} onChange={(e) => setname(e.target.value)} placeholder="name" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input type="email" className="form-control" name="email" value={email} onChange={(e) => setemail(e.target.value)} placeholder="name" />
              </div>
            </Grid>

            {/* <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Profile Image</label>
                <div className="mr-2">
                  <input type="file" className="form-control" name="img" placeholder="" accept="image/*" onChange={(e) => setfile(e.target.files[0])} />
                </div>
              </div>
            </Grid> */}
             <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1">Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="password"
                />
              </div>
            </Grid>
            {pagetype=="Add" && <Grid item xs={6}>
              <div className="form-group">
                <label for="exampleInputEmail1"> Confirm Password</label>
                <input
                  type="text"
                  className="form-control"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  placeholder="confirm Password"
                />
              </div>
            </Grid>}



          </Grid>
          <div className={s["form-login-btn"]} onClick={() => create_admin()}>
            <Custombutton>Submit</Custombutton>
          </div>
        </Card>
      </div>
    </>
  );
};

export default AddAdmin;
