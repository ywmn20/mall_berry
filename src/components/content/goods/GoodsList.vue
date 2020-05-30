<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item='item'></goods-list-item>
      <!--！props驼峰在上面的标签里得小写加横线  -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
    components:{
        GoodsListItem
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
/* 直接拿王老师的 */
    .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>