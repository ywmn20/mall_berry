import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const";

export const listenerMixin={
    data(){
        return {
            imgListener:null,
            refresh:null
        }
    },
    mounted(){
        this.refresh=debounce(this.$refs.scroll.refresh,500)
        this.imgListener=()=>{
            this.refresh()}// 闭包导致refresh不会被销毁
        this.$bus.$on('imageLoad',this.imgListener)
        console.log('mixin-mounted')
    }
}

export const backToTop={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false,
            
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0)
        },
        
        
    
    }
}




export const tabControlMixin = {
    data: function () {
      return {
        currentType: POP
      }
    },
    methods: {
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = POP
            break
          case 1:
            this.currentType = NEW
            break
          case 2:
            this.currentType = SELL
            break
        }
        console.log(this.currentType);
      }
    }
  }