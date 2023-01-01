<template>
  <div class="main">
    <Card>
      <div class="title" slot="title">账号添加</div>

    </Card>

  </div>
</template>

<script>
import Card from '@/components/Card.vue';
export default {
  data () {
    return {

    }
  },
  components: {
    Card
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
}
</style>