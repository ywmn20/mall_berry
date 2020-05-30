<template>
  <div class="wrapper" ref="wrapper">
      <!-- div也可以绑定ref -->
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script>
import Bsc from 'better-scroll'

export default {
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        },
        data:{
            type:Array,
            default:()=>{
                return []
            }
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        this.scroll=new Bsc(this.$refs.wrapper,{
            click:true, //如果其他标签如div也是要被点击，那么得为true
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        if(this.probeType===2||this.probeType===3){
            this.scroll.on('scroll',position=>{
                this.$emit('scroll',position)
            })
        }
        
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                this.$emit('pullingUp')
                // console.log('bottom')
            })
        }

        
        

    },
    methods:{
        scrollTo(x,y,time=500){
            // time是运动时间 
            this.scroll&&this.scroll.scrollTo(x,y,time)
        },

        refresh(){
            console.log('---++')
            this.scroll&&this.scroll.refresh()
        },

        finishPullUp(){
            console.log('finish')
            this.scroll&&this.scroll.finishPullUp()
        },

        getY(){
            return this.scroll?this.scroll.y:0;
        }
        
    },
    watch:{
        data(){
            setTimeout(this.refresh,20)
        }
    }
}
</script>

<style>

</style>