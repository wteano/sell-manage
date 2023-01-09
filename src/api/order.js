import axios from "@/utils/req"
import utils from '../utils/utils'
let { stringifyParams } = utils


//获取订单列表 && 带查询功能
export function orderList_api (params) {
  return axios.get('/order/list', { params })
}
// 查询
export function orderSearch_api (params) {
  return axios.get('/order/search', { params })
}

/* 获取订单详情 */
export function orderDetail_api (params) {
  return axios.get('/order//detail', { params })
}

//获取商品分类列表
export function cateList_api (params) {
  return axios.get('/order/catelist', { params })
}

// 删除商品分类
export function delCate_api (params) {
  return axios.get('/order/delcate', { params })
}

//修改商品分类
export function editCate_api (data) {
  return axios.post('/order/editcate', data)
}

// 商品图片上传接口（特殊功能）
export function uploadGoodsImg_api (data) {
  return axios.post('/order/order_img_upload', data)
}

//首页报表接口
export function homeData_api (params) {
  return axios.get('/order/totaldata', { params })
}
// 获取订单报表
export function orderTotal_api (params) {
  return axios.get('/order/ordertotal', { params })
}
