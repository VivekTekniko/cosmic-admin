import axios from "axios";
import { getBaseUrl } from "../../utils";
import Cookies from "js-cookie";

let getLocation = getBaseUrl() + "api/user/location";
let addLocation = getBaseUrl() + "api/user/location";
let updateLocation = getBaseUrl() + "api/user/location";
let deleteLocation = getBaseUrl() + "api/user/location";


//  This is for get the all locations
export const locationList_api = async (data) => {
    let config = {
        method: "get",
        url: getLocation + `?page=${data.page}&limit=${data.limit}`,
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

//  this is used to add locations

export const addLocations_api = async (data) => {
    let config = {
        method: "post",
        url: addLocation,
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


export const updateLocations_api = async (data, id) => {
    let config = {
        method: "patch",
        url: updateLocation + `/${id}`,
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


// api for delete the location
export const deleteLocation_api = async (data) => {
    let config = {
        method: "delete",
        url: deleteLocation + `/${data.id}`,
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
