<template lang="html">
  <div class="overlay">
    <button class="close-btn" type="button" name="button" @click="closeGalleryImg"><i class="material-icons close-icon">close</i></button>
    <div class="img-wrapper">
      <img :src="`http://localhost:8080/${galleryImgUrl}`" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    galleryImgUrl: String,
    closeGalleryImg: Function
  }
}
</script>

<style lang="css" scoped>
.overlay{
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
}
.img-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
}
img{
  height: 100%;
}
.close-btn{
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
}
.close-icon{
  color: rgba(255, 255, 255, 0.8);
  font-size: 6rem;
  cursor: pointer;
}
.close-icon:hover{
  color: rgba(255, 255, 255, 1);
}
</style>
