import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../../utils";

const addLanguage = getBaseUrl() + "admin/addLanguage";
const deleteLanguage = getBaseUrl() + "admin/deleteLanguage";
const getLanguages = getBaseUrl() + "admin/getLanguages";
const updateLanguage = getBaseUrl() + "admin/updateLanguage";

export const addLanguage_api = async (data) => {
  let config = {
    method: "post",
    url: addLanguage,
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
export const updateLanguage_api = async (data) => {
  let config = {
    method: "PATCH",
    url: updateLanguage,
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
export const deleteLanguage_api = async (data) => {
  let config = {
    method: "DELETE",
    url: deleteLanguage,
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

export const getLanguages_api = async (data) => {
  let config = {
    method: "get",
    url: getLanguages + `?page=${data.page}&limit=${data.limit}&search=${data.search}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
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
