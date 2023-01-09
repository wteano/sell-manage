<template>
  <div class="card">
    <div class="top">
      <slot name="title"></slot>
      <slot name="btn"></slot>
    </div>
    <el-divider></el-divider>
    <div class="content">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 5px 0;
  .top {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      padding: 0 10px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      box-sizing: border-box;
    }
    .btn {
      height: 40px;
    }
  }

  /deep/.el-divider--horizontal {
    margin: 0;
  }

  .content {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>