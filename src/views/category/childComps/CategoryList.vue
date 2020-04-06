<template>
  <div class='category-list'> 
    <div v-for="(obj,index) in categorylist" :key="index" class='category-sublist' :ref="obj.category">
      <div v-for="(itemInfo,index1) in obj.list" :key="index1" class="category-sublist-item">
        <img :src="itemInfo.img" alt="itemInfo.img" @load="imgLoad">
        <div>{{itemInfo.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORYMAP } from '@common/const'

export default {
  name:'CategoryList',
  components:{
  },
  data(){
    return {
      imgCounter:0,
      tabYs:[]
    }
  },
  props:{
    categorylist:{
      type:Array,
      default:[]
    }
  },
  mounted(){
    //console.log(this.$refs['coat'][0].offsetTop)
  },
  computed:{
    totalImageNumber(){
      let length = 0
      this.categorylist.map(item =>{
        length += item.list.length
      })
      return length
    }
  },
  methods:{
    imgLoad(){
      if(++this.imgCounter === this.totalImageNumber){
        this.getTabYs()
        this.$emit('imageLoad',this.tabYs)
      }
    },
    getTabYs(){
      let tabList = Object.keys(CATEGORYMAP)
      this.tabYs = tabList.map(item => {
        return this.$refs[item][0].offsetTop
      })
    }
  }
}
</script>

<style scoped>
.category-list {
  display:flex;
  flex-direction: column;
}
.category-sublist {
  display:flex;
  /* width:100%; */
  text-align: center;
  font-size:15px;
  flex-direction: row;
  flex-wrap: wrap;
}

.category-sublist-item {
  flex:1;
  margin:10px 20px;
}
.category-sublist-item img {
  width:100px;
}

</style>