<template>
  <div>
    <p v-if="partitions.length === 1 && this.temp.length === 0">Done!</p>
    <button v-on:click="mergeSort" :disabled="started">Start</button>
    <div class="main">
      <template v-for="(partition, partition_index) in partitions">
        <div
          v-for="(item, index) in partition"
          :key="'main-' + index"
          :style="getStyling(item, partition_index)"
          class="col"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <div class="main">
      <div
        v-for="(item, index) in temp"
        :key="'temp-' + index"
        :style="{ height: item * 20 + 'px' }"
        class="col"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "merge-sort",
  data() {
    return {
      partitions: [],
      length: 0,
      colors: [],
      temp: [],
      started: false,
    };
  },
  props: {
    sleep: Function,
  },
  methods: {
    getStyling(item, index) {
      const height = item * 20;

      return `height: ${height}px; background-color:${this.colors[index]};`;
    },

    async mergeSort() {
      this.started = true;
      let partitions = this.partitions;

      while (partitions.length > 1) {
        for (let i = 0; i < partitions.length - 1; i++) {
          let left = [...partitions[i]];
          let right = [...partitions[i + 1]];

          if (this.mergeable(i, left, right)) {
            const merged = await this.mergePartitions(i, left, right);

            await this.copyBackToOriginal(i, merged);

            break;
          }
        }
      }
      this.temp = [];
    },

    mergeable(i, left, right) {
      return (
        left.length === right.length || i + 1 === this.partitions.length - 1
      );
    },

    async mergePartitions(indexOfLeft, left, right) {
      let merged = [];

      while (left.length > 0 || right.length > 0) {
        if (right.length === 0 || left[0] < right[0]) {
          merged.push(left[0]);
          this.partitions[indexOfLeft].setFirstNonZeroElementToZero();
          left.shift();
        } else {
          merged.push(right[0]);
          this.partitions[indexOfLeft + 1].setFirstNonZeroElementToZero();
          right.shift();
        }
        this.fillTempArray(indexOfLeft, merged);
        await this.sleep();
      }
      /* Removes the two merged partitions from the original array */
      this.partitions.splice(indexOfLeft, 2);

      /* Filling the empty spaces with zeros is necessary to keep the other elements at the right index when displayed */
      this.partitions.splice(indexOfLeft, 0, [...Array(merged.length).fill(0)]);

      /* The merged array keeps the color of the left partition */
      this.colors.splice(indexOfLeft + 1, 1);

      return merged;
    },

    fillTempArray(startIndex, merged) {
      /* "temp" is used to display the result of merging.
         Padding zeroes are used to display it at the right index.
         (if an element is zero, it doesn't appear visually, but takes up the same space)
      */
      this.temp = [];
      if (startIndex === 0) {
        this.temp = [...merged, ...Array(this.length - merged.length).fill(0)];
      } else {
        for (let i = 0; i < startIndex; i++) {
          this.temp.push(...Array(this.partitions[i].length).fill(0));
        }
        this.temp.push(
          ...merged,
          ...Array(this.length - merged.length - this.temp.length).fill(0)
        );
      }
    },

    async copyBackToOriginal(startIndex, merged) {
      for (let j = 0; j < merged.length; j++) {
        this.partitions[startIndex][j] = merged[j];
        this.temp.setFirstNonZeroElementToZero();
        await this.sleep();
      }
    },

    getColor(index) {
      const step = 255 / Math.round(this.length / 3);
      const redRange = Math.round(this.length / 3);
      const greenRange = Math.round((2 * this.length) / 3);

      let color = {};

      if (index <= redRange) {
        color = {
          red: 255,
          green: step * index,
          blue: 0,
        };
      } else if (index <= greenRange) {
        color = {
          red: 0,
          green: 255,
          blue: (index - redRange) * step,
        };
      } else {
        color = {
          red: (index - greenRange) * step,
          green: 0,
          blue: 255,
        };
      }

      return `rgb(${color.red}, ${color.green}, ${color.blue})`;
    },
  },
  created() {
    this.partitions = _.shuffle(_.range(1, 11)).map((element) => [element]);
    this.length = this.partitions.length;

    for (let i = 0; i < this.partitions.length; i++) {
      this.colors.push(this.getColor(i));
    }
  },
};
</script>
