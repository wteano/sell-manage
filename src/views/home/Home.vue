<template>
  <div class="main">
    <div class="total">
      <div class="totalitem"></div>
      <div class="totalitem"></div>
      <div class="totalitem"></div>
      <div class="totalitem"></div>
    </div>
    <Echarts :data="homeData"></Echarts>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue';
export default {
  data () {
    return {
      homeData: {
        title: '数据统计',
        xdata: ['2022/12/09', '2022/12/11', '2022/12/13',
          '2022/12/15', '2022/12/17', '2022/12/19', '2022/12/21'],
        legend: ['订单', '销售额', '注册人数', '管理人员']
      }
    }
  },
  components: {
    Echarts
  }
}
</script>

<style lang="less" scoped>
.total {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  height: 60px;
  .totalitem {
    width: 20%;
    height: 100%;
    background: #fff;
  }
}
</style>