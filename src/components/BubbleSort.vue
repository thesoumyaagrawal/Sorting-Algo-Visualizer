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
  <p v-if="!done">Done!</p>
  <button v-on:click="bubbleSort" :disabled="started">Start</button>
</template>

<script>
export default {
  name: "sorting-page",
  data() {
    return {
      array: [],
      active: [],
      done: 0,
      started: false,
    };
  },
  methods: {
    getClassName(item, index) {
      if (index >= this.done) return "done";

      return this.active.includes(item) ? "active" : "";
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
    this.array = _.shuffle(
      Array(10)
        .fill(1)
        .map((x, y) => x + y)
    );
    this.done = this.array.length;
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
</style>
