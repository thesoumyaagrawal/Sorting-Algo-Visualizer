<template>
  <div id="main">
    <div
      v-for="(item, index) in array"
      :key="item"
      :style="{ height: item * 20 + 'px' }"
      :class="'col ' + getClassName(item, index)"
    >
      {{ item }}
    </div>
  </div>
  {{ currentElement }}
  <p v-if="done == array.length">Done!</p>
  <button v-on:click="insertSort" :disabled="started">Start</button>
</template>

<script>
export default {
  name: "sorting-page",
  data() {
    return {
      array: [],
      done: 0,
      started: false,
      currentElement: -1,
    };
  },
  methods: {
    getClassName(item, index) {
      if (index <= this.done) return "done";

      if (item == this.currentElement) return "current";
    },

    sleep(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async insertSort() {
      this.started = true;
      var array = this.array;

      for (let i = 1; i < array.length; i++) {
        let current = array[i];
        let j = i - 1;
        this.done = j;
        this.currentElement = array[i];
        array[i] = 0;

        while (j >= 0 && array[j] > current) {
          [array[j + 1], array[j]] = [array[j], 0];
          j--;
          await this.sleep(500);
        }
        array[j + 1] = current;

        await this.sleep(500);
      }
      this.done = array.length;
    },
  },
  created() {
    this.array = _.shuffle(
      Array(10)
        .fill(1)
        .map((x, y) => x + y)
    );
    this.done = -1;
  },
};
</script>

<style scoped>
div#main {
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

div.col {
  color: white;
  background-color: #222;
  width: 30px;
  margin-right: 5px;
}

div.active {
  background-color: #42b983;
}

div.done {
  background-color: rgb(204, 216, 29);
}

div.current {
  background-color: red;
}
</style>
