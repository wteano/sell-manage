<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">管理员信息</div>
      <div class="content">
        <el-form label-position="left" label-width="100px">
          <el-form-item label="管理员ID:">
            <p>{{formData.id}}</p>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="账号:">
            <p>{{formData.account}}</p>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="用户组:">
            <p>{{formData.userGroup}}</p>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="创建时间:">
            <p>{{formData.ctime}}</p>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="管理员头像:">
            <el-upload ref="uploadForm" class="avatar-uploader" :action="uploadURL" :show-file-list="false"
              :on-success="uploadSuccess" :before-upload="beforeUpload" :auto-upload="false" :file-list="fileList"
              :on-change="uploadChange">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item>
            <el-button type="primary" @click="submitFiles">更换头像</el-button>
            <el-button @click="resetFiles">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>
     
<script>
import Panel from '@/components/panel/Panel.vue';
import { getInfo_api, avatarUpload_api } from '@/api/users';
import { BASE_URL } from '@/utils/BASE_URL';
export default {
  components: {
    Panel
  },
  data () {
    return {
      baseURL: BASE_URL,
      uploadURL: BASE_URL,
      fileList: [],
      imgUrl: '',
      formData: {
      }
    }
  },
  created () {
    // console.log(this.$route);

    this.getInfo()

  },
  methods: {
    // 获取用户信息
    async getInfo () {
      let id = JSON.parse(localStorage.getItem('user')).id
      let { accountInfo } = await getInfo_api({ id })
      // console.log(accountInfo);
      if (accountInfo.ctime) {
        accountInfo.ctime = this.$utils.getTime(accountInfo.ctime).slice(0, 10)
      }
      this.formData = accountInfo

      this.imgUrl = this.baseURL + accountInfo.imgUrl
      // 拼接用户上传头像的地址
      this.uploadURL += '/users/avatar_upload?id=' + accountInfo.id
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    uploadChange (file, fileList) {
      // 预览图片,
      // URL.createObjectURL(file.raw);获取图片的地址
      this.imgUrl = URL.createObjectURL(file.raw);
    },
    // 头像上传成功
    uploadSuccess (res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      console.log(res, file, this.imgUrl);
      /* {code: 0,msg: '上传成功!',imgUrl: '/upload/imgs/acc_img/1672762649199.png'
      } */
      if (res.code == 0) {
        this.imgUrl = this.baseURL + res.imgUrl;
        // this.getInfo();
        this.$message.success(res.msg);
        // 传递数据到 顶部头像
        this.$bus.$emit('avatarUpload');
      } else {
        this.$message.error(res.msg);
      }
    },
    // 图片上传前的钩子函数（hook函数）
    beforeUpload (file) {
      let filetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/jfif']
      // 上传的文件类型 不包含于filetypes中
      if (!filetypes.includes((file.type).toLowerCase())) {
        this.$message.error('上传头像图片格式错误！')
        return
      }
      if (file.size > 1024 * 1024 * 5) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return
      }
    },
    //点击 上传头像
    submitFiles () {
      this.$refs.uploadForm.submit();
    },
    // 重置
    resetFiles () {
      this.imgUrl = ''
    }

  }
}
</script>
     
<style lang="less" scoped>
/deep/.el-form {
  text-align: left;
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-divider {
    margin-bottom: 20px;
  }
}
/deep/.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>