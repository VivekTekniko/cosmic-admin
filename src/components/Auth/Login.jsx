import React, { useState, useContext, useEffect } from "react";
import s from "./auth.module.css";
import logo from "../../assets/icons/logo.png";
import { FaRegUser } from "react-icons/fa";
import MuiAppBar from "@mui/material/AppBar";
import { FiLock } from "react-icons/fi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Custombutton from "../../Common/Custombutton";
import { useNavigate } from "react-router-dom";
import authapi, { get_otp_api } from "../api/auth";
import Cookies from "js-cookie";
import { UserContext } from "../../App";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { notificationHandler } from "../../utils/Notification";
import Timer from "./Timer";
import { styled } from "@mui/material/styles";
import { FaWhatsapp } from "react-icons/fa6";
import { Card, Dialog, DialogContent, DialogTitle } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Login = () => {
  const navigate = useNavigate();
  const [expModal, setExpModal] = useState(false);
  const [showPass, setshowPass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [loginshow, setloginshow] = useState(true);
  const [rememberMe, setrememberMe] = useState(false);
  const [otp, setotp] = useState("");

  const auth = sessionStorage.getItem("auth") || Cookies.get("auth");
  // const role = Cookies.get("role")
  useEffect(() => {
    if (auth) {
      navigate("/dashboard");
    }
  }, [auth]);

  const adminlogin = async () => {
    if (!emailValidator(email)) {
      alert("Email is not valid");
      return;
    }
    if (!blankValidator(password)) {
      alert("Please Enter password");
      return;
    }
    // if (!blankValidator(otp)) {
    //   alert("Please Enter otp");
    //   return;
    // }
    setisloading(true);
    let temp = {
      email: email,
      password: password,
      // otp,
    };
    try {
      const res = await authapi(temp);
      if (res.data.status) {
        console.log(res);
        const token = res.data.token;
        let role = res.data.data.user.role;
        let userName = res.data.data.user.userName
        let userEmail = res.data.data.user.email
        Cookies.set("token", token, { secure: false }, { sameSite: "strict" }, { expires: 365 });
        Cookies.set("auth", true, { secure: false }, { sameSite: "strict" }, { expires: 365 });
        Cookies.set("role", String(role), { expires: 365 })
        Cookies.set("userName", String(userName), { expires: 365 })
        Cookies.set("userEmail", String(userEmail), { expires: 365 })
        navigate("/dashboard", {
          state: {
            data: role
          }
        });
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        console.log(res.data.message=="Yor Package has been expired.")
        if(res.data.message=="Yor Package has been expired."){
       setExpModal(true)
        }
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
      setisloading(false);
    }
  };
  const getotpverify = async () => {
    if (!emailValidator(email)) {
      alert("Email is not valid");
      return;
    }
    setisloading(true);
    let temp = {
      email,
    };
    try {
      const res = await get_otp_api(temp);
      if (res.data.status) {
        setloginshow(false);
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
      setisloading(false);
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
    <AppBar position="fixed" className="mob-nav" >
        <section className={s["header-top-section"]} style={{backgroundColor:"#e82e79"}}>
          <div className={s["header-container"]}>
            <div className={s["header-content"]}>
              <div className="header-content-left" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
               
                <div style={{width:"140px",margin:'10px'}}>
                <img src={logo} style={{ width: "100%" }} alt="logo" draggable="false" />
                </div>
              </div>
              <div style={{ color: "#2c3e50" }} className={s["header-content-right"]}>
               
              </div>
            </div>
          </div>
        </section>
      </AppBar>
      <section className="login-section">
        <div className="login-container">
          <div className={s["login-content"]}>
            <div className={s["login-content-left"]}>
              <div className={s["logo-img"]}>
                <img src={logo} style={{ width: "100%" }} alt="logo" draggable="false" />
              </div>
            </div>
            <div className={s["login-content-right"]}>
              <div className={s["login-title"]}>
                <h2>Welcome Back! </h2>
              </div>
              {loginshow && (
                <div className={s["form-container"]}>
                  <div className={s["login-form"]}>
                    <label>Email address</label>
                    <div className={`${s.inputBox}`}>
                      <FaRegUser size={14} style={{ color: "#000" }} />
                      <input type="email" placeholder="Email*" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div className="login-form">
                      <label>Password</label>
                      <div className={`${s.inputBox}`}>
                        <FiLock size={18} style={{ color: "#000" }} />
                        <input
                          type={showPass ? "text" : "password"}
                          value={password}
                          maxLength={25}
                          placeholder="Password*"
                          onChange={(e) => setpassword(e.target.value)}
                        />
                        {showPass ? (
                          <BsEyeSlash className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(false)} />
                        ) : (
                          <BsEye className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(true)} />
                        )}
                      </div>
                    </div>
                    {/* <div className={s["login-form"]}>
                      <label>
                        <input type="checkbox" checked={rememberMe ? true : false} onChange={() => setrememberMe(!rememberMe)} />
                        Remember Me
                      </label>
                    </div> */}
                  </div>
                  {/* <div className={s["forgot-password"]}>
                    Forgot password? <span onClick={() => navigate("/reset-password")}>Reset</span>
                  </div> */}
                  <div className={s["form-login-btn"]} onClick={() => adminlogin()}>
                    <Custombutton>Login</Custombutton>
                  </div>
                </div>
              )}
              {!loginshow && (
                <div className={s["form-container"]}>
                  <div className={s["login-form"]}>
                    <label>Email address</label>
                    <div className={`${s.inputBox}`}>
                      <FaRegUser size={14} style={{ color: "#000" }} />
                      <input type="text" disabled placeholder="Email*" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                  </div>
                  <div className="login-form">
                    <label>Password</label>
                    <div className={`${s.inputBox}`}>
                      <FiLock size={18} style={{ color: "#000" }} />
                      <input
                        type={showPass ? "text" : "password"}
                        value={password}
                        maxLength={25}
                        placeholder="Password*"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                      {showPass ? (
                        <BsEyeSlash className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(false)} />
                      ) : (
                        <BsEye className={s.showHideEye} style={{ color: "#000" }} onClick={() => setshowPass(true)} />
                      )}
                    </div>
                  </div>
                  <div className="login-form">
                    <label>OTP</label>
                    <div className={`${s.inputBox}`}>
                      <input
                        type="text"
                        value={otp}
                        placeholder="otp*"
                        onChange={(e) => {
                          if (e.target.value.length > 8) {
                            return;
                          }
                          setotp(e.target.value);
                        }}
                      />
                    </div>
                    <p>
                      <Timer time={60} email={email} />
                    </p>
                  </div>
                  <div className={s["forgot-password"]}>
                    Forgot password? <span onClick={() => setloginshow(true)}>Reset</span>
                  </div>
                  <div className={s["form-login-btn"]} onClick={() => adminlogin()}>
                    <Custombutton>Verify</Custombutton>
                  </div>
                </div>
              )}
            </div>
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
        </div>
      </section>
    </>
  );
};

export default Login;
