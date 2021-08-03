<template>
  <div>
    <Header
      :done="count.length === 0"
      :started="started"
      @sort="countSort"
      @reset="reset"
    />

    <div class="main">
      <div
        v-for="(item, index) in array"
        :key="index"
        :style="{ height: item * 20 + 'px' }"
        class="col"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="started" class="main">
      <div
        v-for="(item, index) in count"
        :key="index"
        class="col"
        :style="getStyling(index, item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

const getInitialState = () => {
  let length = _.random(15, 25);
  let array = Array.from({ length: length }, () => _.random(1, 9));
  let count = Array(10).fill(0);

  return {
    array: array,
    count: count,
    started: false,
  };
};

export default {
  name: "count-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    Header,
  },
  methods: {
    async countSort() {
      this.started = true;

      for (let i = 0; i < this.array.length; i++) {
        await this.sleep();
        this.count[this.array[i]]++;
        this.array[i] = 0;
      }

      let j = 0;
      for (let i = 0; i < this.count.length; i++) {
        while (this.count[i] > 0) {
          await this.sleep();

          this.array[j++] = i;
          this.count[i]--;
        }
      }

      this.count = [];
    },
    reset() {
      this.$emit("clicked");
    },

    getStyling(index, item) {
      return {
        height: (index + 1) * 20 + "px",
        background: `hsl(0, 0%, ${90 - item * 15}%)`,
      };
    },
  },
};
</script>
