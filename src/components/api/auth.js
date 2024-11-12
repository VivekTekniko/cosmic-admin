import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl2 } from "../../utils";

const admin_login = getBaseUrl2() + "api/user/login";
const get_otp = getBaseUrl2() + "api/admin/get_otp";

export const get_otp_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    };

    return await axios.post(get_otp, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const authapi = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    };

    return await axios.post(admin_login, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};





export default authapi;
