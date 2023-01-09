import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/Layout.vue'
import utils from '@/utils/utils'

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
    component: () => import('@/views/login/Login.vue')
  },
  // 首页
  {
    path: '/layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        meta: {
          title: '后台首页', icon: 'el-icon-s-home', role: ""
        },
        component: () => import('@/views/home/Home.vue')
      }
    ]
  },

  // 账号管理
  {
    path: '/account',
    redirect: '/account/add',
    component: Layout,
    meta: {
      title: '账号管理', icon: 'el-icon-s-custom',
      role: ""
    },
    children: [
      //账号列表
      {
        path: '/account/list',
        meta: { title: '账号列表', role: "super" },
        component: () => import('@/views/account/AccountList.vue')
      },
      //个人中心
      {
        path: '/account/info',
        meta: { title: '个人中心', role: "", isMenu: false },
        component: () => import('@/views/account/AountInfo.vue')
      },
      // 密码修改
      {
        path: '/account/pwdedit',
        meta: { title: '密码修改', role: "" },
        component: () => import('@/views/account/PasswordEdit.vue')
      },
      // 账号添加
      {
        path: '/account/add',
        meta: { title: '添加账号', role: "super" },
        component: () => import('@/views/account/AccountAdd.vue')
      },



    ]
  },
  // 商品管理
  {
    path: '/goods',
    redirect: '/goods/list',
    component: Layout,
    meta: {
      title: '商品管理', icon: 'el-icon-s-goods',
      role: "super"
    },
    children: [
      // 修改商品
      {
        path: '/goods/edit',
        meta: { title: '修改商品', role: "", isMenu: false },
        component: () => import('@/views/goods/GoodsEdit.vue')
      },
      //商品列表
      {
        path: '/goods/list',
        meta: { title: '商品列表', role: "" },
        component: () => import('@/views/goods/GoodsList.vue')
      },
      //商品类型
      {
        path: '/goods/type',
        meta: { title: '商品分类', role: "" },
        component: () => import('@/views/goods/GoodsType.vue')
      },
      // 商品添加
      {
        path: '/goods/add',
        meta: { title: '添加商品', role: "" },
        component: () => import('@/views/goods/GoodsAdd.vue')
      },
    ]
  },
  // 订单管理
  {
    path: '/order',
    redirect: '/orderlist',
    component: Layout,
    children: [
      {
        path: '/orderlist',
        meta: { title: '订单管理', icon: 'el-icon-s-order', role: "" },
        component: () => import('@/views/order/OrderList.vue')
      }
    ]
  },
  // 店铺管理
  {
    path: '/shop',
    redirect: '/shopinfo',
    component: Layout,
    children: [
      {
        path: '/shopinfo',
        meta: { title: '店铺管理', icon: 'el-icon-s-shop', role: "" },
        component: () => import('@/views/shop/Shop.vue')
      }
    ]
  },
  // 数据统计
  {
    path: '/statistics',
    redirect: '/statistics/goods',
    component: Layout,
    meta: { title: '数据统计', icon: 'el-icon-s-data', role: "" },
    children: [
      {
        path: '/statistics/goods',
        meta: { title: '商品统计', role: "" },
        component: () => import('@/views/statistics/GoodsStatistic.vue')
      },
      {
        path: '/statistics/order',
        meta: { title: '订单统计', role: "" },
        component: () => import('@/views/statistics/OrderStatistic.vue')
      }
    ]
  },
  // error页面
  {
    path: '*',
    component: () => import('@/views/error/Error404.vue')
  },
]
// 处理并暴露路由配置数组
export const getRoutes = () => {
  // 防止影响路由配置数组
  let data = utils.deepClone(routes)
  /* //深拷贝有缺陷（function和underfinded，不会拷贝，数据量大，耗性能）
  // let data = JSON.parse(JSON.stringify(routes))*/
  data = data.filter(item => item.children)
  data = data.map(item => {
    if (item.children.length == 1) {
      // 只有一个子路由
      return item.children[0]
    } else {
      // 只有多个子路由
      // 子路由中的meta对象中存在isMenu属性且值为false的不加入菜单
      item.children = item.children.filter(el => !(el.meta.isMenu == false))
      return item
    }
  });
  return data
}



const router = new VueRouter({
  routes
})



// 路由守卫
// to 要前往的路由,from 来自的哪个路由 ,next 前往下一个路由
router.beforeEach((to, from, next) => {
  // console.log(from);console.log(to);
  // 如果要去login页面，不阻止
  if (to.path === '/login') {
    next()
  } else if (JSON.parse(localStorage.getItem('user')).token) {
    // 如果有 token 放行
    /* if (to.path === '/goods/edit' && from.path === '/goods/list') {
      next('/goods/list')
    } */
    next()
  } else {
    // 如果没有 token 跳转到登录页面
    next('/login')
  }
})

export default router
