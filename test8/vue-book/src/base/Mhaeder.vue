<template>
    <div class="header">
        <slot></slot>
      <i v-if="back" class="iconfont icon-fanhui" @click="goback"></i>
    </div>
</template>

<script>
    export default {
        name: "Mhaeder",
        props:{
          back: {
            type: Boolean,
            default: false
          }
        },
        data() {
            return {}
        },
      methods: {
        goback() {
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped lang="less">
.header{
  position: fixed;
  top: 0;
  left: 0;
  background-color: lightskyblue;
  height: 40px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
  .icon-fanhui{
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
