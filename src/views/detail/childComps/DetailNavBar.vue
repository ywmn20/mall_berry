<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="title,index in titles" class="title-item"
      @click="itemClick(index)"
      :class="{active:index===curIndex}"
      >{{title}}</div>
    </div>
  </nav-bar>
  
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      curIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.curIndex=index
      this.$emit('scrollToClick',index)
    },
    backClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display:flex;
    font-size:14px;
  }
  .title-item{
    flex:1;
  }
  .back img{
    margin-top: 10px;
  }
  .active{
    color:var(--color-high-text)
  }
</style>