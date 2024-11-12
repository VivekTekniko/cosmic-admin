import axios from "axios";
import { getBaseUrl } from "../../utils";
import Cookies from "js-cookie"


const rejected_lead_admin = getBaseUrl() + "api/user/rejectLead";
const rejected_lead_status = getBaseUrl() + "api/user/rejectLead";



const add_package = getBaseUrl() + "api/user/package";
const all_service_list = getBaseUrl() + "api/admin/serviceByCat";
const update_package = getBaseUrl() + "api/user/package"

const delete_package = getBaseUrl() + "api/user/package";


export const getRejectLeadForAdmin_api = async (data) => {
    let config = {
        method: "get",
        url: rejected_lead_admin + `?page=${data.page}&limit=${data.limit}`,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    }
    try {
        let res = await axios(config)
        return res;
    } catch (error) {
        console.log(error)
        return error.response
    }
}


export const rejectedLeadStatus_api = async (data, id) => {
    let config = {
        method: "patch",
        url: rejected_lead_status + `/${id}`,
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        data: data
    }
    try {
        let res = await axios(config)
        return res;
    } catch (error) {
        console.log(error)
        return error.response
    }
}



export const get_all_service_list_dropdown = async (data) => {
    let config = {
        method: "post",
        url: all_service_list,
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
        data: data
    }
    try {
        let res = await axios(config)
        return res;
    } catch (error) {
        console.log(error)
        return error.response
    }
}


export const addPackage_api = async (data) => {
    let config = {
        method: "post",
        url: add_package,
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

export const updatePackage_api = async (id, data) => {
    let config = {
        method: "patch",
        url: update_package + `/${id}`,
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


export const deletePackage_api = async (data) => {
    let config = {
        method: "delete",
        url: delete_package + `/${data}`,
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
