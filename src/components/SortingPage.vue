<template>
  <div>
    <DisplayArray :array="array" :active="active" :done="done" />
  </div>
  <p v-if="!done">Done!</p>
  <button v-on:click="bubbleSort" :disabled="started">Start</button>
</template>

<script>
import DisplayArray from "@/components/DisplayArray.vue";

export default {
  name: "sorting-page",
  components: {
    DisplayArray,
  },
  data() {
    return {
      array: [],
      active: [],
      done: 0,
      started: false,
    };
  },
  methods: {
    generateRandomArray() {
      var array = Array(10)
        .fill(1)
        .map((x, y) => x + y);

      return _.shuffle(array);
    },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async bubbleSort() {
      this.started = true;
      var array = this.array;

      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
          this.active = [array[j], array[j + 1]];

          if (array[j] > array[j + 1]) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            this.array = array;
          }

          await this.sleep(300);
        }
        this.done--;
      }
    },
  },
  created() {
    this.array = this.generateRandomArray();
    this.done = this.array.length;
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 6px;
  width: 80px;
}
</style>
