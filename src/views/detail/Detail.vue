<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailnavbar"/>
    <scroll class="detail-content" ref="scroll" 
      :probe-type="3" @scroll="contentScroll"
    >
      <!-- 属性：topImages  传入值：top-images -->
      <detail-swiper ref="swiper" :top-images="topImages"/>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar class="detail-bottom-bar" @addCart="addToCart" />
    <!-- <toast :message="message" :show="show" /> -->
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
import GoodsList from '@components/content/goods/GoodsList'
// import Toast from '@components/common/toast/Toast'

import Scroll from '@components/common/scroll/Scroll'

import { debounce } from '@common/utils'
import { itemListenerMixin,backTopMixin } from '@common/mixin'

import { getDetail,getRecommend,Goods,Shop,GoodsParam } from '@network/detail'

import { mapActions } from 'vuex'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    // Toast,
    
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      themes:['swiper','params','comment','recommend'],
      getThemeTopY: null,
      // message:'',
      // show:false,
    }
  },
  created(){
    //1.保存传入的iid
    this.iid = this.$route.params.id

    //2.根据iid请求数据
    getDetail(this.iid).then(res=>{
      //console.log(res)
      if(res){
        let data = res.result
        //获取顶部的轮播图片
        this.topImages = data.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //创建店铺的信息
        this.shop = new Shop(data.shopInfo)
        //获取商品详细信息
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //取出评论的信息
        if(data.rate.cRate !== 0){
          this.commentInfo =data.rate.list[0]
        }
        //获取加载后组件的位置坐标（无法实时更新图片位置，放弃）
        // this.$nextTick(()=>{
        //   //根据最新的数据，对应的DOM是已经被渲染出来
        //   //但是图片依然是没有加载完（目前的offsetTop没有包含图片）
        //   //offsetTop值不对，都是因为图片的问题
        //   this.updateThemeTopYs()
        // })
      }
    })
    .catch(err=>{
      console.log(err)
    })

    //3.请求推荐数据
    getRecommend()
    .then(res=>{
      //console.log(res.data.list)
      this.recommends = res.data.list
    })
    .catch(err=>{
      console.log(err)
    })

    //4.给getThemeTopY赋值（对给this.themeTopYs赋值的操作进行防抖）
    this.getThemeTopYsByDebounce = debounce(()=>{
      this.updateThemeTopYs()
    })
  },
  mounted(){
    //以下监听imageLoad的代码被移动至common/mixin：itemListenerMixin
  },
  mixins:[itemListenerMixin,backTopMixin],
  activated(){
   
  },
  updated(){
    //获取四个组件的offsetTop用于跳转
    //this.updateThemeTopYs()
  },
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods:{
    ...mapActions(['addCart']),
    imageLoad(){
      //this.$refs.scroll.refresh()
      this.newRefresh() //newRefresh来自于mixin的混入，实现防抖的复用
      //3.图片加载后，利用debounce防抖更新快捷导航的位置
      this.getThemeTopYsByDebounce()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    updateThemeTopYs(){
      this.themeTopYs = []
      this.themeTopYs = this.themes.map(item=>{
        return this.$refs[item].$el.offsetTop
      })
      this.themeTopYs.push(Number.MAX_VALUE)
     console.log(this.themeTopYs)
    },
    contentScroll(position){
      //1.获取Y值
      const positionY = -position.y
      
      //2.postionY和主题中值进行对比
      //[0,2222,3333,4444,非常大的值]
      //当positionY在0和2222之间时，index=0
      //2222-3333，index=1
      //3333-4444，index=2
      //大于4444，index=3
      this.themeTopYs.map((item,index)=>{
        if(index === this.themeTopYs.length-1 || this.$refs.detailnavbar.currentIndex === index) return
        else if(positionY >= this.themeTopYs[index] && positionY < this.themeTopYs[index+1]){
          this.$refs.detailnavbar.currentIndex = index
        }
      })

      //2.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000

    },
    addToCart(){
      //1.获取商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
     
      //2.将商品添加到购物车中(1.Promise, 2.mapActions)
      // this.$store.dispatch('addCart',product)
      // .then(res=>{
      //   console.log(res)
      // })
      this.addCart(product).then(res=>{
        // this.show = true
        // this.message = res
        // setTimeout(()=>{
        //   this.show = false
        //   this.message = ''
        // },2000)

        //封装后效果
        this.$toast.show(res,1500)
        //console.log(this.$toast)
  
      })

    },
  }
}
</script >

<style scoped>
#detail {
  position:relative;
  z-index:9;
  background-color:#fff;
  height:100vh;
}

.detail-nav {
  position:relative;
  z-index:9;
  background-color: #fff;
}
.detail-content {
  overflow:hidden;
  position:absolute;
  top:44px;
  left:0;
  right:0;
  bottom:58px;
}
</style>