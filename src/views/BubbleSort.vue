<template>
  <div>
    <Header
      :done="!done"
      :started="started"
      @sort="bubbleSort"
      @reset="reset"
    />
    <RenderArray :array="array" :getClassName="getClassName" />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import RenderArray from "@/components/RenderArray.vue";

const getInitialState = () => {
  let array = _.shuffle(_.range(1, 11));
  return {
    array: array,
    active: [],
    done: array.length,
    started: false,
  };
};

export default {
  name: "bubble-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    Header,
    RenderArray,
  },
  methods: {
    getClassName(item, index) {
      if (index >= this.done) return "col done";

      return this.active.includes(item) ? "col active" : "col";
    },

    async bubbleSort() {
      this.started = true;
      var array = this.array;

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          this.active = [array[j], array[j + 1]];

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
          }

          await this.sleep();
        }
        this.done--;
      }
    },
    reset() {
      this.$emit("clicked");
    },
  },
};
</script>
