import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const addbanner = getBaseUrl2() + "api/user/admin";
const admin_list = getBaseUrl2() + "api/user/admin";



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

export const fetchallAdmin = async (data) => {
  let config = {
    method: "get",
    url: admin_list + `?page=${data.page}&limit=${data.limit}`,
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

export default fetchallAdmin;

