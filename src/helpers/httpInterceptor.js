import axios from 'axios';

export default function execute() {
    axios.interceptors.request.use(function(config) {
        const token = this.$store.state.token;
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function(err) {
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function (response) {  
        console.log(response);      
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}