<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">
      {{goods.title}}
    </div>
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other" >
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span> 
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
        <img :src="goods.services[index-1].icon" >
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailBaseInfo",
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },

}
</script>

<style scoped>
.base-info {
  margin-top:15px;
  padding:5px 8px;
  color:#999;
  border-bottom:5px solid #f2f5f8
}
.info-title {
  font-size:20px;
  color:black;
  margin-bottom: 10px;
}
.n-price {
  font-size:30px;
  color:var(--color-high-text);
}
.o-price {
  text-decoration: line-through;
  margin-left: 5px;
  margin-right:10px;
}
.discount {
  background-color:var(--color-high-text);
  color:white;
  border-radius:10px;
  padding:5px 5px;
  position:relative;
  top:-10px;
}
.info-other{
  display:flex;
  justify-content: space-between;
  border-bottom:5px solid #f2f5f8;
  padding:20px;
}
.info-other span{
  flex:1;
  text-align: center;
}
.info-service{
  display:flex;
  padding:20px 0;
}
.info-service-item {
  flex:1;
  text-align: left;
}

.info-service-item img{
  width:12%;
}
</style>