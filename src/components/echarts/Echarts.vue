<template>
  <!-- 解决 -->
  <div class="Chart">

  </div>
</template>

<script>

import * as echarts from 'echarts';
export default {
  data () {
    return {
      myChart: '',
      legendData: [],
      seriesData: [],
      xData: [],
    }
  },
  props: {
    chartData: {
      type: Object,
      default: () => ({})
    },

  },
  mounted () {
    // 处理数据
    this.xData = this.chartData.date
    this.legendData = this.chartData.source.map(item => item.type)
    this.seriesData = this.chartData.source.map(item => ({ name: item.type, type: 'line', data: item.data }))
    // console.log(this.chartData);
    // 调用画图表
    this.initChart()
    // 页面宽度改变，重置图表宽度
    window.addEventListener('resize', this.resizeChart)

  },
  methods: {
    initChart () {
      //获取dom节点  基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.querySelector('.Chart'));

      //配置 绘制图表的数据
      let option = {
        title: {
          text: this.chartData.title || '',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.legendData || [],
          orient: 'vertical',
          align: 'right',
          right: 0,
          top: 50
        },
        grid: {
          left: '3%',
          right: 100,
          bottom: '3%',
          containLabel: true
        },
        // 图表工具组件
        toolbox: {
          right: 0,
          // top: '10%',
          feature: {
            //图表 动态类型切换 ：
            magicType: {
              type: ['line', 'bar', 'stack']
            },
            // 编辑图表数据
            dataView: {},
            // 配置项还原。
            restore: {},
            // 保存图表为图片
            saveAsImage: {},
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData || []
        },
        yAxis: {
          type: 'value'
        },
        series: this.seriesData || []
      };

      // console.log(option);
      //传入图表数据 并 绘制图表
      option && this.myChart.setOption(option);
    },
    // 页面宽度变化，重置图表宽度
    resizeChart () {
      // console.log('全局监听了！');
      // 重置echarts图表大小，根据页面宽度改变
      this.myChart.resize();
    }
  },
  beforeDestroy () {
    // 在离开、关闭 有图表组件的页面 销毁监听的window的全局事件
    window.removeEventListener('resize', this.resizeChart)
    // console.log('销毁!');
  },
}
</script>

<style lang="less" scoped>
.Chart {
  margin: 0 auto;
  width: 98%;
  height: 100%;
  box-sizing: border-box;
  background-color: #fff;
}
</style>