import axios from "axios";
import { getBaseUrl } from "../../utils";
import Cookies from "js-cookie"


const package_list = getBaseUrl() + "api/user/package";
const add_package = getBaseUrl() + "api/user/package";
const all_service_list = getBaseUrl() + "api/admin/serviceByCat";
const update_package = getBaseUrl() + "api/user/package"

const delete_package = getBaseUrl() + "api/user/package";


export const getPackage_api = async (data) => {
    let config = {
        method: "get",
        url: package_list + `?page=${data.page}&limit=${data.limit}`,
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

// export const best_treatment_api = async (data) => {
//     console.log(data, "data ------ in the api testing when choose the best treatments for the website")
//     let config = {
//         method: "post",
//         url: expertise_list,
//         headers: { Authorization: `Bearer ${sessionStorage.getItem("token") || Cookies.get("token")}` },
//         data: data
//     }
//     try {
//         let res = await axios(config)
//         return res;
//     } catch (error) {
//         console.log(error)
//         return error.response
//     }
// }

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
