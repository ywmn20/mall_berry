<template>
  <grid-view :cols="1" :lineSpace="15" :v-margin="20">
    <!-- 还得调试，这给1上面的小图才能3列 -->
    <goods-list-item v-for="(item, index) in categoryDetail" :key="index" :goods-item="item"></goods-list-item>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsListItem from 'components/content/goods/GoodsListItem'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsListItem
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
