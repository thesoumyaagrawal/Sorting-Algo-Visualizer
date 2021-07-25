<template>
  <div
    v-for="(item, index) in array"
    :key="item"
    :style="{ height: item * 20 + 'px' }"
    :class="getClassName(item, index)"
  >
    {{ item }}
  </div>
</template>

<script>
export default {
  name: "display-array",
  props: {
    array: Array,
    active: Array,
    done: Number,
  },
  methods: {
    getClassName(item, index) {
      if (index >= this.done) return "done";

      return this.active.includes(item) ? "active" : "";
    },
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

div.active {
  background-color: #42b983;
}

div.done {
  background-color: rgb(204, 216, 29);
}
</style>
