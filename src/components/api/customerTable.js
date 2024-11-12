import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl, getBaseUrl2 } from "../../utils";

const user_delete = getBaseUrl() + "api/user/customer";
const user_status = getBaseUrl() + "admin/updateUser";
const user_update = getBaseUrl() + "admin/updateUser";
const users_list = getBaseUrl2() + "api/admin/users";
const upload_user_invoice = getBaseUrl2() + "api/admin/upload_user_invoice";

export const user_update_api = async (data) => {
  let config = {
    method: "patch",
    url: user_update,
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
export const user_status_api = async (data) => {
  let config = {
    method: "patch",
    url: user_status,
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
export const user_delete_api = async (data) => {
  let config = {
    method: "DELETE",
    url: getBaseUrl2() + `api/user/customer/${data.id}`,
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

export const assignedLead = async (data) => {
  let config = {
    method: "GET",
    url: getBaseUrl2() + `api/user/testAssignVendor`,
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

export const addRemark = async (data, id) => {
  let config = {
    method: "PATCH",
    url: getBaseUrl2() + `api/user/customer/${id}`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: data
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const upload_user_invoice_api = async (data) => {
  let config = {
    method: "post",
    url: upload_user_invoice,
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
export const fetchAlluserbookings = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl2() + `api/admin/users/bookings`,
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

export const fetchallCustomers = async (data, role) => {
  if (role == "Vendor") {
    let config = {
      method: "get",
      url: getBaseUrl2() + `api/user/assignVendorCustomer?page=${data.page}&limit=${data.limit}&search=${data.search}&location=${data.location}&startDate=${data.startDate}&endDate=${data.endDate}&budgetRange=${data.budgetRange}`,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      // data: data
    };
    try {
      let res = await axios(config);
      return res;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  } else {
    let config = {
      method: "get",
      url: getBaseUrl2() + `api/user/customer?page=${data.page}&limit=${data.limit}&search=${data.search}&location=${data.location}&startDate=${data.startDate}&endDate=${data.endDate}&budgetRange=${data.budgetRange}`,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      // data: data
    };
    try {
      let res = await axios(config);
      return res;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  }
};

export const importLeads = async (file) => {
  try {
    let url = getBaseUrl() + "api/user/uploadCustomer";
    const fd = new FormData();
    fd.append("csvFile", file);
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    let res = await axios.post(url, fd, config);
    // console.log("add employee api",res);
    return res;
  }catch (error) {
    console.log(error);
    return error.response;
  }
}

export const importVendors = async (file) => {
  try {
    let url = getBaseUrl() + "api/user/uploadVendor";
    const fd = new FormData();
    fd.append("csvFile", file);
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    let res = await axios.post(url, fd, config);
    // console.log("add employee api",res);
    return res;
  }catch (error) {
    console.log(error);
    return error.response;
  }
}

export const fetchFilterVendorfunc = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl2() + `api/user/vendorFromCustomer`,
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

export const fetchManuallyAssigned = async (data) => {
  let config = {
    method: "post",
    url: getBaseUrl2() + `api/user/assign`,
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

export const updateAssignedVendor = async (data,customerId) => {
  let config = {
    method: "patch",
    url: getBaseUrl2() + `api/user/customer/${customerId}`,
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

export const shuffleLead = async (payload) => {
  let config = {
    method: "post",
    url: getBaseUrl2() + `api/user/setting`,
    headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
    data: payload,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};