<template>
  <div>
    <Echarts :data="Data"></Echarts>
  </div>
</template>

<script>
import Echarts from '@/components/Echarts.vue';
export default {
  data () {
    return {
      Data: {
        title: '商品统计',
        xdata: ['2022/12/09', '2022/12/11', '2022/12/13',
          '2022/12/15', '2022/12/17', '2022/12/19', '2022/12/21'],
        legend: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
      }
    }
  },
  components: {
    Echarts
  }
}
</script>

<style lang="less" scoped>
div {
  width: 100%;
  height: 100%;
}
</style>