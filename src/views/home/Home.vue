<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <tab-control 
        :titles="titles" 
        @tabClick="tabClick" 
        ref="tabControl1" 
        class="tab-control"
        v-show="isTabFixed"
      />
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
      @scroll="contentScroll" 
      @pullingUpLoad="loadMore"
    > 
      <swiper-demo :banner="banner" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view />
      <tab-control 
        :titles="titles" 
        @tabClick="tabClick" 
        ref="tabControl2" 
      />
      <goods-list :goods="goods[currentType]['list']"/>
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
//import { debounce } from '@common/utils'
import { itemListenerMixin,backTopMixin } from '@common/mixin'

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
    // BackTop,
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
      currentType:'',
      // isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
      
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据,并初始化tabControl内数据
    this.initHomeGoods()
  },
  mounted(){
    //以下监听imageLoad的代码被移动至common/mixin：itemListenerMixin
  },
  mixins:[itemListenerMixin,backTopMixin],//混入图片加载和回到顶部组件

  destroyed(){
    console.log('home destroyed')
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    //1.保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    //2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    //事件监听相关
    //点击tab标签切换渲染数据
   
    tabClick(index){
      this.currentType = Object.keys(this.goods)[index]
      if(this.$refs.topTabControl !== undefined){
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      }
    },
    //网络请求相关
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        if(res){
          this.banner = res.data.banner.list
          this.recommends = res.data.recommend.list
        }        
      })
    },
    getHomeGoods(type){
      const page = this.goods[type]["page"] + 1;
      getHomeGoods(type,page).then(res=>{
        if(res){
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        }
       
        //重置上拉，避免多次上拉加载失效
        this.$refs.scroll.finishPullUp()
      })
      .catch(err=>{
        console.log(err)
      })
      .finally(()=>{
        //this.$refs.scroll.refresh()
      })
    },
    initHomeGoods(){
      Object.keys(this.goods).map(item =>{
        this.getHomeGoods(item)
      })
      this.currentType = Object.keys(this.goods)[0]
    },
    // backClick(){
    //   this.$refs.scroll.scrollTo(0,0,500)
    // },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000

      //2.决定tabControl是否吸顶(positon:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
      console.log('上拉加载更多')
    },
    // imageLoaded(){
    //   this.$refs.scroll && this.$refs.scroll.refresh()
    // },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
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

    /* 
    在使用浏览器原生滚动时使用
    position:fixed;
    left:0;
    right:0;
    top:0;
    z-index:9; */

  }
  /* .tab-control {
    position:sticky;
    top:44px;
    z-index: 9;
  } */

  .content {
    overflow:hidden;
    position:absolute;
    top:44px;
    bottom:49px;
    left:0;
    right:0;
  }
  .tab-control{
    position:relative;
    z-index:9;
  }


</style>