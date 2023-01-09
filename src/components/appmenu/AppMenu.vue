<template>
  <div class="appmenu">
    <!-- 顶部logo -->
    <div class="leftTop">
      <img src="@/assets/img/logo.png" />
      <h1>外卖商家中心</h1>
    </div>
    <!--<template></template> 无意义标签，不会渲染到页面上  -->
    <template></template>
    <!-- 导航栏菜单 -->
    <el-menu router unique-opened :default-active="this.$route.path" class="el-menu-vertical-demo"
      background-color="#333" text-color="#fff" active-text-color="#409EFF">
      <!--  -->
      <template v-for="item in menuList ">
        <!-- 一级菜单 -->
        <el-menu-item v-if="!item.children" :index="item.path" :key="item.path+'1'">
          <i :class="item.meta.icon"></i>
          <span slot="title">{{item.meta.title}}</span>
        </el-menu-item>
        <!-- 二级菜单 -->
        <el-submenu v-else :index="item.path" :key="item.path+'2'">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="item1 in item.children" :index="item1.path" :key="item1.path">{{item1.meta.title}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { getRoutes } from '@/router/index'
export default {
  data () {
    return {
      defaulActive: '/home',
      menuList: [],
      /* // 默认菜单选中的菜单项path
      path: '/home', */
    }
  },
  created () {
    // 调用路由里函数 获取 生成菜单的 数据
    this.menuList = getRoutes()
    // console.log(this.menuList);
    /* // 跟 watch 联用
    // 进入页面瞬间 拿到当前路由 赋值给path【问题：刷新之后 选中那个菜单出错】
    this.path = this.$route.path; */
  },
  /* watch: {
    // 默认菜单选中的菜单项的path
    // 监听this.$route.path
    '$route.path' (newpath, oldpath) {
      // console.log(newpath, oldpath);
      this.path = newpath
    }
  }, */
  /* // 计算属性
  computed: {
    // 计算默认菜单选中的菜单项的path
    defaultpath () {
      let defaultpath = this.$route.path
      return defaultpath
    }
  }, */
  methods: {

  },
}
</script>

<style lang="less" scoped>
.appmenu {
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  background-color: #333;

  .leftTop {
    padding: 0 20px;
    display: flex;
    align-items: center;
    height: 50px;
    font-size: 16px;
    color: #fff;

    img {
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  /deep/.el-menu-vertical-demo {
    border: 0;
    text-align: left;
    width: 100% !important;
  }
}
</style>