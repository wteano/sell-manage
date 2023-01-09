<template>
  <div class="main">
    <div class="loginBox">
      <h3>外卖商家中心</h3>
      <el-form :model="loginData" :rules="rules" ref="loginForm">
        <el-form-item prop="account">
          <el-input class="inpBox" placeholder="请输入账号" type="text" v-model="loginData.account">
            <i slot="prefix" class="iconfont icon-yonghu"></i>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input class="inpBox" placeholder="请输入密码" :type="pwdType" v-model="loginData.password">
            <i slot="prefix" class="iconfont icon-mima"></i>
            <i slot="suffix" class="iconfont" :class="pwdType=='password'?'icon-by':'icon-zy'" @click="pwdShow"></i>
            <!-- <i slot="suffix" class="iconfont" :class="closeeye" @click="pwdShow"></i> -->
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="loginBtn" type="primary" round @click="login">立即登录</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
import { login_api } from '@/api/users'
export default {
  data () {
    // 自定义验证规则
    // 账号验证
    const checkAcc = (rule, value, callback) => {
      /* 
      *rule===>该字段已有的验证规则
      *value===>该字段的最新值
      * *callback===>回调函数，失败需要返回callback(new Error('失败信息'))
       */
      if (!value) {
        callback(new Error('请输入账号'))
      }
      // let accReg = /^1[3-9][0-9]{9}$/
      let accReg = /^[A-z0-9]{2,9}$/
      if (!accReg.test(value)) {
        // callback(new Error('请输入正确手机号'))
        callback(new Error('请输入2 到 9 个字符的正确的帐号'))
      }
      // 如果所有条件都满足，调用callback通过验证
      callback()
    }
    // 密码验证
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      }
      /* // 一致性验证
      if (value != this.loginData.account) {
        callback(new Error('不一致'))
      } */
      let pwdReg = /^[A-z0-9]{3,12}$/i
      if (!pwdReg.test(value)) {
        // new Error('')谷歌内置错误对象    专门拿来 报错用的
        callback(new Error('密码长度在 3 到 12 个字符'))
      }
      // 如果所有条件都满足，通过
      callback()
    }
    return {
      closeeye: 'icon-by',
      pwdType: 'password',
      loginData: {
        account: 'admin',
        password: 'admin',
      },
      rules: {
        account: [{ validator: checkAcc, trigger: 'blur' },],
        password: [{ validator: checkPwd, trigger: 'blur' },],
      }
    }
  },
  methods: {
    // 密码加密显隐切换
    pwdShow () {
      if (this.pwdType == 'text') {
        this.pwdType = 'password'
      } else {
        this.pwdType = 'text'
      }
      /* if (this.closeeye == 'icon-by') {
        this.closeeye = 'icon-zy';
        this.pwdType = 'text';
      } else {
        this.closeeye = 'icon-by';
        this.pwdType = 'password';
      } */
    },
    login () {
      // console.log(this.$refs.loginForm);
      // loginForm的数据通过验证
      this.$refs.loginForm.validate(async bool => {
        // console.log(bool);
        if (bool) {
          // loginForm的数据通过验证
          // 发送axios请求
          let res = await login_api(this.loginData)
          // console.log(res);
          let { code, token, id } = res
          if (code == 0) {
            // 本地存储token
            localStorage.setItem('user', JSON.stringify(res))
            // localStorage.setItem('token', token)
            // localStorage.setItem('id', id)
            // 登陆成功，
            // this.$message.success(res.msg)
            // 跳转到首页
            this.$router.push('/home')
          } else {
            // 登录失败返回失败信息
            // this.$message.error(res.msg)
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.main {
  background: #2d3a4b;
  color: #fff;
  cursor: pointer;
}

.loginBox {
  position: absolute;
  top: 50%;
  left: 50%;
  /* 向左,顶部平移自身宽度的50% */
  transform: translate(-50%, -50%);
  width: 400px;
  text-align: center;
}

h3 {
  margin: 20px 0;
  font-size: 20px;
}

.inpBox {
  position: relative;
  width: 100%;
  height: 40px;
  border-radius: 5px;

  /deep/input {
    height: 100%;
    color: #fff;
    background: #2d3b4b;
  }

  .iconfont {
    line-height: 40px;
  }
}

.loginBtn {
  width: 100%;
}
</style>