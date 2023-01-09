<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">添加商品</div>
      <div class="addGoods">
        <el-form :model="goodsData" hide-required-asterisk :rules="rules" ref="goodsForm">
          <el-form-item label="商品名称" prop="name" label-width="100px">
            <el-input v-model="goodsData.name" autocomplete="off" placeholder="请输入商品的名称"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="category" label-width="100px">
            <el-select v-model="goodsData.category" placeholder="请选择商品的分类">
              <el-option v-for="item in categories" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" prop="price" label-width="100px">
            <el-input-number v-model="goodsData.price" :precision="2" :step="0.1" :max="500"></el-input-number>
          </el-form-item>
          <el-form-item label="商品图片" prop="imgUrl" label-width="100px">
            <el-upload ref="uploadForm" class="avatar-uploader" :action="uploadURL" :show-file-list="false"
              :on-success="uploadSuccess" :before-upload="beforeUpload" :auto-upload="false" :file-list="fileList"
              :on-change="uploadChange">
              <img v-if="goodsData.imgUrl" :src="goodsData.imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <!-- <el-avatar shape="square" :size="40" :src="baseURL+props.row.imgUrl"></el-avatar> -->
          </el-form-item>
          <el-form-item label="商品描述" prop="goodsDesc" label-width="100px" placeholder="请输入商品的介绍">
            <el-input type="textarea" :rows="3" v-model="goodsData.goodsDesc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label-width="100px">
            <el-button type="primary" @click=" confirmAdd">立即添加</el-button>
          </el-form-item>
        </el-form>

      </div>
    </Panel>
  </div>
</template>
            
<script>
import Panel from '@/components/panel/Panel.vue';
import { BASE_URL } from '@/utils/BASE_URL';
import { goodsCates_api, addGoods_api, uploadGoodsImg_api } from '@/api/goods';
export default {
  components: {
    Panel
  },
  data () {
    return {
      goodsData: {
        imgUrl: ''
      },
      baseURL: BASE_URL,
      categories: [],
      uploadURL: '',
      fileList: [],
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        category: [{ required: true, message: '请选择商品的分类', trigger: ['blur', 'change'] }],
        price: [{ required: true, message: '请输入商品的价格', trigger: ['blur', 'change'] }],
        imgUrl: [{ required: true, message: '请选择商品图片', trigger: ['blur', 'change'] }],
        goodsDesc: [{ required: true, message: '请输入对商品的描述', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.uploadURL = this.baseURL + '/goods/goods_img_upload';
    this.getGoodsCates()
  },
  methods: {
    // 获取商品类型的所有名字
    async getGoodsCates () {
      let { categories } = await goodsCates_api()
      // console.log(categories);
      categories = categories.map(item => ({
        value: item.cateName,
        label: item.cateName
      }))
      this.categories = { ...categories }
    },
    // 点击添加商品
    confirmAdd () {
      // console.log(this.goodsData);
      this.$refs.goodsForm.validate(val => {
        if (val) {
          console.log(val);
          // 上传图片到服务器
          this.$refs.uploadForm.submit()
        }
      })
    },
    uploadChange (file, filelist) {
      // 预览图片,
      // URL.createObjectURL(file.raw);获取图片的地址
      this.goodsData.imgUrl = URL.createObjectURL(file.raw);
    },
    beforeUpload (file) {
      let filetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/jfif']
      // 上传的文件类型 不包含于filetypes中
      if (filetypes.indexOf((file.type).toLowerCase()) == -1) {
        this.$message.error('上传头像图片格式错误！')
        return
      }
      if (file.size >= 1024 * 1024 * 5) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return
      }
    },
    // 图片上传成功，立即添加商品到服务器
    async uploadSuccess (res, file, filelist) {
      // console.log(this.goodsData, res);
      let { imgUrl } = res;
      // 浅拷贝拷贝数据
      let data = { ...this.goodsData }
      // imgUrl: "/upload/imgs/goods_img/1673005670276.jpg"
      data.imgUrl = imgUrl.slice(imgUrl.lastIndexOf('/') + 1)
      // console.log(data.imgUrl, res);
      // console.log(data);
      try {
        await addGoods_api(data)
        this.$router.push('/goods/list')
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
            
<style lang="less" scoped>
/deep/.el-input,
.el-textarea {
  width: 60%;
  min-width: 400px;
}

/deep/.el-input-number {
  .el-input {
    width: 180px;
    min-width: auto;
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