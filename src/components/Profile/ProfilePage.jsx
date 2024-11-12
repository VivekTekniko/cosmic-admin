import { Avatar, Card, CircularProgress, Grid } from "@mui/material";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FiLock } from "react-icons/fi";
import { UserContext } from "../../App";
import Custombutton from "../../Common/Custombutton";
import Loder from "../../Loder/Loder";
import { notificationHandler } from "../../utils/Notification";
import get_admin_profile_api, { profile_update_admin_api } from "../api/profile";
import s from "./Profile.module.css";
import Cookies from "js-cookie";
const ProfilePage = () => {
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");
  const [isLoading, setisLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const [profile_img, setprofile_img] = useState("");
  const [imgloading, setimgloading] = useState(false);
  const [isupdate, setisupdate] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [profiledata, setprofiledata] = useState({
    first_name: "",
    last_name: "",
    // password: "",
    number: "",
    email: "",
  });
  const [updateCount, setUpdateCount] = useState(0);



  // const changePicFunc = async (e) => {
  //   setimgloading(true);
  //   const fd = new FormData();
  //   fd.append("profile_image", e.target.files[0]);
  //   try {
  //     let res = await profile_update_admin_api(fd);
  //     if (res.data.status) {
  //       setprofile_img("");
  //       getProfile();
  //       setimgloading(false);
  //       notificationHandler({ type: "success", msg: res.data.message });
  //     } else {
  //       setimgloading(false);
  //       notificationHandler({ type: "success", msg: res.data.message });
  //     }
  //   } catch (error) {
  //     notificationHandler({ type: "danger", msg: error.message });
  //     console.log(error);
  //     setimgloading(false);
  //   }
  // };

  // useEffect(() => {
  //   getProfile();
  // }, []);
  // useEffect(() => {
  //   getProfile();
  // }, [isupdate]);

  // const getProfile = async () => {
  //   setisLoading(true);
  //   const res = await get_admin_profile_api();
  //   try {
  //     if (res.data.status) {
  //       setprofiledata({
  //         first_name: res?.data?.data?.name,
  //         // password: res?.data?.data?.password,
  //         number: res?.data?.data?.phone,
  //         email: res?.data?.data?.email,
  //       });
  //       setprofile_img(res?.data?.data?.profile_image);
  //       dispatch({
  //         type: "USER",
  //         payload: {
  //           ...state,
  //           profile: res?.data?.data,
  //         },
  //       });
  //       setisupdate(false);
  //       setisLoading(false);
  //     } else {
  //       notificationHandler({ type: "danger", msg: res.data.message });
  //       setisLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     notificationHandler({ type: "danger", msg: res.error });
  //     setisLoading(false);
  //   }
  // };

  // const profileupdate = (e) => {
  //   setprofiledata({
  //     ...profiledata,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const profileSubmitFunc = async () => {
  //   const fd = new FormData();
  //   fd.append("name", profiledata.first_name);
  //   fd.append("phone", profiledata.number);
  //   fd.append("profile_image", profile_img);
  //   // fd.append("password", profiledata.password);
  //   fd.append("email", profiledata.email);

  //   try {
  //     let res = await profile_update_admin_api(fd);
  //     if (res.data.status) {
  //       console.log(res);
  //       getProfile();
  //       notificationHandler({ type: "success", msg: res.data.message });
  //     } else {
  //       notificationHandler({ type: "success", msg: res.data.message });
  //     }
  //   } catch (error) {
  //     notificationHandler({ type: "danger", msg: error.message });
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <section className={s["profile-page"]}>
        <Card>
          <div className={s["profile-container"]}>
            <div className="profile-content">
              <div className="user-profile-image">
                <div className={s["profile_details"]}>
                  {/* <div className={s["avatar"]}>
                    {!imgloading ? (
                      <Avatar alt="Profile Pic" src={profile_img} style={{ height: "8rem", width: "8rem" }} refreshCount={updateCount} />
                    ) : (
                      <CircularProgress />
                    )}
                    <label>
                      <AiOutlineCamera className={s["camera_icon"]} />
                      <input type="file" onChange={(e) => changePicFunc(e)} name="myfile" accept="image/*" style={{ display: "none" }} />
                    </label>
                  </div> */}
                </div>
              </div>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={userName}
                      name="first_name"
                      // onChange={(e) => profileupdate(e)}
                      placeholder="Name"
                    />
                  </div>
                </Grid>

                {/* <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={profiledata.number}
                      name="number"
                      onChange={(e) => profileupdate(e)}
                      placeholder="number"
                    />
                  </div>
                </Grid> */}
                {/* <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Password</label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="form-control"
                        type={showPass ? "text" : "password"}
                        value={profiledata.password}
                        onChange={(e) => profileupdate(e)}
                        name="password"
                      />
                      {showPass ? (
                        <BsEyeSlash className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(false)} />
                      ) : (
                        <BsEye className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(true)} />
                      )}
                    </div>
                  </div>
                  <div></div>
                </Grid> */}
                <Grid item xs={6}>
                  <div className="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      value={userEmail}
                      name="eamil"
                      // onChange={(e) => profileupdate(e)}
                      placeholder="Email"
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            {/* <div className={s["form-login-btn"]} onClick={profileSubmitFunc}>
              <Custombutton>Submit</Custombutton>
            </div> */}
          </div>
        </Card>
      </section>
      <Loder loading={isLoading} />
    </>
  );
};

export default ProfilePage;
