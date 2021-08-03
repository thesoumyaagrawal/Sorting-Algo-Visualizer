<template>
  <p v-if="done">Done!</p>
  <button v-on:click="sort" :disabled="started">Start</button>
  <button v-on:click="reset" class="reset">Reset</button>
</template>

<script>
export default {
  name: "sort-header",
  props: {
    done: Boolean,
    started: Boolean,
  },
  emits: ["sort", "reset"],
  methods: {
    sort() {
      this.$emit("sort");
    },
    reset() {
      this.$emit("reset");
    },
  },
};
</script>

<style scoped>
.reset {
  background: #f44336;
}
</style>
