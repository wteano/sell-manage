<template>
  <div class="card">
    <slot name="title"></slot>
    <hr>
    <slot class="content"></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
  .title {
    padding: 0 10px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    font-size: 16px;
    font-weight: 500px;
    box-sizing: border-box;
  }
  .content {
    flex: 1;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>