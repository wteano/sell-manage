import axios from "@/utils/req"
import utils from '../utils/utils'
let { stringifyParams } = utils

// 获取店铺详情
export function shopInfo_api (params) {
  return axios.get('/shop/info', { params })
}
// 店铺图片上传接口（特殊功能）
export function uploadShopImg_api (data) {
  return axios.post('/shop/upload', data)
}
// 店铺内容修改
export function editShop_api (data) {
  return axios.post('/shop/edit', data)
}