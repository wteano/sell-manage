<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">商品列表</div>
      <div class="goodsList">
        <el-table :data="goodsData" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <!-- <el-row>
                <el-col :span="12">
                  <div>商品 I D :{{props.row.id}}</div>
                </el-col>
                <el-col :span="12">
                  <div>商品名称:{{ props.row.name }}</div>
                </el-col>
              </el-row> -->
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 I D : ">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称:">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="商品分类:">
                  <span>{{ props.row.category}}</span>
                </el-form-item>
                <el-form-item label="商品价格:">
                  <span>￥{{ props.row.price }}</span>
                </el-form-item>
                <el-form-item label="商品图片:">
                  <el-avatar shape="square" :size="40" :src="props.row.imgUrl"></el-avatar>
                </el-form-item>
                <el-form-item label="创建时间:">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>

                <el-form-item label="商品评价:">
                  <span>{{ props.row.rating }}个</span>
                </el-form-item>

                <el-form-item label="商品销量:">
                  <span>{{ props.row.sellCount }}份</span>
                </el-form-item>
                <el-form-item label="商品描述:">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="商品名称" prop="name">
          </el-table-column>
          <el-table-column label="所属分类" prop="category">
          </el-table-column>
          <el-table-column label="商品价格" prop="price">
          </el-table-column>
          <el-table-column label="商品图片" min-width="120">
            <template slot-scope="scope">
              <el-avatar shape="square" :size="100" :src="scope.row.imgUrl"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[5,10, 20, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </Panel>
    <!-- 修改信息窗口 -->
    <el-dialog title="修改商品" :visible.sync="isShow">
      <el-form :model="editData" hide-required-asterisk :rules="rules" ref="editForm">
        <el-form-item label="商品名称" prop="name" label-width="100px">
          <el-input v-model="editData.name" autocomplete="off" placeholder="请输入商品的名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category" label-width="100px">
          <el-select v-model="editData.category" placeholder="请选择商品的分类">
            <el-option v-for="item in categories" :key="item.cateName" :label="item.cateName" :value="item.cateName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" label-width="100px">
          <el-input-number v-model="editData.price" :precision="2" :step="0.1" :max="500"></el-input-number>
        </el-form-item>
        <el-form-item label="商品描述" prop="goodsDesc" label-width="100px" placeholder="请输入商品的介绍">
          <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" :rows="3" v-model="editData.goodsDesc"
            autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="imgUrl" label-width="100px">
          <el-upload ref="uploadForm" class="avatar-uploader" :action="uploadURL" :show-file-list="false"
            :on-success="uploadSuccess" :before-upload="beforeUpload" :auto-upload="false" :file-list="fileList"
            :on-change="uploadChange">
            <img v-if="editData.imgUrl" :src="editData.imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-avatar shape="square" :size="40" :src="baseURL+props.row.imgUrl"></el-avatar> -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
                    
<script>
import Panel from '@/components/panel/Panel.vue';
import { BASE_URL } from '@/utils/BASE_URL';
import { goodsList_api, goodsCates_api, editGoods_api, delGoods_api } from '@/api/goods';
export default {
  components: {
    Panel
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      baseURL: BASE_URL,
      goodsData: [],
      isShow: false,
      categories: [],
      editData: { imgUrl: '' },
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
    this.getGoodsList();
    this.uploadURL = this.baseURL + '/goods/goods_img_upload';
    /* this.$bus.$on('curtPage', curtPage => {
      console.log(curtPage);
      this.currentPage = curtPage
      this.getGoodsList();
      // this.getGoodsList(curtPage)
    }) */

  },
  methods: {
    // 获取商品列表
    async getGoodsList (curtPage, pgSize) {

      let { total, data } = await goodsList_api({
        // 存在传递的参数
        currentPage: curtPage ? curtPage : this.currentPage,
        pageSize: pgSize ? pgSize : this.pageSize,
      })
      // console.log(data);
      data.forEach(item => {
        item.ctime = this.$utils.getTime(item.ctime);
        item.imgUrl = this.baseURL + item.imgUrl
      });
      this.total = total;
      this.goodsData = data
    },
    // 提交修改接口
    async editGoods (data) {
      await editGoods_api(data)
      this.isShow = false;
      this.getGoodsList(this.currentPage, this.pageSize)
    },
    // 获取商品类型的所有名字
    async getGoodsCates () {
      let { categories } = await goodsCates_api()
      // console.log(categories);
      this.categories = { ...categories }
    },
    // 点击挑战修改商品窗口
    handleEdit (row) {
      // 第一种
      this.isShow = true;
      this.getGoodsCates()
      this.editData = { ...row }
      // 第二种
      this.$router.push('/goods/edit?id=' + row.id)
      /* // 传递当前页去修改商品页面
      this.$bus.$emit('curt', this.currentPage) */
    },
    // 提交商品的修改
    confirmEdit () {
      console.log(this.editData);
      this.$refs.editForm.validate(val => {
        if (val) {
          // console.log(val);
          let data = {};
          if (this.editData.imgUrl.indexOf('blob:http:') == -1) {
            data = { ...this.editData }
            data.imgUrl = data.imgUrl.slice(data.imgUrl.lastIndexOf('/') + 1)
            // console.log(data);
            this.editGoods(data)
          } else {
            this.$refs.uploadForm.submit();
          }

        } else {
          // console.log(val);
        }
      })
    },
    // 删除商品
    handleDelete (row) {
      // console.log(row);
      this.$confirm('该操作将永久删除该商品，是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(async res => {
        await delGoods_api({ id: row.id })
        this.getGoodsList()
      }).catch(err => {
        this.$message.info('已取消删除')
      })
    },
    // 图片更改时
    uploadChange (file, filelist) {
      // 预览图片,
      // URL.createObjectURL(file.raw);获取图片的地址
      this.editData.imgUrl = URL.createObjectURL(file.raw);
      return true
    },
    //  图片上传之前
    beforeUpload (file) {
      let filetypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/jfif']
      // 上传的文件类型 不包含于filetypes中
      if (filetypes.lastIndexOf((file.type).toLowerCase())) {
        this.$message.error('上传头像图片格式错误！')
        return
      }
      if (file.size >= 1024 * 1024 * 5) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
        return
      }
    },
    // 图片上传成功，立即添加商品到服务器
    uploadSuccess (res) {
      let data = { ...this.editData }
      // 商品图片后端返回地址处理
      data.imgUrl = res.imgUrl.slice(res.imgUrl.lastIndexOf('/') + 1)
      // console.log(data);
      this.editGoods(data)
    },
    // 每页数据条数改变
    handleSizeChange (val) {
      this.pageSize = val;
      this.getGoodsList()
    },
    // 当前页改变
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getGoodsList()
    }
  },
}
</script>
                    
<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
  display: flex;
  flex-wrap: wrap;

  &:nth-child(n) {
    padding: 0 0 0 58px;
  }
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin: 0;
  min-width: 50%;
  // /deep/.el-form-item__content {
  //height: 40px;
  //}
}

/deep/.el-dialog {
  min-width: 500px;
  margin: 0 !important;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .el-input,
  .el-textarea {
    min-width: 300px;
    max-width: 60%;
  }
}

/deep/.el-input-number {
  .el-input {
    width: 180px;
    min-width: 180px;
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
  width: 100px;
  height: 100px;
  display: block;
}
.pagination {
  padding: 20px 0;
  /deep/.el-pagination {
    text-align: left;
  }
}
</style>