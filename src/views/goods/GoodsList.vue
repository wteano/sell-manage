<template>
  <div class="main">
    <Card>
      <div class="title" slot="title">商品列表</div>
      <div class="content" slot="content"></div>
    </Card>
  </div>
</template>
                    
<script>
import Card from '@/components/Card.vue';
export default {
  components: {
    Card
  },
  data () {
    return {

    }
  },
}
</script>
                    
<style lang="less" scoped>

</style>