<template>
  <div id="app">
    <transition
      name="fade"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
    >
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition
      name="fade"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
    >
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from '../../../test8/vue-book/src/base/Tab';

  export default {
    name: 'App',
    components: {
      Tab
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button, input {
    -webkit-appearance: none;
  }

  .content {
    position: fixed;
    width: 100%;
    top: 40px;
    overflow-y: auto;
    bottom: 50px;
  }
</style>
