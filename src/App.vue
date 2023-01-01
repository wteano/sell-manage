<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main {
  width: 100%;
  height: 100%;
}
/* 谷歌无滚动条 */
.noscrollBar::-webkit-scrollbar {
  display: none;
}
a {
  text-decoration: none !important;
}
/* 谷歌滚动条样式 */
.scrollBar::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

.scrollBar::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.scrollBar::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
