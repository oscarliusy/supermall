<template>
  <div id="category">
    <category-nav-bar class="category-nav"/>
    <div class="main">
      <category-vertical-tab-bar class="tab-bar"/>
      <div class="wrapper" ref="wrapper">
        <ul class="content">
          <button @click="btnClick">button</button>
          <li v-for="item in 100" :key="item">分类列表{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryNavBar from './childComps/CategoryNavBar'
  import CategoryVerticalTabBar from './childComps/CategoryVerticalTabBar'

  import BScroll from 'better-scroll'
  import { getCategoryList } from '@network/category'

  export default {
    name:'Category',
    components:{
      CategoryNavBar,
      CategoryVerticalTabBar,

    },
    data(){
      return {
        scroll:null,
      }
    },
    created(){
      getCategoryList()
      .then(res=>{
        console.log(res)
      })
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:3,//可监听惯性滚动
        pullUpLoad:true
      })
      // this.scroll.on('scroll',(position)=>{
      //   console.log(position)
      // })
      this.scroll.on('pullingUp',()=>{
        console.log('upload')
        setTimeout(()=>{
          this.scroll.finishPullUp()
        },2000)

      })
    },
    methods:{
      btnClick(){
        console.log('btn click')
      },
    }
  } 
</script>

<style scoped>
  #category {
    height:100vh;
  }
  .category-nav{
    background-color: var(--color-tint);
    color: #fff;
  }
  .main {
    display:flex;
    height:calc(100% - 44px - 49px);
  }
  .tab-bar {
    flex-grow:0;
    flex-shrink: 0;
    width:25%;
    background-color: pink;
  }
  .wrapper {
    flex:1;
    width:70%;
    
    background-color: red;
    overflow: hidden;
  }
</style>