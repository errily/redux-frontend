import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://redux-frontend.herokuapp.com/';

const upload = (file , onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(API_URL+"/upload", formData, {headers : {
        "Content-Type" : "multipart/form-data"
    } ,onUploadProgress });
};

const getFiles = () => {
    return axios.get(API_URL+"/files");
    
};


export default {
    upload,
    getFiles
};
