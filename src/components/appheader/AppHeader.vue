<template>
  <div class="rightTop">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <!-- <el-breadcrumb-item v-for="item in bread" :key="item.path" :to="item.path">{{item.title}}</el-breadcrumb-item> -->
      <template v-for="item in breadList">
        <!-- 添加一个 无意义标签 template  -->
        <!-- template 和 v-for 时 :key 给所有的儿子节点  有item.meta.title就显示-->
        <el-breadcrumb-item :key="item.path" :to="item.path" v-if="item.meta.title">{{item.meta.title}}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
    <div class="personal">
      <el-dropdown trigger="click" @command="checkMenu">
        <span class="el-dropdown-link">
          欢迎您,{{ accountInfo.account }}登录<i class="el-icon-arrow-down el-icon--right"></i>
          <el-avatar :size="40" :src="accountInfo.imgUrl?baseURL + accountInfo.imgUrl:imgUrl"></el-avatar>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="0">
            个人中心
          </el-dropdown-item>
          <el-dropdown-item command="1">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { getInfo_api } from '@/api/users';
import { BASE_URL } from '@/utils/BASE_URL';
export default {
  // 计算属性，计算面包屑
  computed: {
    /* bread () {
      let newBread = [];
      // 拿到要计算的路由数组
      let barr = this.$route.matched;
      console.log(this.$route.matched);
      barr.forEach(item => {
        console.log(item);
        // 判断,如果$route.matched.meta.title为空,不push,
        if (item.meta.title != undefined) {
          // 循环遍历,按照格式生成一个新数组,其要给面包屑遍历
          newBread.push({
            title: item.meta.title,
            path: item.path
          });
        }
      })
      console.log(newBread);
      return newBread
    }, */
    // 1
    breadList () {
      return this.$route.matched;
    }
  },
  data () {
    return {
      baseURL: BASE_URL,
      accountInfo: {},
      bread: [],// 计算面包屑的 1
      // breadList: [], // 计算面包屑的 2
      imgUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  created () {
    this.getInfo()
    // 接收兄弟传兄弟
    this.$bus.$on('avatarUpload', () => this.getInfo())

    /* // 调用计算面包屑的函数，配合watch
    this.filterBread(); */

    /* // 给面包屑 赋初始值  2
    // this.breadList = this.$route.matched;
    // console.log(this.$route.matched); */
  },

  watch: {
    // 监听hash值的变化,变一次调用一次计算面包屑的函数
    // 监听$route.path的变化
    '$route.path' (newval) {
      /* // 调用计算面包屑的函数
      this.filterBread(); */
      /* // 配置breadList 2
      // this.breadList = this.$route.matched; */
    }
  },
  methods: {
    /* //计算面包屑的函数
    filterBread () {
      let newBread = [];
      // 拿到要计算的路由数组
      let barr = this.$route.matched;
      console.log(this.$route.matched);
      barr.forEach(item => {
        console.log(item);
        // 判断,如果$route.matched.meta.title为空,不push,
        if (item.meta.title != undefined) {
          // 循环遍历,按照格式生成一个新数组,其要给面包屑遍历
          newBread.push({
            title: item.meta.title,
            path: item.path
          });
        }
      })
      console.log(newBread);
      this.bread = newBread;
    }, */
    // 获取用户信息
    async getInfo () {
      let id = JSON.parse(localStorage.getItem('user')).id
      if (id) {
        let { accountInfo } = await getInfo_api({ id })
        if (accountInfo.ctime) {
          accountInfo.ctime = this.$utils.getTime(accountInfo.ctime)
        }
        this.accountInfo = accountInfo
        // console.log(this.accountInfo);
      }
    },
    checkMenu (key) {
      // console.log(key);
      if (key == 0) {
        this.$router.push('/account/info')
      } else {
        this.$router.push('/login')
        localStorage.clear()
      }
    },

  }
}
</script>

<style lang="less" scoped>
.rightTop {
  padding: 0 30px 0 20px;
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
</style>