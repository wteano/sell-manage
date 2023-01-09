<template>
  <div class="home">
    <div class="total">
      <div class="totalitem">
        <i class="el-icon-document-copy"></i>
        <div class="dt">
          <p>总订单数</p>
          <h3>{{total.totalOrder}}</h3>
        </div>

      </div>
      <div class="totalitem">
        <i class="iconfont icon-qian"></i>
        <div class="dt">
          <p>总销售额</p>
          <h3>{{total.totalAmount}}</h3>
        </div>

      </div>
      <div class="totalitem">
        <i class="el-icon-document"></i>
        <div class="dt">
          <p>今日订单数</p>
          <h3>{{total.todayOrder}}</h3>
        </div>

      </div>
      <div class="totalitem">
        <i class="iconfont icon-jinqian"></i>
        <div class="dt">
          <p>今日销售额</p>
          <h3>{{total.totayAmount}}</h3>
        </div>
      </div>

    </div>
    <Echarts class="totalstats" v-if="chartData.date" :chartData="chartData"></Echarts>
  </div>
</template>

<script>
import Echarts from '@/components/echarts/Echarts.vue';
import { homeData_api } from '@/api/order';
import { statsTotal_api } from '@/api/stats';
export default {
  components: {
    Echarts
  },
  data () {
    return {
      chartData: {
        title: '数据统计',
      },
      total: {}
    }
  },
  created () {
    this.getData();
    this.initChartData()
  },
  methods: {
    async getData () {
      try {
        let res = await homeData_api()
        for (const key in res) {
          if (!res[key].length) {
            this.total[key] = res[key]
          }
        }
      } catch (error) {
        console.log(error);
      }

    },
    // 图表数据
    async initChartData () {
      // 图表数据
      let { data } = await statsTotal_api()
      this.chartData = { ...this.chartData, ...data }
      // console.log(this.total, this.homeData.legend);
      // console.log(this.homeData);
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.total {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  height: 100px;
  .totalitem {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 20%;
    height: 100%;
    font-size: 20px;
    p {
      color: #aaa;
    }
    background: #fff;
    i {
      font-size: 80px;
      color: #409eff;
    }
  }

  :nth-child(4) i {
    color: #56ff40;
  }
}
.totalstats {
  height: 80%;
}
</style>