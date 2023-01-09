<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">商品分类</div>
      <el-button type="primary" class="btn" @click="isShow=true" slot="btn">添加分类</el-button>

      <!-- 列表 -->
      <div class="catelist">
        <el-table :data="cateList">
          <el-table-column label="序号" width="120" prop="id"></el-table-column>
          <el-table-column label="分类名称" prop="cateName">
            <template slot-scope="scope">
              <span v-show="!scope.row.isEdit">{{scope.row.cateName}}</span>
              <el-input v-show="scope.row.isEdit" v-model="scope.row.cateName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.state==0?'禁用':'启用'" placement="top" effect="light">
                <el-switch :disabled="!scope.row.isEdit" v-model="scope.row.state" active-color="#13ce66"
                  inactive-color="#ff4949" :active-value="1" :inactive-value="0">
                </el-switch>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" v-show="!scope.row.isEdit" @click="editCate(scope.row)">编辑</el-button>
              <el-button size="mini" v-show="scope.row.isEdit" type="primary" @click="editedCate(scope.row)">完成
              </el-button>
              <el-button size="mini" type="danger" @click="delCate(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[5, 10,20, 50]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </Panel>

    <el-dialog title="添加分类" :visible.sync="isShow">
      <el-form :model="addCate" hide-required-asterisk status-icon :rules="rules" ref="addCateForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cateName">
          <el-input type="text" v-model="addCate.cateName" autocomplete="off" placeholder="请输入要添加的商品分类名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="state">
          <template>
            <el-tooltip :content="addCate.state==0?'禁用':'启用'" placement="top" effect="light">
              <el-switch v-model="addCate.state" active-color="#13ce66" inactive-color="#ff4949" :active-value="1"
                :inactive-value="0">
              </el-switch>
            </el-tooltip>
          </template>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">立即添加</el-button>
          <el-button @click="isShow=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
        
<script>
import Panel from '@/components/panel/Panel.vue';
import { cateList_api, addCate_api, editCate_api, delCate_api } from '@/api/goods';
export default {
  components: {
    Panel
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      cateList: [],
      isShow: false,
      rules: {
        cateName: [{ required: true, message: '请输入要添加的商品分类名称', trigger: 'blur' },
        { min: 2, max: 5, message: '商品分类名称不符合规则', trigger: 'blur' }],
        state: [{ type: 'number', }]
      },
      addCate: {}
    }
  },
  created () {
    this.getCateList()
  },
  methods: {

    submitForm () {
      this.$refs.addCateForm.validate(async val => {
        if (val) {
          try {
            await addCate_api(this.addCate)
            this.isShow = false
          } catch (error) {
            console.log(error);
          }
        }
      })
    },
    async getCateList () {
      let { total, data } = await cateList_api({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      data.forEach(item => {
        item.isEdit = false
      });
      this.total = total
      this.cateList = data
      // console.log(data);
    },
    //
    editCate (row) {
      // console.log(row);
      // 修改当前行的状态为可编辑
      row.isEdit = true
    },
    // 提交修改
    editedCate (row) {
      // console.log(row);
      this.$confirm('该操作将永久更改该商品分类名称，是否继续', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async res => {
        // console.log(res);
        await editCate_api(row)
      }).catch(res => {
        // console.log(res);
        this.$message.info('已取消更改！')
      })
      // 修改当前行的状态为不可编辑
      row.isEdit = false
    },
    delCate (row) {
      console.log(row);
      this.$confirm('该操作将永久删除该商品分类名称，是否继续', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(async res => {
        // console.log(res);
        await delCate_api({ id: row.id })
        this.getCateList();
      }).catch(res => {
        // console.log(res);
        this.$message.info('已取消删除！')
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getCateList()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getCateList()
    }
  }
}
</script>
        
<style lang="less" scoped>
/deep/.el-table__cell {
  height: 75px;
}
</style>