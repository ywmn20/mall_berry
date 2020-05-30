<template>
  <div class="toast" v-show="isShow">
      <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
    // props:{
    //     msg:{
    //         type:String,
    //         default:""
    //     },
    //     isShow:{
    //         type:Boolean,
    //         default:false
    //     }
    // }
    data(){
        return {
            msg:'',
            isShow:false
        }
    },
    methods:{
        show(msg='heiheihei',duration=2000){
            this.isShow=true;
            this.msg=msg;
        
            setTimeout(()=>{
                this.isShow=false;
                this.msg='';
            },duration)
        }
    }
}
</script>

<style scoped>
    .toast{
        z-index:8888;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
        padding:8px 10px;
        color:#fff;
        background-color:rgba(0,0,0,.55);
    }
</style>