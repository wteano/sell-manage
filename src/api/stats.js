import axios from "@/utils/req"
import utils from '../utils/utils'
let { stringifyParams } = utils

// 总数据
export function statsTotal_api (params) {
  return axios.get('/stats/total', { params })
}
//订单数据
export function statsOrder_api (data) {
  return axios.get('/stats/order', data)
}
// 商品数据
export function statsGoods_api (data) {
  return axios.get('/stats/goods', data)
}