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
    <el-menu router unique-opened default-active="/home" class="el-menu-vertical-demo" background-color="#333"
      text-color="#fff" active-text-color="#409EFF">
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-submenu index="/account">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/list">账号列表</el-menu-item>
        <el-menu-item index="/account/info">个人中心</el-menu-item>
        <el-menu-item index="/account/pwdedit">密码修改</el-menu-item>
        <el-menu-item index="/account/add">账号添加</el-menu-item>
      </el-submenu>

      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-s-goods"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/list">商品列表</el-menu-item>
        <el-menu-item index="/goods/add">商品添加</el-menu-item>
        <el-menu-item index="/goods/type">商品类型</el-menu-item>
      </el-submenu>
      <!-- 订单管理 -->
      <el-menu-item index="/order">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="el-icon-s-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>
      <!-- 销售统计 -->
      <el-submenu index="/statistics">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>数据统计</span>
        </template>
        <el-menu-item index="/statistics/goods">订单统计</el-menu-item>
        <el-menu-item index="/statistics/order">商品统计</el-menu-item>
      </el-submenu>

    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaulActive: '/home',

    }
  },
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