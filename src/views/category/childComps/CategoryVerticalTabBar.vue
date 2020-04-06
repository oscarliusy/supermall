<template>
  <div class="vertical">
    <div v-for="(item,index) in tags" :key="index" class="vertical-item"  
    :class="{active:index === currentIndex}"
    @click.passive = "tabClick(index)"
    >
      <div class="item-text">{{item}}</div>
    </div>
  </div>
</template>

<script>
import {CATEGORYMAP} from '@common/const'
export default {
  name:'CategoryVerticalTabBar',
  data(){
    return {
      currentIndex:0,
    }
  },
  computed:{
    tags(){
      return Object.values(CATEGORYMAP)
    },
    isActive(index){
      return index === this.currentIndex      
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
}
</script>

<style scoped>
  .vertical {
    display:flex;
    flex-flow: column;
    height:100%;
    width:100%;
  }
  .vertical-item{
    flex:1;
    display: flex;
    align-items: center;
    text-align: center;
    background-color: #eee8e8;
  }
  .item-text {
    width: 100%;
    height:20px;
    font-size: 18px;
  }
  .active {
    background-color: #fff;
    color:var(--color-tint);
    border-left:5px solid var(--color-tint);
    font-weight:bold;
  }
</style>