<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">店铺管理</div>
      <el-button type="primary" class="btn" slot="btn" @click="confirmEdit">保存店铺信息</el-button>
      <div class="shop scrollBar">
        <el-form :model="shopData">
          <el-form-item label="店铺名称" prop="name" label-width="100px">
            <el-input v-model="shopData.name" autocomplete="off" placeholder="请输入店铺的名称"></el-input>
          </el-form-item>
          <el-form-item label="店铺公告" prop="category" label-width="100px">
            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :rows="2" v-model="shopData.bulletin"
              autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺头像" prop="avatar" label-width="100px">
            <el-upload ref="uploadAvatar" class="avatar-uploader" :action="uploadURL" :show-file-list="false"
              :on-success="uploadSuccess" :before-upload="beforeUpload">
              <img v-if="shopData.avatar" :src="baseURL+shopData.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="店铺图片" prop="pics" label-width="100px">
            <div class="pics">
              <template shopData.pics && shopData.pics.length>
                <div class="shopImgBox" v-for="(item,index) in  shopData.pics" :key="item">
                  <img class="shopimg" :src=" baseURL+item" alt="">
                  <div class="imgIcon">
                    <i class="el-icon-zoom-in" @click="seeImg(index)"></i>
                    <i class="el-icon-delete" @click="delImg(index)"></i>
                  </div>

                </div>
              </template>
              <el-upload ref="uploadShop" class="avatar-uploader" :action="uploadURL" :show-file-list="false"
                :on-success="uploadShopSuccess" :before-upload="beforeUpload">
                <i class="el-icon-plus  shopimg-icon"></i>
              </el-upload>
            </div>

            <el-dialog width="500px" :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="配送价格" prop="deliveryPrice" label-width="100px">
            <el-input type="number" v-model="shopData.deliveryPrice" autocomplete="off" placeholder="请输入商起送的价格">
            </el-input>
          </el-form-item>
          <el-form-item label="配送时间" prop="deliveryTime" label-width="100px">
            <el-input type="number" v-model="shopData.deliveryTime" autocomplete="off" placeholder="请输入商品的价格">
            </el-input>
          </el-form-item>
          <el-form-item label="配送描述" prop="description" label-width="100px">
            <el-input v-model="shopData.description" autocomplete="off" placeholder="请输入商品的价格"></el-input>
          </el-form-item>
          <el-form-item label="起送价格" prop="minPrice" label-width="100px">
            <el-input type="number" v-model="shopData.minPrice" autocomplete="off" placeholder="请输入商起送的价格">
            </el-input>
          </el-form-item>
          <el-form-item label="销量" prop="sellCount" label-width="100px">
            <el-input type="number" v-model="shopData.sellCount" autocomplete="off" placeholder="请输入商品的价格"></el-input>
          </el-form-item>
          <el-form-item label="店铺评分" prop="score" label-width="100px">
            <el-input type="number" v-model="shopData.score" autocomplete="off" placeholder="请输入商品的价格"></el-input>
          </el-form-item>
          <el-form-item label="活动" prop="supports" label-width="100px">
            <el-checkbox-group v-model="shopData.supports">
              <el-checkbox label="单人精彩套餐" name="type">{{'单人精彩套餐'}}</el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折" name="type">{{'VC无限橙果汁全场8折'}}</el-checkbox>
              <el-checkbox label="在线支付满28减5" name="type">{{'在线支付满28减5'}}</el-checkbox>
              <el-checkbox label="特价饮品八折抢购" name="type">{{'特价饮品八折抢购'}}</el-checkbox>
              <el-checkbox label="中秋特惠" name="type">{{'中秋特惠'}}</el-checkbox>
              <el-checkbox label="国庆特价" name="type">{{'国庆特价'}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="营业时间" prop="date" label-width="100px">
            <el-time-picker is-range value-format="yyyy-MM-dd HH:mm:ss" v-model="shopData.date" range-separator="至"
              start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
            </el-time-picker>
          </el-form-item>
        </el-form>
      </div>
    </Panel>
  </div>
</template>
        
<script>
import Panel from '@/components/panel/Panel.vue';
import { shopInfo_api, editShop_api } from '@/api/shop';
import { BASE_URL } from '@/utils/BASE_URL';
export default {
  components: {
    Panel
  },
  data () {
    return {
      shopData: {
        pics: [],
        supports: []
      },
      uploadURL: BASE_URL + '/shop/upload',
      baseURL: BASE_URL,
      dialogImageUrl: '',
      dialogVisible: false

    }
  },
  created () {
    this.getShopInfo();
  },
  methods: {
    async getShopInfo () {
      let { data } = await shopInfo_api();
      // console.log(data);
      // data.date.forEach(item => item = JSON.parse(item));
      this.shopData = this.$utils.deepClone(data)
    },
    // 删除店铺图片
    delImg (index) {
      this.shopData.pics.splice(index, 1);
    },
    // 查看店铺图片
    seeImg (index) {
      this.dialogImageUrl = this.baseURL + this.shopData.pics[index];
      this.dialogVisible = true;
    },
    // 点击修改店铺信息
    confirmEdit () {
      this.$confirm('该操作将永久更改该店铺信息，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(async () => {
        try {
          // console.log(this.shopData);
          let data = this.$utils.deepClone(this.shopData)
          // 处理头像图片地址
          data.avatar = this.$utils.getFileName(data.avatar)
          // 处理店铺图片地址
          if (data.pics && data.pics.length) {
            data.pics = data.pics.map(item => this.$utils.getFileName(item))
          }
          // 
          data.pics = JSON.stringify(data.pics)
          data.supports = JSON.stringify(data.supports)
          data.date = JSON.stringify(data.date)
          // console.log(data);
          let res = await editShop_api(data)
          if (res.code == 0) {
            this.getShopInfo()
          }
        } catch (error) {
          console.log(error);
        }
      }).catch(() => {
        this.$message.info('已取消修改！')
      })
    },

    /* uploadChange (file, filelist) {
      console.log(file);
      this.shopData.imgUrl = URL.createObjectURL(file.raw)
    }, */
    // 图片上传之前
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
    // 店铺头像上传成功
    uploadSuccess (res, file) {
      // console.log(res);
      this.shopData.avatar = res.imgUrl
      // console.log(this.shopData);
    },
    // 店铺图片上传成功
    uploadShopSuccess (res) {
      // console.log(res);
      this.shopData.pics.push(res.imgUrl)
      // console.log(this.shopData);
    },

  }
}
</script>
        
<style lang="less" scoped>
.shop {
  overflow-y: scroll !important;
  height: 560px;
}
/deep/.el-input,
.el-textarea {
  //width: 60%;
  max-width: 500px;
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
  object-fit: contain;
  display: block;
}

/deep/.el-dialog {
  min-width: 500px;
  margin: 0 !important;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 460px;
    height: 460px;
    object-fit: contain;
  }
}
.pics {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 660px;
  .shopImgBox,
  /deep/.el-upload {
    margin: 0 10px 10px 0;
  }
  .shopImgBox {
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    width: 150px;
    height: 150px;
    .imgIcon {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: 28px;
      background: rgba(0, 0, 0, 0.4);
      i:hover {
        color: #409eff;
      }
    }
    &:hover .imgIcon {
      display: flex;
      color: #fff;
      align-items: center;
      justify-content: space-evenly;
    }
  }
  img,
  .shopimg-icon {
    width: 150px;
    height: 150px;
    object-fit: contain;
    display: block;
  }
}
/deep/.el-upload {
  .shopimg-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .shopimg {
    width: 150px;
    height: 150px;
    object-fit: contain;
    display: block;
  }
}
/deep/.el-checkbox-group {
  max-width: 600px;
}
</style>