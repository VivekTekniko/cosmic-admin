import axios from "axios";
import { getBaseUrl } from "../../utils";
import Cookies from "js-cookie";

const dashoard = getBaseUrl() + "api/user/userDashboard";
const vendorDashoard = getBaseUrl() + "api/user/vendorDashboard";

export const fetchAllDashboard_api = async (data) => {
    let config = {
        method: "get",
        url: dashoard,
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
export const fetchVendorDashboard_api = async (data) => {
    let config = {
        method: "get",
        url: vendorDashoard,
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