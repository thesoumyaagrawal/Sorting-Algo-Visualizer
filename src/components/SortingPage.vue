<template>
  <div>
    <DisplayArray :array="array" />
  </div>
</template>

<script>
import DisplayArray from "@/components/DisplayArray.vue";

export default {
  name: "sorting-page",
  props: {
    msg: String,
  },
  components: {
    DisplayArray,
  },
  data() {
    return {
      array: [],
    };
  },
  methods: {
    generateRandomArray() {
      var array = Array(10)
        .fill(1)
        .map((x, y) => x + y);
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
  created() {
    this.array = this.generateRandomArray();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
