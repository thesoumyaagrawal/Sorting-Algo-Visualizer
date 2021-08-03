<template>
  <div>
    <Header
      :done="done === array.length"
      :started="started"
      @sort="selectionSort"
      @reset="reset"
    />

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
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));

  return {
    array: array,
    done: -1,
    minimum: -1,
    active: -1,
    started: false,
    height: 0,
    componentKey: 0,
  };
};

export default {
  name: "selection-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    Header,
  },
  methods: {
    getClassName(index) {
      let className = "col ";

      if (index <= this.done) {
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

    async selectionSort() {
      this.started = true;
      let array = this.array;

      for (let i = 0; i < array.length; i++) {
        this.minimum = i;

        for (let j = i; j < array.length; j++) {
          if (array[j] < array[this.minimum]) {
            this.minimum = j;
          }
          this.active = j;
          await this.sleep();
        }

        [array[i], array[this.minimum]] = [array[this.minimum], array[i]];

        this.active = -1;
        this.done = i;
        this.minimum = -1;
        await this.sleep();
      }

      this.done = this.array.length;
    },
    reset() {
      this.$emit("clicked");
    },
  },
};
</script>
