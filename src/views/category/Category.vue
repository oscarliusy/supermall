<template>
  <div id="category">
    <category-nav-bar class="category-nav"/>
    <div class="main">
      <category-vertical-tab-bar class="tab-bar" @tabClick="verticalTabClick"/>
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" 
      > 
       <category-list :categorylist="categoryList" ref="categorylist" @imageLoad="imageLoad"/>
      </scroll>
      <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
    </div>
  </div>
</template>

<script>
  import CategoryNavBar from './childComps/CategoryNavBar'
  import CategoryVerticalTabBar from './childComps/CategoryVerticalTabBar'
  import CategoryList from './childComps/CategoryList'

  import Scroll from '@components/common/scroll/Scroll'
  import BackTop from '@components/content/backTop/BackTop'
  import { getCategoryList } from '@network/category'
  import { backTopMixin } from '@common/mixin'

  export default {
    name:'Category',
    components:{
      CategoryNavBar,
      CategoryVerticalTabBar,
      CategoryList,
      Scroll,
      BackTop
    },
    data(){
      return {
        categoryList:[],
        tabYs:[]
      }
    },
    mixins:[backTopMixin],
    created(){
      getCategoryList()
      .then(res=>{
        //console.log(res)
        this.categoryList.push(...res.categoryList)
      })
    },
    mounted(){
  
    },
    methods:{
      verticalTabClick(index){
        this.$refs.scroll.scrollTo(0,-this.tabYs[index],200)
      },
      contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000
      },
      imageLoad(tabYs){
        this.tabYs = tabYs
      }
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
    
  }
 .content {
    overflow:hidden;
    position:relative;
  }
</style>