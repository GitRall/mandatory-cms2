<template lang="html">
  <div class="carousel-container">
    <div class="carousel-img-wrapper" >
      <img v-for="image in images" class="" :src="`http://localhost:8080/${image.img.path}`" :key="image._id" alt="" :style="{ transform: `translateX(-${carouselPosition}00%)`}">
      <span class="carousel-btn prev-btn" @click="prevClick"><i class="material-icons btn-icon">keyboard_arrow_left</i></span>
      <span class="carousel-btn next-btn" @click="nextClick"><i class="material-icons btn-icon">keyboard_arrow_right</i></span>
      <div class="indicator-wrapper">
        <span class="indicator" v-for="(image, idx) in images" :class="{'indicator-active': carouselPosition === idx}" @click="indicatorClick(idx)" :key="image._id"></span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data(){
    return {
      images: [],
      carouselPosition: 0,
      carouselTimer: null
    }
  },
  methods: {
    startTimer(){
      this.carouselTimer = setTimeout(() => {
        if(this.carouselPosition >= this.images.length - 1){
          this.carouselPosition = 0;
        }
        else{
          this.carouselPosition += 1;
        }
        this.startTimer();
      }, 10000)
    },
    restartTimer(){
      clearTimeout(this.carouselTimer);
      this.startTimer();
    },
    prevClick(){
      this.restartTimer();
      this.carouselPosition <= 0 ? this.carouselPosition = this.images.length - 1 : this.carouselPosition -= 1;
    },
    nextClick(){
      this.restartTimer();
      this.carouselPosition >= this.images.length - 1 ? this.carouselPosition = 0 : this.carouselPosition += 1;
    },
    indicatorClick(idx){
      this.restartTimer();
      this.carouselPosition = idx;
    }
  },
  created(){
    const cockpitToken = '85c29250363d95b2b63ff2c7cb2016';
    axios.post(`http://localhost:8080/api/collections/get/carousel?token=${cockpitToken}`)
      .then((res) => {
        this.images = res.data.entries;
        this.startTimer();
      })
  },
  destroyed(){
    clearTimeout(this.carouselTimer);
  }
}
</script>

<style lang="css" scoped>
.carousel-container{
  display: flex;
  justify-content: center;
  position: relative;
  /* height: calc(100vh - 140px); */
  width: 100%;
  height: 800px;
}
.carousel-img-wrapper{
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
img{
  min-width: 100%;
  height: auto;
  transition: transform 1s ease-in-out;
}
.carousel-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
}
.carousel-btn:hover{
  background: rgba(255, 255, 255, 0.3);
}
.prev-btn{
  left: 0;
  top: 50%;
  transform: translate(50px, -50%);
}
.next-btn{
  right: 0;
  top: 50%;
  transform: translate(-50px, -50%);
}
.btn-icon{
  font-size: 7rem;
  color: #fff;
  user-select: none;
  opacity: 0.3;
}
.indicator-wrapper{
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
}
.indicator{
  width: 30px;
  height: 30px;
  background: gray;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  margin: 0 15px;
  cursor: pointer;
}
.indicator:hover{
  background: rgba(255, 255, 255, 0.6);
}
.indicator-active{
  background: rgba(255, 255, 255, 0.6);
}
</style>
