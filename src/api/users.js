import axios from "@/utils/req"
import utils from '../utils/utils'
let { stringifyParams } = utils

// axios的两种传值
/* export function getInfo (params) {
  return axios.get(url, { params: params })
} */
// ES 对象属性简写
/* export function getInfo (params) {
  return axios.get(url, { params })
} */
/* export function getInfo (params) {
   if(data!={}){
  return axios.get(url+'?'+stringifyParams(params)})
   }
} */
/* export function getInfo (data) {
  if(data!={}){
    return axios.get(url+'?'+stringifyParams(data)})
  }
} */
// 登录接口
export function login_api (data) {
  return axios.post('/users/checkLogin', data)
}

//添加账号
export function addAcc_api (data) {
  return axios.post('/users/add', data)
}
// 获取账号列表 
export function accList_api (params) {
  return axios.get('/users/list', { params })
}
// 删除账号
export function delAcc_api (params) {
  return axios.get('/users/del', { params })
}
//批量删除账号
export function batchDelAcc_api (params) {
  return axios.get('/users/batchdel', { params })
}
//修改账号
export function editAcc_api (data) {
  return axios.post('/users/edit', data)
}
//检查旧密码是否正确
export function checkOldPwd_api (params) {
  return axios.get('/users/checkoldpwd', { params })
}

// 修改密码
export function editPwd_api (data) {
  return axios.post('/users/editpwd', data)
}

//获取账号（个人中心）信息
export function getInfo_api (params) {
  return axios.get('/users/accountinfo', { params })
}
// 10.头像上传接口（特殊功能）
export function avatarUpload_api (data) {
  return axios.post('/users/avatar_upload', data)
}
// 11.验证token是否过期（特殊功能）
export function checkToken_api (params) {
  return axios.get('/users/checktoken', { params })
}