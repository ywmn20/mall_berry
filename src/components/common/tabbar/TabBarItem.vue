<template>
  <div class="tab-bar-item" @click="pageSwitch()">
    <!-- <slot name="item-icon" v-if="!isActive"></slot>
    <slot name="item-icon-active" v-else></slot> -->

    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>   -->

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>

</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'pink'//不写时的默认值
    }
  },
  data(){
    return{
      // isActive:true
    }
  },
  methods:{
    pageSwitch(){
      this.$router.push(this.path)
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path)!=-1;
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
    flex:1;
    text-align: center;
    height: 49px;
    font-size:14px;
  }

  .tab-bar-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }
  /* .active{
    color:red;
  } */
</style>
