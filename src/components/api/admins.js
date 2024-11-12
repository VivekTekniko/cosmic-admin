import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const addbanner = getBaseUrl2() + "api/user/admin";
const banners = getBaseUrl2() + "api/user/admin";
const getroll_admin = getBaseUrl() + "role";
const send_vendor_msg = getBaseUrl2() + "api/admin/send_vendor_msg";

export const send_vendor_msg_api = async (data) => {
  let config = {
    method: "post",
    url: send_vendor_msg,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const getroll_admin_api = async (data) => {
  let config = {
    method: "get",
    url: getroll_admin,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const update_banner_api = async (id, data) => {
  let config = {
    method: "PATCH",
    url: getBaseUrl() + `api/user/admin/${id}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const status_banner_api = async (id, data) => {
  let config = {
    method: "PATCH",
    url: getBaseUrl2() + `api/admin/banners/${id}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const delete_banner_api = async (id) => {
  let config = {
    method: "DELETE",
    url: getBaseUrl2() + `api/user/admin/${id}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const create_banner_api = async (data) => {
  let config = {
    method: "post",
    url: addbanner,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const fetchAllbanner = async (data) => {
  let config = {
    method: "get",
    url: banners,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    // data: data,
  };
  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};


export default fetchAllbanner;
