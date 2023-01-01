<template>
  <div class="layout">
    <!-- 左部导航 -->
    <div class="left">
      <div class="leftTop">
        <img src="@/assets/img/logo.png" />
        <h1>外卖商家中心</h1>
      </div>

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
          <el-menu-item index="/account/personalcenter">个人中心</el-menu-item>
          <el-menu-item index="/account/edit">密码修改</el-menu-item>
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
            <span>销售统计</span>
          </template>
          <el-menu-item index="/statistics/goods">订单统计</el-menu-item>
          <el-menu-item index="/statistics/order">商品统计</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>

    <!-- 右边 -->
    <div class="right">
      <div class="rightTop">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="personal">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              欢迎您,{{ username }}
              <el-avatar :size="30" :src="imgUrl"></el-avatar>
            </span>
            <el-dropdown-menu slot="dropdown">
              <router-link class="topersonal" to="/account/personalcenter">
                <el-dropdown-item>
                  个人中心
                </el-dropdown-item>
              </router-link>
              <el-dropdown-item>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </div>

      <div class="rightMain scrollBar">
        <!-- <div class="main"> -->
        <router-view></router-view>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>

// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data () {
    return {
      username: '',
      imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  components: {

  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}

.left {
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

.right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rightTop {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    cursor: pointer;

    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }

  .rightMain {
    flex: 1;
    padding: 20px;
    height: 100%;
    overflow-y: scroll;
    background-color: #ddd;

    .main {
      width: 100%;
      height: 100%;
      //background-color: #fff;
    }
  }
}
</style>