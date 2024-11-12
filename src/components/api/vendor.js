import axios from "axios";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../utils";

const vendor_list = getBaseUrl() + "api/user/vendor";
const delete_blog = getBaseUrl() + "api/admin/blog";
const add_blog = getBaseUrl() + "api/admin/blog";
const update_blog = getBaseUrl() + "api/admin/blog";

export const getVendor_api = async (data) => {
    let config = {
        method: "get",
        url: vendor_list + `?page=${data.page}&limit=${data.limit}&search=${data.search}&location=${data.location}&package=${data.package}&verify=${data.verify}&startDate=${data.startDate}&endDate=${data.endDate}`,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    try {
        let res = await axios(config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};


export const create_vendor_api = async (data) => {
    let config = {
        method: "POST",
        url: getBaseUrl() + `api/user/vendor`,
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



export const updateVendor_api = async (id, data) => {
    let config = {
        method: "PATCH",
        url: getBaseUrl() + `api/user/vendor/${id}`,
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

export const updateLead_api = async (id, data) => {
    let config = {
        method: "PATCH",
        url: getBaseUrl() + `api/user/customer/${id}`,
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

export const deleteVendor_api = async (id) => {
    let config = {
        method: "DELETE",
        url: getBaseUrl() + `api/user/vendor/${id}`,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };

    try {
        let res = await axios(config);
        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};



//  This is is used to assign the package to the vendor

export const assingPackage_api = async (data) => {
    let config = {
        method: "post",
        url: getBaseUrl() + `api/user/assignPackage`,
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


export const assignVendors = async (data) => {
    let config = {
        method: "post",
        url: getBaseUrl() + `api/user/assign`,
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








export const deleteBlog_api = async (data) => {
    let config = {
        method: "delete",
        url: delete_blog + `/${data}`,
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










export const add_blog_api = async (data) => {
    let config = {
        method: "post",
        url: add_blog,
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
export const updateBlog_api = async (data, id) => {
    let config = {
        method: "patch",
        url: update_blog + `/${id}`,
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
