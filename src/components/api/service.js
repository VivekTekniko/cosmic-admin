import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const addService = getBaseUrl2() + "api/user/service";
const update_service = getBaseUrl2();
const get_service = getBaseUrl2() + "api/user/service";
const get_location = getBaseUrl2() + "api/user/location";

export const updateService_api = async (id, data) => {
  console.log(id, data);
  let config = {
    method: "PATCH",
    url: update_service + `api/user/service/${id}`,
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


export const addService_api = async (data) => {
  let config = {
    method: "post",
    url: addService,
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

export const deleteService_api = async (data) => {
  let config = {
    method: "delete",
    url: getBaseUrl() + `api/user/service/${data}`,
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







export const getAllService_api = async (data) => {
  let config = {
    method: "get",
    url: get_service + `?page=${data.page}&limit=${data.limit}&search=${data.search}`,
    // url: get_service,
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
export const getAllLocation_api = async (data) => {
  let config = {
    method: "get",
    url: get_location + `?page=${data.page}&limit=${data.limit}&search=${data.search}`,
    // url: get_service,
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
