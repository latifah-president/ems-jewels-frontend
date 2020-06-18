import axios from 'axios';
const instance = axios.create({
    //  baseURL: "http://localhost:8800/",
    baseURL: "https://ems-jewels.herokuapp.com/",

}); 

export default instance;