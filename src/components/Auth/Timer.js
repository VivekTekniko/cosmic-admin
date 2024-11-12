import React, { useEffect, useState } from "react";
import { emailValidator } from "../../utils/Validation";
import { notificationHandler } from "../../utils/Notification";
import { get_otp_api } from "../api/auth";

const Timer = ({ time, email }) => {
  const [resend, setResend] = useState(false);
  const [second, setsecond] = useState(time);
  let min = (second / 60) | 0;
  let sec = second % 60 | 0;

  const getotpverify = async () => {
    if (!emailValidator(email)) {
      alert("Email is not valid");
      return;
    }
    let temp = {
      email,
    };
    try {
      const res = await get_otp_api(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
    }
  };

  function resendOtp() {
    setResend(false);
    getotpverify();
    setsecond(60);
  }
  useEffect(() => {
    let ID = null;
    if (second <= 0) {
      return setResend(true);
    }
    ID = setInterval(() => {
      setsecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(ID);
  }, [second]);
  return (
    <>
      <p style={{ paddingTop: "0.4rem" }}>
        Resend OTP available in{" "}
        {resend ? (
          <span style={{ color: "blue", cursor: "pointer" }} onClick={resendOtp}>
            Resend
          </span>
        ) : (
          `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`
        )}
      </p>
    </>
  );
};

export default Timer;
