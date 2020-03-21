<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">
        购物街
      </div>
    </nav-bar>
    <swiper-demo :banner="banner" />
    <recommend-view :recommends="recommends"/>
    <feature-view />
    <h2>首页</h2>
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
import { getHomeMultidata } from '@network/home'
import SwiperDemo from '@components/common/swiper/Swiper.vue'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

export default {
  name:'Home',
  components:{
    NavBar,
    SwiperDemo,
    RecommendView,
    FeatureView,  
  },
  data(){
    return {
      banner:[],
      recommends:[],
    }
  },
  created(){
    //1.请求多个数据
    getHomeMultidata().then(res=>{
      this.banner = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  },
  methods:{
  }
}
</script>

<style>
  #home {
    padding-top:44px;
    padding-bottom: 100px;
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
</style>