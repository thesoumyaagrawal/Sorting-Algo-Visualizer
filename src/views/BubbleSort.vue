<template>
  <div>
    <p v-if="!done">Done!</p>
    <button v-on:click="bubbleSort" :disabled="started">Start</button>
    <button v-on:click="reset">Reset</button>
    <div class="main">
      <div
        v-for="(item, index) in array"
        :key="item"
        :style="{ height: item * 20 + 'px' }"
        :class="getClassName(item, index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));
  return {
    array: array,
    active: [],
    done: array.length,
    started: false,
  };
};

export default {
  name: "bubble-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  methods: {
    getClassName(item, index) {
      if (index >= this.done) return "col done";

      return this.active.includes(item) ? "col active" : "col";
    },

    async bubbleSort() {
      this.started = true;
      var array = this.array;

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          this.active = [array[j], array[j + 1]];

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }

          await this.sleep();
        }
        this.done--;
      }
    },
    reset() {
      this.$emit("clicked");
    },
  },
};
</script>
