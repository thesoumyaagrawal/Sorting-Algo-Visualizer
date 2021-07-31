<template>
  <div>
    <p v-if="i == array.length">Done!</p>
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
      array: _.shuffle(_.range(1, 11)),
      sorting: [],
      i: -1,
      started: false,
      comparing: -1,
    };
  },
  methods: {
    setCurrent(current, index) {
      this.sorting = Array(10).fill(0);
      this.sorting[index] = current;
    },

    getClassName(index) {
      let className = "col ";

      if (index == this.comparing) {
        return className + "active";
      }

      if (index <= this.i) {
        return className + "done";
      }

      return className;
    },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async insertSort() {
      this.started = true;
      let array = this.array;

      for (this.i = 1; this.i < array.length; this.i++) {
        const i = this.i;
        let j = i - 1;

        const current = array[i];
        array[i] = 0;

        this.setCurrent(current, i);
        this.comparing = j;

        await this.sleep(500);

        while (j >= 0 && array[j] > current) {
          [array[j + 1], array[j]] = [array[j], 0];
          this.comparing = j - 1;
          this.setCurrent(current, j);

          await this.sleep(500);

          j--;
        }

        await this.sleep(500);
        this.comparing = -1;
        array[j + 1] = current;
      }
      this.sorting = Array(10).fill(0);
    },
  },
};
</script>
