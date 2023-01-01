// 1.全局配置 生成   src/utils/req.js   

// 拦截器： 请求拦截器   响应拦截器  

// 暴露 axios 的实例对象
import { BASE_URL, BASE_URL1 } from './BASE_URL';
import axios from 'axios'
// 本地服务器地址  
axios.defaults.baseURL = BASE_URL1

// 上线服务器地址  
axios.defaults.baseURL = BASE_URL


/* 
const baseURL = require('./BASE_URL');
const axios = require('axios').default;
axios.defaults.baseURL = BASE_URL */


// 暴露
export default axios;  //ES6暴露
// module.exports = axios; //CommonJS暴露