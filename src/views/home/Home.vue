<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll"> 
      <swiper-demo :banner="banner" />
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"/>
      <goods-list :goods="currentGoods"/>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
import SwiperDemo from '@components/common/swiper/Swiper.vue'
import TabControl from '@components/content/tabControl/TabControl'
import GoodsList from '@components/content/goods/GoodsList'
import Scroll from '@components/common/scroll/Scroll'
import BackTop from '@components/content/backTop/BackTop'

import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import { getHomeMultidata,getHomeGoods } from '@network/home' 

export default {
  name:'Home',
  components:{
    NavBar,
    SwiperDemo,
    RecommendView,
    FeatureView, 
    TabControl, 
    GoodsList,
    Scroll,
    BackTop,
  },
  data(){
    return {
      banner:[],
      recommends:[],
      titles:["流行","新款","精选"],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentGoods:[],
      isShowBackTop:false,
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据,并初始化tabControl内数据
    this.initHomeGoods()
  },
  methods:{
    //事件监听相关
    //点击tab标签切换渲染数据
    tabClick(index){
      let _type = Object.keys(this.goods)[index]
      this.currentGoods = this.goods[_type]['list']
    },
    //网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banner = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type){
      const page = this.goods[type]["page"] + 1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        //console.log(this.goods[type].list)
      })
      .catch(err=>{
        console.log(err)
      })
    },
    initHomeGoods(){
      Object.keys(this.goods).map(item =>{
        this.getHomeGoods(item)
      })
      this.currentGoods = this.goods['pop']['list']
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500)
    },
    contentScroll(position){
      this.isShowBackTop = position.y < -1000
    },
  }
}
</script>

<style scoped>
  #home {
    /* padding-top:44px; */
    height:100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9;

  }
  .tab-control {
    position:sticky;
    top:44px;
    z-index: 9;
  }

  .content {
    overflow:hidden;
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }

</style>