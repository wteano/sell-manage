<template>
  <div class="main">
    <Panel>
      <div class="title" slot="title">商品列表</div>

      <div class="orderList">
        <el-form ref="orderForm" :model="searchData" inline label-width="80px">
          <el-form-item label="订单号">
            <el-input placeholder="请输入订单号" v-model="searchData.orderNo">
            </el-input>
          </el-form-item>
          <el-form-item label="收货人">
            <el-input size="medium" placeholder="请输入收货人" v-model="searchData.consignee">
            </el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input size="small" placeholder="请输入手机号" v-model="searchData.phone">
            </el-input>
          </el-form-item>
          <el-form-item label="订单状态">
            <el-select v-model="searchData.orderState" placeholder="请选择订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间">
            <el-date-picker :picker-options="pickerOptions" value-format="yyyy-MM-dd HH:mm:ss" v-model="date"
              type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="orderData" :row-class-name="tableRowClassName" style="width: 100%">
          <el-table-column label="订单号" prop="orderNo">
          </el-table-column>
          <el-table-column label="下单时间" prop="orderTime">
          </el-table-column>
          <el-table-column label="手机号" prop="phone">
          </el-table-column>
          <el-table-column label="收货人" prop="consignee">
          </el-table-column>
          <el-table-column label="配送地址" prop="deliverAddress">
          </el-table-column>
          <el-table-column label="送达时间" prop="deliveryTime">
          </el-table-column>
          <el-table-column label="用户备注" prop="remarks">
          </el-table-column>
          <el-table-column label="订单金额" prop="orderAmount">
          </el-table-column>
          <el-table-column label="订单状态" prop="orderState">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>

      </div>
    </Panel>
  </div>
</template>
                    
<script>
import Panel from '@/components/panel/Panel.vue';
import { orderList_api, orderDetail_api, orderSearch_api } from '@/api/order'
export default {
  components: {
    Panel
  },
  data () {
    return {
      date: [],
      searchData: {},
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      orderData: [],

    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    //  获取订单 列表数据
    async getOrderList () {
      this.searchData.currentPage = this.currentPage;
      this.searchData.pageSize = this.pageSize

      let { data, total } = await orderList_api(this.searchData)
      // console.log(data);
      data.forEach(item => {
        item.orderTime = this.$utils.getTime(item.orderTime)
        item.deliveryTime = this.$utils.getTime(item.deliveryTime)
      });

      this.orderData = data
      this.total = total
    },
    // 点击搜索订单数据
    onSearch () {
      // 时间转换，保障搜索框时间不被污染
      // console.log(this.date);
      this.searchData.date = JSON.stringify([...this.date])
      // console.log(this.searchData);
      this.getOrderList()
    },
    // 获取订单详情
    async getOrderDetail (id) {
      await orderDetail_api({ id })
    },
    // 点击查看详情
    handleClick (row) {
      console.log(row);
      this.getOrderDetail(row.id)
    },
    handleSizeChange (val) {
      this.pageSize = val;
      this.getOrderList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.getOrderList()
    },

    // 表格行颜色
    tableRowClassName ({ row, rowIndex }) {
      // console.log({ row, rowIndex });
      if (rowIndex % 2 == 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    }
  },
}
</script>
                    
<style lang="less" scoped>
/deep/.el-table {
  .warning-row {
    background: oldlace;
  }
  .success-row {
    background: #409eff;
  }
}

.el-table .pagination {
  padding: 20px 0;
  /deep/.el-pagination {
    text-align: left;
  }
}
</style>