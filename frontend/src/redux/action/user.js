import axios from "axios";
import { server } from "../../server";

export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadUserRequest",
        });
        const { data } = await axios.get(`${server}/user/get-user`, {
            withCredentials: true,
        });
        dispatch({
            type: "LoadUserSuccess",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response.data.message,
        });
    }
};

export const LoadSeller = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadSellerRequest",
        });
        const { data } = await axios.get(`${server}/shop/get-Seller`, {
            withCredentials: true,
        });
        dispatch({
            type: "LoadSellerSuccess",
            payload: data.seller,
        });
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response.data.message,
        });
    }
};

export const LoadAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: "LoadAdminRequest",
        });
        const { data } = await axios.get(`${server}/user/get-admin`, {
            withCredentials: true,
        });
        dispatch({
            type: "LoadAdminSuccess",
            payload: data.isAdmin,
        });
    } catch (error) {
        dispatch({
            type: "LoadAdminFail",
            payload: error.response.data.message,
        });
    }
};