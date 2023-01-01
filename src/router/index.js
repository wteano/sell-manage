import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  // 登录页
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/layout',
    redirect: '/home',
    component: Layout,
  },
  // 首页
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: () => import('../views/home/Home.vue')
      }
    ]
  },
  // 账号管理
  {
    path: '/account',
    redirect: '/account/add',
    component: Layout,
    children: [
      // 账号添加
      {
        path: '/account/add',
        name: 'accountadd',
        component: () => import('../views/account/AccountAdd.vue')
      },
      // 账号修改
      {
        path: '/account/edit',
        name: 'accountedit',
        component: () => import('../views/account/AccountEdit.vue')
      },
      //账号列表
      {
        path: '/account/list',
        name: 'accountlist',
        component: () => import('../views/account/AccountList.vue')
      },
      //个人中心
      {
        path: '/account/personalcenter',
        name: 'personalcenter',
        component: () => import('../views/account/PersonalCenter.vue')
      },
    ]
  },
  // 商品管理
  {
    path: '/goods',
    redirect: '/goods/list',
    component: Layout,
    children: [
      // 商品添加
      {
        path: '/goods/add',
        component: () => import('../views/goods/GoodsAdd.vue')
      },
      // 商品修改
      /* {
        path: '/goods/edit',
        component: () => import('../views/goods/GoodsEdit.vue')
      }, */
      //商品列表
      {
        path: '/goods/list',
        component: () => import('../views/goods/GoodsList.vue')
      },
      //商品类型
      {
        path: '/goods/type',
        component: () => import('../views/goods/GoodsType.vue')
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    children: [
      {
        path: '/order',
        component: () => import('../views/order/OrderList.vue')
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        path: '/shop',
        component: () => import('../views/shop/Shop.vue')
      }
    ]
  },
  // 销售统计
  {
    path: '/statistics',
    redirect: '/statistics/goods',
    component: Layout,
    children: [
      {
        path: '/statistics/goods',
        component: () => import('../views/statistics/GoodsStatistic.vue')
      },
      {
        path: '/statistics/order',
        component: () => import('../views/statistics/OrderStatistic.vue')
      }
    ]
  },
  {
    path: '*',
    component: () => import('@/views/error/Error404.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
