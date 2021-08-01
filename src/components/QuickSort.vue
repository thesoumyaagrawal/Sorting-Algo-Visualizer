<template>
  <p v-if="false">Done!</p>
  <button v-on:click="quickSort" :disabled="started">Start</button>
  <div class="main">
    <template v-for="(partition, partition_index) in partitions">
      <div
        v-for="(item, index) in partition"
        :key="`${partition_index}-${index}`"
        :style="{ height: item * 20 + 'px' }"
        class="col"
      >
        {{ item }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "quick-sort",
  data() {
    return {
      partitions: [],
      started: false,
    };
  },
  methods: {
    // getClassName(item, index) {
    //   if (index >= this.done) return "col done";
    //   return this.active.includes(item) ? "col active" : "col";
    // },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async quickSort() {
      this.started = true;
      var array = this.array;

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          this.active = [array[j], array[j + 1]];

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }

          await this.sleep(300);
        }
        this.done--;
      }
    },
  },
  created() {
    this.partitions = [_.shuffle(_.range(1, 11))];
  },
};
</script>
