import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const getCategories = getBaseUrl2();
const status_update_categories = getBaseUrl2();
const delete_budget_range = getBaseUrl2();
const addBudgetRange = getBaseUrl2() + "api/user/budgetRange";
const update_budget_range = getBaseUrl2();

export const assign_categ_api = async (id, data) => {
  console.log(id, data);
  let config = {
    method: "patch",
    // url: getBaseUrl2() + `api/admin/assign_categ/${id}`,
    url: getBaseUrl2() + `api/admin/assign_scateg/${id}`,
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
export const assign_cities_api = async (id, data) => {
  console.log(id, data);
  let config = {
    method: "patch",
    url: getBaseUrl2() + `api/admin/assign_cities/${id}`,
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

export const get_state = async () => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
    };
    return await axios.get(getBaseUrl2() + "api/static/get_states", config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const get_city = async (state) => {
  console.log(state);
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
    };
    return await axios.get(getBaseUrl2() + `api/static/get_cities?st_id=${state}`, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const updateBudgetRange_api = async (id, data) => {
  let config = {
    method: "patch",
    url: update_budget_range + `api/user/budgetRange/${id}`,
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
export const addBudgetRanges_api = async (data) => {
  let config = {
    method: "post",
    url: addBudgetRange,
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

export const deleteBudgetRange_api = async (data) => {
  let config = {
    method: "delete",
    url: delete_budget_range + `api/user/budgetRange/${data}`,
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
export const status_update_categories_api = async (id, data) => {
  let config = {
    method: "PATCH",
    url: status_update_categories + `api/admin/category/${id}`,
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

export const getsubCategoriesbyid_api = async (data) => {
  let config = {
    method: "get",
    url: getCategories + `api/admin/subcategory?cat_id=${data}`,
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
export const getBudgetRange_api = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + `api/user/budgetRange?page=${data.page}&limit=${data.limit}&search=${data.search}`,
    // url: getCategories + `api/admin/category`,
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

export const getCategories_apis = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + "api/admin/category",
    // url: getCategories + `api/admin/category`,
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
