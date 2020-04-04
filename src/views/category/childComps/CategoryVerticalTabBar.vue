<template>
  <div class="vertical">
    <div v-for="(item,index) in tags" :key="index">{{item}}</div>
  </div>
</template>

<script>
export default {
  name:'CategoryVerticalTabBar',
  data(){
    return {
      tags:['aaa','bbb','ccc','ddd','eee','fff','aaa','bbb','ccc','ddd','eee','fff']
    }
  },
}
</script>

<style>

</style>