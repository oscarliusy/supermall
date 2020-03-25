<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import { getDetail,Goods,Shop } from '@network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},

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
      }
    })
    .catch(err=>{
      console.log(err)
    })
  },
  activated(){

  }
}
</script>

<style>

</style>