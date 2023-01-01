<template>
  <div class="body">
    <div class="main">
      <h3>系统管理</h3>

      <el-input class="inpBox" placeholder="请输入账号" type="text" id="acc" v-model="accInp" maxlength="20">
        <i slot="prefix" class="iconfont icon-yonghu"></i>
        <p class="ts accts">请将账号输入完整</p>
      </el-input>

      <el-input class="inpBox" placeholder="请输入密码" :type="pwdType" id="pwd" v-model="pwdInp" maxlength="20">
        <i slot="prefix" class="iconfont icon-mima"></i>
        <!-- <i slot="suffix" class="iconfont" :class="isShow==true?'icon-by':'icon-zy'" @click="pwdShow"></i> -->
        <i slot="suffix" class="iconfont" :class="closeeye" @click="pwdShow"></i>
        <p class="ts pwdts">请输入正确的密码</p>
      </el-input>

      <el-button class="loginBtn" type="primary" round>立即登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: true,
      closeeye: 'icon-by',
      pwdType: 'password',
      accInp: '',
      pwdInp: '',

    }
  },
  methods: {
    // 密码加密显隐切换
    pwdShow () {
      this.isShow = !this.isShow
      /* if (this.pwdType == 'text') {
        this.pwdType = 'password'
      } else{
        this.pwdType = 'text'
      } */
      if (this.closeeye == 'icon-by') {
        this.closeeye = 'icon-zy';
        this.pwdType = 'text';
      } else {
        this.closeeye = 'icon-by';
        this.pwdType = 'password';
      }
    }
  },
}
</script>

<style lang="less" scoped>
.body {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  color: #fff;
  cursor: pointer;
}

.main {
  position: absolute;
  top: 50%;
  left: 50%;
  /* 向左,顶部平移自身宽度的50% */
  transform: translate(-50%, -50%);
  width: 400px;
  text-align: center;
}

h3 {
  font-size: 16px;
}

.inpBox {
  position: relative;
  margin: 20px 0 0;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  /deep/input {
    height: 100%;
    color: #fff;
    background: #2d3b4b;
  }
  .iconfont {
    line-height: 30px;
  }
  .ts {
    position: absolute;
    top: 0;
    left: 0;
    //display: none;
    color: #f40;
  }
}

.loginBtn {
  margin: 20px auto 0;
  width: 100%;
}
</style>