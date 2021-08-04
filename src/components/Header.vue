<template>
  <div id="header">
    <form v-on:submit="changeArray">
      <input id="array-input" text="text" :value="userInput" ref="newArray" />
      <button type="submit" :disabled="started">Sort</button>
      <button v-on:click="reset" class="reset">Reset</button>
      <div v-if="error && !started" class="error">{{ error }}</div>
    </form>
  </div>
  <span v-if="done">Done!</span>
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

      this.$emit("changeArray", array);
      this.$emit("sort");
    },

    isInteger(value) {
      return /^\d+$/.test(value);
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: center;
  padding: 8px 30%;
  background: #3ba776;
}

#array-input {
  border: 0;
  padding: 6px 12px;
  min-width: 200px;
  outline: none;
}

.spacer {
  flex-grow: 1;
}

.error {
  color: #fad8d8;
}
</style>
