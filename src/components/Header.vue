<template>
  <p v-if="done">Done!</p>
  <form v-on:submit="changeArray">
    <div v-if="error && !started">{{ error }}</div>
    <input text="text" :value="userInput" ref="newArray" />
    <button type="submit" :disabled="started">Change Array</button>
  </form>
  <button type="submit" v-on:click="sort" :disabled="started">Start</button>
  <button v-on:click="reset" class="reset">Reset</button>
</template>

<script>
export default {
  name: "sort-header",
  props: {
    done: Boolean,
    started: Boolean,
    range: {
      default: { min: 1, max: 99 },
      type: Object,
    },
    array: Array,
  },
  data() {
    return {
      userInput: this.array.toString(),
      error: undefined,
    };
  },
  emits: ["sort", "reset", "changeArray"],
  methods: {
    sort() {
      this.$emit("sort");
    },
    reset() {
      this.$emit("reset");
    },
    changeArray() {
      this.userInput = this.$refs.newArray.value.replaceAll(" ", "").split(",");

      if (this.userInput.length > 25 || this.userInput.length < 3) {
        this.error = "The array must have at least 3 and maximum 25 numbers.";
        return;
      }

      let array = [];
      this.error = undefined;

      for (const element of this.userInput) {
        if (this.isInteger(element)) {
          if (
            Number(element) > this.range.max ||
            Number(element) < this.range.min
          ) {
            this.error = `The elements must be between ${this.range.min} and ${this.range.max}`;
            return;
          }
          array.push(Number(element));
        } else {
          this.error = "The array contains invalid numbers";
          return;
        }
      }

      if (!this.error) {
        this.$emit("changeArray", array);
      }
    },

    isInteger(value) {
      return /^\d+$/.test(value);
    },
  },
};
</script>

<style scoped>
.reset {
  background: #f44336;
}
</style>
