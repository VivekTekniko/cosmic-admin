import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const get_admin_profile = getBaseUrl2() + "api/admin/profile";
const profile_update_admin = getBaseUrl2() + "api/admin/profile";

export const profile_update_admin_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    };
    return await axios.patch(profile_update_admin, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const get_admin_profile_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    };

    return await axios.get(get_admin_profile, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default get_admin_profile_api;
