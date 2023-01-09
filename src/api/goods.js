import axios from "@/utils/req"
import utils from '../utils/utils'
let { stringifyParams } = utils

//获取商品列表
export function goodsList_api (params) {
  return axios.get('/goods/list', { params })
}
//删除商品
export function delGoods_api (params) {
  return axios.get('/goods/del', { params })
}
// 修改商品
export function editGoods_api (data) {
  return axios.post('/goods/edit', data)
}
// 获取商品详情 /info
export function goodsInfo_api (params) {
  return axios.get('/goods/info', { params })
}
// 添加商品
export function addGoods_api (data) {
  return axios.post('/goods/add', data)
}

// 添加商品分类
export function addCate_api (data) {
  return axios.post('/goods/addcate', data)
}

//查询所有商品分类名称
export function goodsCates_api (params) {
  return axios.get('/goods/categories', { params })
}
//获取商品分类列表
export function cateList_api (params) {
  return axios.get('/goods/catelist', { params })
}

// 删除商品分类
export function delCate_api (params) {
  return axios.get('/goods/delcate', { params })
}

//修改商品分类
export function editCate_api (data) {
  return axios.post('/goods/editcate', data)
}


// 商品图片上传接口（特殊功能）
export function uploadGoodsImg_api (data) {
  return axios.post('/goods/goods_img_upload', data)
}
