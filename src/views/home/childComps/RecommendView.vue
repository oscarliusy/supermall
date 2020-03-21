<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.image" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="item.image">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scope>
  .recommend {
    display:flex;
    width:100%;
    text-align: center;
    font-size:14px;
    padding: 10px 0 10px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex:1;
  }
  .recommend-item img {
    width:80px;
    height:80px;
    margin-bottom: 10px;
  }
</style>