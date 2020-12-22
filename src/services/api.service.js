import axios from "axios";
import { commonHeader, authHeader } from '../helpers';

export const apiService = {
    actualGet,
    actualPost,
};

export const baseUrl = process.env.VUE_APP_BASEURL;

const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: commonHeader(),
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || (status === 401 || status === 422);
    }
});

function actualGet(url, paramObj = {}) {
    instance.defaults.headers = authHeader();
    return instance.get(url, {
                params: paramObj
            })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error;
            });
}

function actualPost(url, paramObj) {
    instance.defaults.headers = authHeader();
    return instance.post(url, paramObj)
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
}