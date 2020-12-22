import { commonHeader } from '../helpers';
import { apiService } from './api.service';

export const userService = {
    login,
    logout,
    register,
};

function login(loginObj) {
    // const requestOptions = {
    //     method: 'POST',
    //     headers: commonHeader(),
    //     body: JSON.stringify( loginObj)
    // };
    return apiService.actualPost('/login', loginObj)
    // .then(userRes => {
    //     // login successful if there's a jwt token in the response
    //     return userRes;
    // });
    // return fetch(`${process.env.VUE_APP_BASEURL}/login`, requestOptions)
    //     .then(handleResponse)
    //     .then(userRes => {
    //         // login successful if there's a jwt token in the response
    //         return userRes;
    //     });
}

function logout() {
    const requestOptions = {
        method: 'GET',
        headers: commonHeader()        
    };
    return fetch(`${process.env.VUE_APP_BASEURL}/logout`, requestOptions)
        .then(handleResponse)
        .then(userRes => {
            return userRes;
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: commonHeader(),
        body: JSON.stringify(user)
    };

    return fetch(`${process.env.VUE_APP_BASEURL}/register`, requestOptions)
        .then(handleResponse)
        .then(userRes => {
            return userRes;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}