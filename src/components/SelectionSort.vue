<template>
  <div>
    <p v-if="i == array.length">Done!</p>
    <button v-on:click="selectionSort" :disabled="started">Start</button>
    <div class="main">
      <div
        v-for="(item, index) in array"
        :key="'main-' + index"
        :style="{ height: item * 20 + 'px' }"
        :class="getClassName(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selection-sort",
  data() {
    return {
      array: [],
      i: -1,
      minimum: -1,
      active: -1,
      started: false,
    };
  },
  methods: {
    getClassName(index) {
      let className = "col ";

      if (index < this.i) {
        return className + "done";
      }

      if (index == this.minimum) {
        return className + "current";
      }

      if (index == this.active) {
        return className + "active";
      }

      return className;
    },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async selectionSort() {
      this.started = true;
      let array = this.array;

      for (this.i = 0; this.i < array.length; this.i++) {
        await this.sleep(1000);

        this.minimum = this.i;
        const i = this.i;

        for (let j = i; j < array.length; j++) {
          if (array[j] < array[this.minimum]) {
            this.minimum = j;
          }
          this.active = j;
          await this.sleep(500);
        }
        [array[i], array[this.minimum]] = [array[this.minimum], array[i]];

        this.minimum = -1;
        this.active = -1;
      }
    },
  },
  created() {
    this.array = _.shuffle(_.range(1, 11));
  },
};
</script>
