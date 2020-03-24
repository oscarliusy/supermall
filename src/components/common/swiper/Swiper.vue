<template>
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
  >
    <swiper-slide 
      class="swiper-slide" 
      v-for="item in banner"
      :key="item.image"
      >
      <img :src="item.image" alt="item.image" @load="imageLoad">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"/>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name:'SwiperDemo',
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
  //这里需要Home传图片链接Array进来
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
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
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    },
  },
}
</script>

<style>
.swiper-slide {
  width:414px;
  height:215px;
}
img {
  max-width:100%;
  max-height: 100%;
}
</style>