<template>
  <div class="stats">
    <Echarts v-if="chartData.date" :chartData="chartData"></Echarts>
  </div>
</template>

<script>
import Echarts from '@/components/echarts/Echarts.vue';
import { statsOrder_api } from '@/api/stats';
export default {
  components: {
    Echarts
  },
  data () {
    return {
      // date: ["2020-06-01 00:00:00", "2020-06-10 00:00:00"],
      chartData: {
        title: '订单统计',
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let { data } = await statsOrder_api()
      // console.log(data);
      this.chartData = { ...this.chartData, ...data }

    }
  }

}
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>