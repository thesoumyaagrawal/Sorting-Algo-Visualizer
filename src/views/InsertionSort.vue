<template>
  <div>
    <p v-if="done === array.length">Done!</p>
    <button v-on:click="insertSort" :disabled="started">Start</button>
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
    <div class="main">
      <div
        v-for="(item, index) in sorting"
        :key="'sorting-' + index"
        :style="{ height: item * 20 + 'px' }"
        class="col current"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "insertion-sort",
  data() {
    return {
      array: [],
      sorting: [],
      done: -1,
      started: false,
      active: -1,
    };
  },
  props: {
    sleep: Function,
  },
  methods: {
    setCurrent(current, index) {
      this.sorting = Array(10).fill(0);
      this.sorting[index] = current;
    },

    getClassName(index) {
      let className = "col ";

      if (index === this.active) {
        return className + "active";
      }

      if (index <= this.done) {
        return className + "done";
      }

      return className;
    },

    async insertSort() {
      this.started = true;
      let array = this.array;

      for (let i = 0; i < array.length; i++) {
        const current = array[i];
        array[i] = 0;

        let j = i - 1;
        this.done = i;

        this.setCurrent(current, i);
        this.active = j;

        await this.sleep();

        while (j >= 0 && array[j] > current) {
          [array[j + 1], array[j]] = [array[j], array[j + 1]];
          this.setCurrent(current, j);
          this.active = --j;

          await this.sleep();
        }
        await this.sleep();

        array[j + 1] = current;
      }
      this.done = this.array.length;
      this.active = -1;
      this.sorting = Array(10).fill(0);
    },
  },

  created() {
    this.array = _.shuffle(_.range(1, 11));
  },
};
</script>
