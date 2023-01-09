<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">添加账号</div>

      <el-form :model="addData" hide-required-asterisk status-icon :rules="rules" ref="accountForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="addData.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="addData.userGroup" placeholder="请选择用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </Panel>

  </div>
</template>

<script>
import Panel from '@/components/panel/Panel.vue'
import { addAcc_api } from '@/api/users';
export default {
  components: {
    Panel
  },
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
      let pwdReg = /^[A-z0-9]{3,12}$/i
      if (!pwdReg.test(value)) {
        // new Error('')谷歌内置错误对象    专门拿来 报错用的
        callback(new Error('密码长度在 3 到 12 个字符'))
      }
      // 如果所有条件都满足，通过
      callback()
    }
    /* const checkUserGroup = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择用户组'))
      }
      /* let pwdReg = /^[A-z0-9]{4,12}$/i
      if (!pwdReg.test(value)) {
        // new Error('')谷歌内置错误对象    专门拿来 报错用的
        callback(new Error('密码长度在 4 到 12 个字符'))
      } */
    // 如果所有条件都满足，通过
    /* callback()
   } */
    return {
      addData: {
        account: '',
        password: '',
        userGroup: ''
      },
      rules: {
        account: [{ validator: checkAcc, trigger: 'blur' },],
        password: [{ validator: checkPwd, trigger: 'blur' },],
        // userGroup: [{ validator: checkUserGroup, trigger: 'blur' }]
        userGroup: [{ required: true, message: '请选择用户组', trigger: 'blur' }]
      },
    }
  },
  created () {

  },
  methods: {



    // 提交添加的
    submitForm () {
      this.$refs.accountForm.validate(async val => {
        // console.log(val);
        if (val) {
          // 调用添加账号接口
          await addAcc_api(this.addData)
          // console.log(res);
        }
      })

    },
    // 重置
    resetForm () {
      this.$refs.accountForm.resetFields();
      // this.addData = {}
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
/deep/.el-input {
  width: 40%;
  min-width: 300px;
}
/deep/.el-form-item {
  width: 40%;
  min-width: 300px;
}
</style>