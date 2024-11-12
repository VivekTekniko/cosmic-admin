import axios from "axios";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../utils";

const blog_list = getBaseUrl() + "api/admin/blog";
const delete_blog = getBaseUrl() + "api/admin/blog";
const add_blog = getBaseUrl() + "api/admin/blog";
const update_blog = getBaseUrl() + "api/admin/blog";

export const get_blog_api = async () => {
    let config = {
        method: "get",
        url: blog_list,
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
