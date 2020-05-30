<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    props:{
        banners:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components:{
        Swiper,SwiperItem
    },
    methods:{
      swiperLoad(){
        if(!this.isLoad){
          this.$emit('swiperLoad')
          this.isLoad=true
        }
      }
    }
}
</script>

<style>

</style>