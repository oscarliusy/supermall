<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
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

import Scroll from '@components/common/scroll/Scroll'

import { getDetail,Goods,Shop,GoodsParam } from '@network/detail'

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
    Scroll,
    
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

    }
  },
  created(){
    //保存传入的iid
    this.iid = this.$route.params.id

    //根据iid请求数据
    getDetail(this.iid).then(res=>{
      console.log(res)
      if(res){
        //获取顶部的轮播图片
        this.topImages = res.result.itemInfo.topImages
        //获取商品信息
        this.goods = new Goods(res.result.itemInfo,res.result.columns,res.result.shopInfo.services)
        //创建店铺的信息
        this.shop = new Shop(res.result.shopInfo)
        //获取商品详细信息
        this.detailInfo = res.result.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(res.result.itemParams.info,res.result.itemParams.rule)
        //取出评论的信息
        if(res.result.rate.cRate !== 0){
          this.commentInfo =res.result.rate.list[0]
        }
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },
  activated(){
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
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
  bottom:0;
}
</style>