import React, { useState, useContext, useEffect } from "react";
import s from "./auth.module.css";
import logo from "../../assets/icons/logo.png";
import { FaRegUser } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Custombutton from "../../Common/Custombutton";
import { useNavigate } from "react-router-dom";
import authapi from "../api/auth";
import Cookies from "js-cookie";
import { UserContext } from "../../App";
import { blankValidator, emailValidator } from "../../utils/Validation";
import { notificationHandler } from "../../utils/Notification";
import EmailVerification from "../Dialogbox/EmailVerification";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [showPass, setshowPass] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const [emailverify, setemailverify] = useState(false);

  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("auth");
  }, []);

  const adminlogin = async () => {
    if (!emailValidator(email)) {
      alert("Email is not valid");
      return;
    }
    if (!blankValidator(password)) {
      alert("Please Enter password");
      return;
    }
    setisloading(true);
    let temp = {
      email,
      password,
    };
    try {
      const res = await authapi(temp);
      if (res.data.status) {
        console.log(res);
        const token = res.data.token;
        Cookies.set(
          "token",
          token,
          { secure: false },
          //  { sameSite: "strict" },
          { expires: 365 }
        );
        Cookies.set(
          "auth",
          true,
          { secure: false },
          // { sameSite: "strict" },
          { expires: 365 }
        );
        dispatch({
          type: "USER",
          payload: {
            ...state,
            profile: res.data.results,
          },
        });
        navigate("/dashboard");
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
  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <div className={s["login-content"]}>
            <div className={s["login-content-left"]}>
              <div className={s["logo-img"]}>
                <img src={logo} style={{ width: "100%" }} alt="logo" draggable="false" />
                {/* <h1 style={{ color: "#fff" }}>LifeGuru</h1> */}
              </div>
            </div>
            <div className={s["login-content-right"]}>
              <div className={s["forgot-title"]}>
                <h2>Forgot Password</h2>
                <p>Enter the email address associated with your account and we’ll send you a OTP to reset your password.</p>
              </div>
              <div className={s["form-container"]}>
                <div className={s["login-form"]}>
                  <label>Email address</label>
                  <div className={`${s.inputBox}`}>
                    <FaRegUser size={14} style={{ color: "#000" }} />
                    <input type="email" placeholder="Email*" value={email} onChange={(e) => setemail(e.target.value)} />
                  </div>
                </div>

                <div className={s["forgot-password"]}>
                  Back To <span onClick={() => navigate("/")}>Login</span>
                </div>
                <div className={s["form-login-btn"]} onClick={() => setemailverify(true)}>
                  <Custombutton>Send OTP</Custombutton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EmailVerification open={emailverify} close={() => setemailverify(!emailverify)} />
    </>
  );
};

export default ForgotPassword;
