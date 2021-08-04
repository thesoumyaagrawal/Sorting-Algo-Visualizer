<template>
  <div>
    <Header
      :done="count.length === 0"
      :started="started"
      :array="array"
      :range="{ min: 1, max: 9 }"
      @sort="countSort"
      @reset="reset"
      @changeArray="changeArray"
    />
    <RenderArray :array="array" />
    <RenderArray v-if="started" :array="count" :getStyling="getStyling" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RenderArray from "@/components/RenderArray.vue";

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
    RenderArray,
  },
  methods: {
    changeArray(newArray) {
      this.array = newArray;
    },
    async countSort() {
      this.started = true;

      for (let i = 0; i < this.array.length; i++) {
        await this.sleep();
        this.count[this.array[i]]++;
        this.array[i] = 0;
      }

      for (let i = 0, j = 0; i < this.count.length; i++) {
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
    getStyling(item, index) {
      return {
        height: (index + 1) * 20 + "px",
        background: `hsl(0, 0%, ${90 - item * 15}%)`,
      };
    },
  },
};
</script>
