<template>
  <div class="Chart">

  </div>
</template>

<script>

import * as echarts from 'echarts';
export default {
  data () {
    return {

    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },

  },
  mounted () {
    let seriesData = []
    for (let i = 0; i < this.data.legend.length; i++) {
      let obj = {
        name: this.data.legend[i],
        type: 'line',
        stack: 'Total',
        data: [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)]
      }
      seriesData[seriesData.length] = obj
    }

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('.Chart'));
    // 绘制图表
    let option = {
      title: {
        text: this.data.title || ''
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: this.data.legend
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: (this.data.xdata || [])
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData
    };

    option && myChart.setOption(option);
  },
}
</script>

<style lang="less" scoped>
.Chart {
  width: 100%;
  height: 75%;
  background-color: #fff;
}
</style>