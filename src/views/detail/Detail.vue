<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
    @scrollToClick="scrollToClick"
    ref="nav"></detail-nav-bar>
    <scroll class="detail-scroll" ref="scroll" @scroll="updownScroll" 
    :probeType="3">
        
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info ref="param"  :paramInfo="paramInfo"></detail-param-info>
        <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
        <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>  

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>  
    <back-top @click.native="backClick()" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

import {listenerMixin,backToTop} from 'common/mixin'
import {debounce} from 'common/utils'

import {mapActions} from 'vuex'

export default {
    name:'detail',
    mixins:[listenerMixin,backToTop],
    data(){
        return{
            id:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommend:[],
            tabScroll:[],
            getTabScroll:null,
            deIndex:0
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        Scroll
    },
    created(){
        this.id=this.$route.params.id

        getDetail(this.id).then(res=>{
            console.log(res)
            const data=res.data.result;
            this.topImages=data.itemInfo.topImages
            this.goods=new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            this.shop=new Shop(data.shopInfo)
            this.detailInfo=data.detailInfo;
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
            if(data.rate.cRate!==0){
                this.commentInfo=data.rate.list[0]
            }
        })

        getRecommend().then(res=>{
            console.log(res.data)
            this.recommend=res.data.data.list
        })

        //给getTabScroll赋值  getTabScroll是点击标题滚动值得数组
        this.getTabScroll=debounce(()=>{
            
            this.tabScroll=[];
            this.tabScroll.push(0);
            this.tabScroll.push(this.$refs.param.$el.offsetTop)
            this.tabScroll.push(this.$refs.comment.$el.offsetTop)
            this.tabScroll.push(this.$refs.recommend.$el.offsetTop)
            this.tabScroll.push(Number.MAX_VALUE)
            console.log(this.tabScroll)
        })
    },
    mounted(){
      console.log('detail-mounted')
    },
    updated(){
        
    },
    destroyed(){
        this.$bus.$off('imgLoad',this.imgListener)
    },
    methods:{
        // ...mapActions(['addCart']),
        ...mapActions({
            add:"addCart"
        }),

        // imageLoad(){
        //     this.$refs.scroll.refresh()
        // } //没防抖

        //防抖的  DetailGoodsInfo
        imageLoad(){//refresh看混入--mixin.js
            this.refresh()

            this.getTabScroll()
        },
        scrollToClick(index){
            console.log(index)
            console.log(this.tabScroll[index])
            this.$refs.scroll.scrollTo(0,-this.tabScroll[index],100)
        },
        updownScroll(position){
            //返回顶部
          this.isShowBackTop=(-position.y)>1000

            const positionY=-position.y
            let len=this.tabScroll.length
            for(let i=0;i<=len-1;i++){
                if(this.deIndex!==i&&
                 (positionY>=this.tabScroll[i]&&positionY<this.tabScroll[i+1])){
                   this.deIndex=i;
                    this.$refs.nav.curIndex=this.deIndex;
                }
            }
        },

        addToCart(){
            console.log('^^^^^')
            //1.获取商品信息
            const product={}
            product.image=this.topImages[0]
            product.title=this.goods.title
            product.desc=this.goods.desc
            product.price=this.goods.realPrice
            product.id=this.id

            console.log(product.id)
            //2.就；商品加入到购物车
            // this.$store.commit('addCart',product)
            // this.$store.dispatch('addCart',product).then(res=>{
            //     console.log(res)

            // })
            this.add(product).then(res=>{
                console.log(this.$toast)
                this.$toast.show(res,2000)
            })
            
        },

        
    }

}
</script>

<style>
 #detail{
     position:relative;
     z-index:99;
     background-color: #fff;
     height: 100vh;
 }
 .detail-nav{
     position:relative;
     z-index:9;
     background-color: #fff;
 }
 .detail-scroll{
    height: calc(100% - 44px - 49px);
 }

</style>