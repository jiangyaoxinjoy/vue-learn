<template>
  <div>
    <button @click="minus">-</button><br>
    当前： {{this.$store.state.count}}<br>
    <button @click="add">+</button>
    {{$store.getters.val}}
  </div>
</template>

<script>
  import * as Types from '../store/mutations-types';
  export default {
    name: "Counter",
    data() {
      return {
        step:2
      }
    },
    methods: {
      add() {
        this.$store.commit(Types.INCREMENT,this.step)
      },
      minus() {
        this.$store.commit(Types.MINUS,this.step);
      }
    }
  }
</script>

<style scoped>
button{
  -webkit-appearance: none;
  padding: 10px;
}
</style>
