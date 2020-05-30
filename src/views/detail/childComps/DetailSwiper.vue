<template>
  <swiper class="detail-swiper">
      <swiper-item v-for="(image,index) in topImages" :key="index">
          <img :src="image" alt="">
      </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style>
    .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>