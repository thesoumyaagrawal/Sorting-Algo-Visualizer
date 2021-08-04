<template>
  <div class="main">
    <div
      v-for="(item, index) in array"
      :key="index"
      :class="getClassName(item, index)"
      :style="getStyling(item, index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "render-array",
  props: {
    array: Array,
    color: {
      default: "",
      type: String,
    },
    getClassName: {
      default: () => {
        return "col";
      },
      type: Function,
    },
    getStyling: {
      default: function(item) {
        if (this.color !== "") {
          return `height: ${item * 20}px; background-color:${this.color};`;
        }
        return `height: ${item * 20}px`;
      },
      type: Function,
    },
  },
};
</script>
