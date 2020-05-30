<template>
  <div id="home">
      <nav-bar class="home-nav"><div slot="center">草莓街</div></nav-bar>

      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick"
       class="tab-control"
       v-show="isTab"
       ref="tabControl1"
       ></tab-control>

      <scroll class="scrollCon"
      ref="scroll"
      :probe-type="3"
      @scroll="showIcon"
      :pull-up-load="true"
      @pullingUp="loadMore"
      
      >
        <home-swiper :banners="banners" @swiperLoad="swiperLoad" />
        <recommend :recommends="recommends"></recommend>
        <feature-view></feature-view>
        <tab-control :titles="['流行','新款','精选']"
         @tabClick="tabClick"
         ref="tabControl2"
         ></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  
  import HomeSwiper from './childComps/HomeSwiper'
  import Recommend from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  

  import {getHomeMultidata,getHomeGoods} from 'network/home'

  import {listenerMixin,backToTop} from 'common/mixin'
  

  export default {
    name:'home',
    mixins:[listenerMixin,backToTop],
    components:{
      HomeSwiper,
      Recommend,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        curType:'pop',
        
        tabOffsetTop:0,
        isTab:false,
        originY:0
      }
    },
    computed:{
      showGoods(){
        return this.goods[this.curType].list
      }
      
    },
    destroyed(){
      console.log('home destroyed')
    },
    // 由于封装的轮播图和better-scroll两者都有的translate有冲突才会记不住位置，除了下面的方案
    //还可以用封装的轮播图的定时器--出去停，进来开
    activated(){//钩子函数
      this.$refs.scroll.scrollTo(0,this.originY,0)
      
      //刷新保证不会出错
      this.$refs.scroll.refresh()
    },
    deactivated(){
      this.originY=this.$refs.scroll.getY()
      // console.log(this.originY)
      this.$bus.$off('imgLoad',this.imgListener)
    },
    created(){
      this.getHomeMultidata()

      this.getHomeGoods('pop')      
      this.getHomeGoods('new')      
      this.getHomeGoods('sell') 
       
    },
    mounted(){
      console.log('home-mounted')
    },
    methods:{
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
        // console.log(res);
          this.banners=res.data.data.banner.list;
          this.recommends=res.data.data.recommend.list;
        })
      },
      
      getHomeGoods(type){
        const page=this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
          // console.log(res)
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page+=1

          this.$refs.scroll.finishPullUp()
        })
      },



      tabClick(index){
        switch(index){
          case 0:
            this.curType='pop'
            break
          case 1:
            this.curType='new'
            break
          case 2:
            this.curType='sell'
            break
        }
        this.$refs.tabControl1.curIndex=index;
        this.$refs.tabControl2.curIndex=index;
      },

      showIcon(position){
          //返回顶部
          this.isShowBackTop=(-position.y)>1000

          //上面的tab栏是否出现
          this.isTab=(-position.y)>this.tabOffsetTop
      },

      
      loadMore(){
        this.getHomeGoods(this.curType)
      },

      swiperLoad(){
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      }


      

      
      
    }
  }
</script>

<style>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    /* 100vh视口高度 */
    position:relative;
  }
  .home-nav{
    background-color:var(--color-tint);
    color:#fff;

/* 用了better-scroll后有固定区域，导航栏可以不用fixed */
    /* position:fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:99;  */
  }
  /* .tab-control { */
    /* position: sticky; */
    /* 用了better-scroll后 position: sticky;失效*/
    /* top: 44px; */
    /* z-index:88 */
  /* } */

/* 有bug，不如下面的方法 */
  /* .scrollCon{
    height:calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .scrollCon{
    overflow: hidden;
    position:absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control{
    position:relative;
    z-index:99;
  }
</style>
