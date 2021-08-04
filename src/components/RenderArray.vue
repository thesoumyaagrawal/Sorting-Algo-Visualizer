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
    max: {
      default: undefined,
      type: Number,
    },
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
        if (!this.max) {
          this.max = Math.max(...this.array);
        }

        let height = 0;
        if (item !== 0) {
          height = (200 / this.max) * item + 20;
        }

        if (this.color !== "") {
          return `height: ${height}px; background-color:${this.color};`;
        }
        return `height: ${height}px`;
      },
      type: Function,
    },
  },
};
</script>

<style scoped>
.col {
  width: 25px;
  color: white;
  background: #222;
  margin-right: 5px;
}

.active {
  background: #6b9b37;
}

.done {
  background: #ffeb3b;
}

.current {
  background: #f44336;
}

.smaller {
  background: #9c27b0;
}
</style>
