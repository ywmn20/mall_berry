<template>
  <div class="cart-list">
      <scroll class="cart-list-con" ref="scroll">
           <cart-list-items v-for="item,index in cartList" :key="index"
           :item-info="item"></cart-list-items>
           
      </scroll>
                   
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from 'components/common/scroll/Scroll'
import CartListItems from './CartListItems'

export default {
    components:{
        Scroll,
        CartListItems
    },
    computed:{
        ...mapGetters(['cartList'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
    .cart-list{
        height:calc(100% - 44px - 49px - 40px)
    }
    .cart-list-con{
        height:100%
    }
</style>