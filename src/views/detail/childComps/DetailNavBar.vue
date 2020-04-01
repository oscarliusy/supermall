<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@img/common/back.svg" alt="back">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" :key="item" title="title-item" 
        :class="{active:index === currentIndex}"
        @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar'
export default {
  name:'DetailNavBar',
  components:{
    NavBar,
  },
  data(){
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
    }
  },
  methods:{
    titleClick(index){
      this.currentIndex = index
      //发送index用于页面滚动
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()
    },
  }
}
</script>

<style>
.title {
  display:flex;
  justify-content: space-between;
  font-size: 14px;
  width: 80%;
  margin-left:20px;
}
.title-item {
  flex:1;
}
.active {
  color:var(--color-high-text);
}
.back img{
  margin-top: 10px;
  height:28px;
  width:100%;
}
</style>