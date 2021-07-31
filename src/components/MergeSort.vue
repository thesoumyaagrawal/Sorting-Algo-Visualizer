<template>
  <div>
    <!-- <p v-if="i == partitions.length">Done!</p> -->
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
        v-for="(item, index) in sorting"
        :key="'sorting-' + index"
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
      partitions: _.shuffle(_.range(1, 11)).map((element) => [element]),
      sorting: [],
      started: false,
    };
  },
  methods: {
    setCurrent(current, index) {
      this.sorting = Array(10).fill(0);
      this.sorting[index] = current;
    },

    getStyling(item, index) {
      const height = item * 20;
      const color = this.getColor(index);

      return `height: ${height}px; background-color:${color};`;
    },

    getColor(index) {
      const length = this.partitions.length;
      const step = 255 / Math.round(length / 3);
      const red_range = Math.round(length / 3);
      const green_range = Math.round((2 * length) / 3);

      let color = {};

      if (index <= red_range) {
        color = {
          red: 255,
          green: step * index,
          blue: 0,
        };
      } else if (index <= green_range) {
        color = {
          red: 0,
          green: 255,
          blue: (index - red_range) * step,
        };
      } else {
        color = {
          red: (index - green_range) * step,
          green: 0,
          blue: 255,
        };
      }

      return `rgb(${color.red}, ${color.green}, ${color.blue})`;
    },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async mergeSort() {
      this.started = true;

      while (this.partitions.length > 1) {
        for (let i = 0; i < this.partitions.length - 1; i++) {
          if (
            this.partitions[i].length == this.partitions[i + 1].length ||
            i + 1 == this.partitions.length - 1
          ) {
            /* combine */
            console.log(
              `Combining: ${this.partitions[
                i
              ].toString()} and ${this.partitions[i + 1].toString()}`
            );

            let new_array = [];
            let copyOfPartition1 = [...this.partitions[i]];
            let copyOfPartition2 = [...this.partitions[i + 1]];

            while (copyOfPartition1.length > 0 || copyOfPartition2.length > 0) {
              this.sorting = new_array;
              await this.sleep(1000);
              if (
                copyOfPartition2.length === 0 ||
                copyOfPartition1[0] < copyOfPartition2[0]
              ) {
                new_array.push(copyOfPartition1[0]);
                this.partitions[i][
                  this.partitions[i].length - copyOfPartition1.length
                ] = 0;
                copyOfPartition1.shift();

                console.log("copying from first");
              } else {
                new_array.push(copyOfPartition2[0]);
                this.partitions[i + 1][
                  this.partitions[i + 1].length - copyOfPartition2.length
                ] = 0;
                copyOfPartition2.shift();

                console.log("copying from second");
              }
            }

            await this.sleep(1000);

            this.sorting = Array(10).fill(0);

            this.partitions.splice(i, 2);

            console.log(`Adding new array: ${new_array.toString()}`);
            this.partitions.splice(i, 0, new_array);

            await this.sleep(1000);

            break;
          }
        }
      }
      this.sorting = Array(10).fill(0);
    },
  },
};
</script>
