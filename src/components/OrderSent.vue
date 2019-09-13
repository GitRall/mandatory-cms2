<template lang="html">
  <div class="order-sent-container">
    <transition name="fade" mode="out-in">
      <div class="msg-wrapper" v-if="isMounted">
        <h2>Thank you for your purchase!</h2>
        <div class="circle"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isMounted: false
    }
  },
  mounted(){
    this.isMounted = true;
  }
}
</script>

<style lang="css" scoped>
.order-sent-container{
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100vw;
  min-height: 100vh;
  background: rgb(34,38,41);
  background: linear-gradient(32deg, rgba(34,38,41,1) 16%, rgba(71,75,79,1) 82%);
  padding: 110px 150px;
  box-sizing: border-box;
}
.msg-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2{
  font-size: 3rem;
  color: #c3c8c9;
}
.circle{
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #86c232;
}
.circle::after {
  content: "";
  position: absolute;
  /* display: none; */
}
.circle::after {
  left: 28%;
  top: 48%;
  width: 24px;
  height: 48px;
  border: solid #e9f0e2;
  border-width: 0 7px 7px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg) translate(-60%, -50%);
}
.fade-enter{
  opacity: 0;
}
.fade-enter-active{
  transition: opacity 1s ease-in-out;
}
</style>
