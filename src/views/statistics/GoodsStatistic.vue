<template>
  <div class="stats">
    <Echarts v-if="chartData.date" :chartData="chartData"></Echarts>
  </div>
</template>

<script>
import Echarts from '@/components/echarts/Echarts.vue';
import { statsGoods_api } from '@/api/stats';
export default {
  components: {
    Echarts
  },
  data () {
    return {
      chartData: {
        title: '商品统计',
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      let { data } = await statsGoods_api();
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