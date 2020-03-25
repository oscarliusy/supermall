<template>
  <swiper
    ref="detailSwiper"
    :options="swiperOptions"
    class="detail-swiper"
  >
    <swiper-slide 
      class="swiper-item" 
      v-for="item in topImages"
      :key="item"
      >
      <img :src="item" :alt="item" >
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"/>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name:'DetailSwiper',
  data(){
    return {
      swiperOptions:{
        pagination: {
          el: '.swiper-pagination'
        },
        slidesPerView:1,
        autoplay:{
          delay:3000,
          disableOnInteraction:false
        },
        spaceBetween:30,
        loop:true,
        isLoad:false,
      }
    }
  },
  //这里Detail传图片链接Array进来
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.detailSwiper.$swiper
    }
  },
  mounted() {
    this.swiper.slideTo(3, 1000, false)
  },
  components:{
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  methods:{

  },
}
</script>

<style scoped>
.swiper-item{
  overflow: hidden;
  height: 400px;
}
.swiper-item img {
  width: 100%;
}

</style>