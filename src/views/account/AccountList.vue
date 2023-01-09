<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">账号列表</div>
      <div class="accList">
        <el-table ref="accountTable" class="scrollBar" :data="accList" tooltip-effect="dark" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="60"></el-table-column>
          <el-table-column prop="account" label="账号" width="120"></el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="120"></el-table-column>
          <el-table-column prop="ctime" label="创建时间" width="240"></el-table-column>
          <el-table-column label="操作">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"
          prev-text="上一页" next-text="下一页">
        </el-pagination>
      </div>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([accList[1], accList[2]])">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </Panel>
    <!-- 修改信息窗口 -->
    <el-dialog title="修改账号" :visible.sync="isShow">
      <el-form :model="editData" :rules="rules">
        <el-form-item label="账号" prop="account" label-width="100px">
          <el-input v-model="editData.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup" label-width="100px">
          <el-select v-model="editData.userGroup" placeholder="请选择用户组">
            <el-option label="普通管理员" value="普通管理员"></el-option>
            <el-option label="超级管理员" value="超级管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消 修 改</el-button>
        <el-button type="primary" @click="confirmEdit">确 定 修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Panel from '@/components/panel/Panel.vue';
import { accList_api, editAcc_api, delAcc_api, batchDelAcc_api } from '@/api/users';
export default {
  components: {
    Panel
  },
  data () {
    const checkAcc = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入账号'))
      }
      // let accReg = /^1[3-9][0-9]{9}$/ //手机号正则
      let accReg = /^[A-z0-9]{2,9}$/
      if (!accReg.test(value)) {
        // callback(new Error('请输入正确手机号'))
        callback(new Error('请输入2 到 9 个字符的正确的帐号'))
      }
      // 如果所有条件都满足，调用callback通过验证
      /* this.editAcc().then(res => {
        console.log(res)
        if (res.code == 1) {
          callback(new Error(res.msg))
        } else {
          callback()
        }
      }) */
      callback()
    }
    return {
      currentPage: 1,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50, 100, 200],
      total: 0,
      accList: [],
      editData: { account: '' },
      isShow: false,
      rules: { account: [{ validator: checkAcc, trigger: 'blur' }], }
    }
  },
  created () {
    this.getAccList();
  },
  methods: {
    // 获取账号列表
    async getAccList () {
      let res = await accList_api({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      let { total, data } = res
      // console.log(res);
      // 转换时间
      data.forEach(item => {
        item.ctime = this.$utils.getTime(item.ctime)
      })
      // 赋值
      this.total = total;
      this.accList = data
    },
    // 当选择项发生变化时会触发该事件
    handleSelectionChange (val) {
      console.log(val);
    },
    // 点击编辑
    async handleEdit (row) {
      // console.log(row);
      this.editData = {
        id: row.id,
        account: row.account,
        userGroup: row.userGroup,
      }
      this.isShow = true
    },
    // 修改账号接口
    async editAcc () {
      try {
        let res = await editAcc_api(this.editData);
        return res
      } catch (error) {
        console.log(error);
      }

    },
    // 点击确认修改
    confirmEdit () {
      // console.log(this.editData);
      this.$confirm('此操作将永久更改该账号, 是否继续', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      }).then(res => {
        // console.log(res);
        this.editAcc()
        this.isShow = false;
        this.getAccList()
      }).catch(() => {
        this.isShow = false;
        this.$message.info('已取消修改！')
      })
    },
    // 点击删除账号
    handleDelete (row) {
      // 点击了
      console.log(row.id);
      this.$confirm('此操作将永久删除该账号, 是否继续', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消删除'
      }).then(async (res) => {
        try {
          // 调用删除接口
          await delAcc_api({ id: row.id })
          // 重新渲染列表
          this.getAccList()
        } catch (error) {
          console.log(error);
        }
      }).catch(() => {
        this.$message.info('已取消删除！')
      })
    },
    // pageSize 改变时会触发，每页条数改变时
    handleSizeChange (val) {
      console.log(val);
      // 修改每页条数
      this.pageSize = val
      this.getAccList();
    },
    // currentPage 改变时会触发，当前页发生改变
    handleCurrentChange (val) {
      // 获取到最新的页码
      console.log(val);
      // 修改当前页
      this.currentPage = val
      this.getAccList();
    }
  },
}
</script>

<style lang="less" scoped>
/deep/.el-table {
  max-height: 470px;
  height: 100%;
  overflow-y: scroll;
  .el-table__cell {
    text-align: center;
  }
}
/deep/.el-dialog {
  .el-input {
    width: 300px;
  }
}
</style>