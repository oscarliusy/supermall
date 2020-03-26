<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">
      <span>{{detailInfo.detailImage[0].key}}</span>
    </div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" :src="item" alt="" @load="imgLoad">  
    </div>
  </div>
</template>

<script>
export default {
  name:'DetailGoodsInfo',
  props:{
    detailInfo:{
      type:Object,
      default:{}
    }
  },
  data(){
    return {
      counter:0,
      imagesLength:0
    }
  },
  methods:{
    imgLoad(){
      //判断，所有图片都加载完了，那么进行一次回调就可以了
      if(++this.counter === this.imagesLength){
        this.$emit('imageLoad')
      }
    },
  },
  watch:{
    detailInfo(){
      //获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style>
.goods-info {
  padding:10px 0;
  border-bottom: 5px solid #f2f5f8;
}

.goods-info .desc{
  font-size:20px;
  margin:20px;
  border-top: 1px solid #716e6eba;
  padding-top:20px;
}

.info-key {
  font-size:20px;
  margin:20px;
  display:flex;
  border-bottom: 1px solid #716e6eba;
  padding-bottom:20px;
}
.info-key span {
  flex:1;
  
}
.info-key .info-key-right{
  width:50%;
  background-color: black;
}

.info-list img{
  width:100%;
}


</style>