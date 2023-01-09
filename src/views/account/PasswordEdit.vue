<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">密码修改</div>
      <el-form :model="pwdData" status-icon :rules="rules" ref="pwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="pwdData.oldPwd" :type="pwdType" autocomplete="off">
            <i slot="suffix" class="iconfont" :class="pwdType=='password'?'icon-by':'icon-zy'" @click="pwdShow"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input v-model="pwdData.newPwd" :type="pwdType" autocomplete="off">
            <i slot="suffix" class="iconfont" :class="pwdType=='password'?'icon-by':'icon-zy'" @click="pwdShow"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPwd">
          <el-input v-model="pwdData.checkPwd" :type="pwdType" autocomplete="off">
            <i slot="suffix" class="iconfont" :class="pwdType=='password'?'icon-by':'icon-zy'" @click="pwdShow"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </Panel>

  </div>
</template>

<script>
import Panel from '@/components/panel/Panel.vue';
import { checkOldPwd_api, editPwd_api } from '@/api/users';
export default {
  components: {
    Panel
  },
  data () {
    const checkOldPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入原密码'))
      }
      let pwdReg = /^[A-z0-9]{3,12}$/
      if (!pwdReg.test(value)) {
        // new Error('')谷歌内置错误对象    专门拿来 报错用的
        callback(new Error('密码长度在 3 到 12 个字符'))
      }
      /* // 一致性验证
      this.checkOldPwd().then(data => {
        // console.log(data);
        if (data.code == 1) {
          callback(new Error(data.msg))
        } else if (data.code == 0) {
          // 如果所有条件都满足，通过
          callback()
        }
      }); */
      callback()
    }
    // 
    const checkNewPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入新密码'))
      }
      let pwdReg = /^[A-z0-9]{3,12}$/
      if (!pwdReg.test(value)) {
        // new Error('')谷歌内置错误对象    专门拿来 报错用的
        callback(new Error('密码长度在 3 到 12 个字符'))
      }
      // 如果所有条件都满足，通过
      callback()
    }
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入确认密码'))
      }
      // 一致性验证
      if (value != this.pwdData.newPwd) {
        callback(new Error('新密码与确认新密码不一致'))
      }
      // 对newPwd进行校验
      // this.$refs.pwdForm.validateField('newPwd');
      // 如果所有条件都满足，通过
      callback()
    }
    return {
      pwdType: 'password',
      pwdData: {
        id: '',
        oldPwd: '',
        newPwd: '',
        checkPwd: ''
      },
      rules: {
        oldPwd: [{ validator: checkOldPwd, trigger: 'blur' }],
        newPwd: [{ validator: checkNewPwd, trigger: 'blur' }],
        checkPwd: [{ validator: checkPwd, trigger: 'blur' }]
        // checkPwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }]
      },
    }
  },
  created () {
    this.pwdData.id = JSON.parse(localStorage.getItem('user')).id
  },
  methods: {
    // 检查旧密码是否正确
    /* async checkOldPwd () {
      let id =JSON.parse(localStorage.getItem('user')).id
      let res = await checkOldPwd_api( {
          oldPwd: this.pwdData.oldpwd,
          id: this.accountInfo.id
      })
      // console.log(res.data.code);
      return res.data
    }, */
    //修改密码
    checkPwd () {
      console.log(this.pwdData);
      this.$confirm('该操作将永久改变您的的密码,是否继续', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async res => {
        try {
          let { code } = await editPwd_api({
            newPwd: this.pwdData.newPwd,
            id: this.pwdData.id,
            oldPwd: this.pwdData.oldPwd
          })
          // 修改成功
          if (code == 0) {
            localStorage.clear();
            this.$router.push('/login')
          }
        } catch (error) {
          console.log(error);
        }
      }).catch(res => {
        this.$message.info('已取消修改')
      })
    },
    // 密码加密显隐切换
    pwdShow (e) {
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
    // 提交密码修改
    submitForm () {
      this.$refs.pwdForm.validate(val => {
        if (val) {
          // console.log(val);
          //修改密码，发送接口
          this.checkPwd()
        }
      })
    },
    // 重置
    resetForm (val) {
      // console.log(this.$refs.pwdForm);
      this.$refs.pwdForm.resetFields();
      // this.pwdData = {}
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.el-input {
  width: 400px;
  min-width: 300px;
}
</style>