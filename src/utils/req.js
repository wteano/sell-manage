// 生成   src/utils/req.js   

import { BASE_URL } from './BASE_URL';
import axios from 'axios'
// 接收路由组件
import router from '../router';
//引入element-ui  Message部分
import {
  Message
} from 'element-ui'; //引入js部分

// 本地服务器地址 

axios.defaults.baseURL = BASE_URL

// 全局配置
// 上线服务器地址  
// axios.defaults.baseURL = BASE_URL

/* if (localStorage.getItem('token')) {
  // 'Bearer ' 是token的分类
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
} */


// 拦截器： 请求拦截器   响应拦截器  
// 添加请求拦截器
// config是个对象包含token baseURL等配置 全局的axios的默认值
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么， 
  // 配置token
  if (localStorage.getItem('user')) {
    // 'Bearer ' 是token的分类
    let token = JSON.parse(localStorage.getItem('user')).token
    config.headers.Authorization = 'Bearer ' + token;
  }
  // console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  let data = response.data
  // console.log(response.data);
  let { code } = data
  if (code != undefined && data.msg) {
    if (code === 0) {
      // Message.success(data.msg)
      Message({
        type: 'success',
        message: data.msg,
        duration: 3000  //提示信息展示时间，默认 3s==3000
      })
    } else if (code === 1) {
      // Message.error(data.msg)
      Message({
        type: 'error',
        message: data.msg,
        duration: 3000  //提示信息展示时间，默认 3s==3000
      })
    }
  }

  return data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  console.log(error);
  // 断网 ，跨域 后端拦截
  if (error.code == "ERR_NETWORK") {
    Message({
      type: 'error',
      message: '网络连接错误',
      duration: 3000  //提示信息展示时间，默认 3s==3000
    })
  }

  return Promise.reject(error);
});




// 暴露 axios 的实例对象
export default axios;  //ES6暴露