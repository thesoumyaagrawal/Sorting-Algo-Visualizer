<template>
  <p v-if="sortedCount === array.length">Done!</p>
  <button v-on:click="quickSort" :disabled="started">Start</button>
  <div class="main">
    <div
      v-for="(item, index) in array"
      :key="index"
      :style="{ height: item * 20 + 'px' }"
      :class="getClassName(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "quick-sort",
  data() {
    return {
      array: [],
      sorted: [],
      sortedCount: 0,
      sortedIndex: -1,
      pivot: -1,
      active: -1,
      started: false,
    };
  },
  props: {
    sleep: Function,
  },
  methods: {
    getClassName(index) {
      let className = "col ";

      if (this.pivot === index) {
        return className + "current";
      }

      if (index <= this.sortedIndex - 1 && index > this.pivot) {
        return className + "smaller";
      }

      if (index <= this.active && index > this.pivot) {
        return className + "active";
      }

      if (this.sorted[index] === 1) {
        return className + "done";
      }

      return className;
    },

    async quickSort() {
      this.started = true;
      var array = this.array;

      while (this.sortedCount !== array.length) {
        /* the first unsorted element (denoted with 0) will be the pivot */
        this.pivot = this.sorted.findIndex((element) => element === 0);
        this.sortedIndex = this.pivot + 1;

        for (let j = this.pivot + 1; this.sorted[j] === 0; j++) {
          await this.sleep();

          this.active = j;
          if (array[j] < array[this.pivot]) {
            [array[j], array[this.sortedIndex]] = [
              array[this.sortedIndex],
              array[j],
            ];
            this.sortedIndex++;
          }
        }

        await this.sleep();

        [array[this.pivot], array[this.sortedIndex - 1]] = [
          array[this.sortedIndex - 1],
          array[this.pivot],
        ];

        this.pivot = this.sortedIndex - 1;
        this.active = -1;
        this.sorted[this.pivot] = 1;
        this.sortedIndex = -1;
        this.sortedCount++;

        await this.sleep();
      }

      this.pivot = -1;
      this.active = -1;
    },
  },
  created() {
    this.array = _.shuffle(_.range(1, 11));
    this.sorted = Array(this.array.length).fill(0);
  },
};
</script>
