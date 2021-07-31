<template>
  <div id="nav">
    <router-link to="/">Bubble Sort</router-link> |
    <router-link to="/insertionSort">Insertion Sort</router-link> |
    <router-link to="/selectionSort">Selection Sort</router-link> |
    <router-link to="/mergeSort">Merge Sort</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
