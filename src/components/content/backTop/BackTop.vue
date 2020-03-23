<template>
  <div class="back-top">
    <img src="@img/backtop/arrow-up.png" alt="arrow-up.png">
  </div>
</template>

<script>
export default {
  name:'BackTop',
}
</script>

<style>
.back-top {
  position: fixed;
  right:30px;
  bottom:60px;
}
.back-top img {
  opacity: 0.8;
}
</style>