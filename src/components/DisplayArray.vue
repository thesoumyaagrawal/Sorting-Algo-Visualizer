<template>
  <div v-for="item in array" :key="item" :style="{ height: item * 20 + 'px' }">
    {{ item }}
  </div>
</template>

<script>
export default {
  name: "display-array",
  props: {
    array: Array,
  },
};
</script>

<style scoped>
div {
  color: white;
  background-color: #222;
  width: 30px;
  margin-right: 5px;
}
</style>
