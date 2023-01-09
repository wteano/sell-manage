<template>
  <div class="layout">
    <!-- 左部导航 -->
    <app-menu></app-menu>
    <!-- 右边 -->
    <div class="right">
      <!-- 右边顶部 -->
      <app-header></app-header>
      <!-- 右边内容 -->
      <div class="rightMain scrollBar">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

import AppMenu from '@/components/appmenu/AppMenu.vue';
import AppHeader from '@/components/appheader/AppHeader.vue'
export default {
  components: {
    AppMenu,
    AppHeader,
  },
  data () {
    return {
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
}

.right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  .rightMain {
    flex: 1;
    padding: 20px;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-y: scroll;
    background-color: #ddd;
  }
}
</style>