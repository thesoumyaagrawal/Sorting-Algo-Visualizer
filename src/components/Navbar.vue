<template>
  <div id="nav">
    <router-link to="/">Bubble Sort</router-link> |
    <router-link to="/insertionSort">Insertion Sort</router-link> |
    <router-link to="/selectionSort">Selection Sort</router-link> |
    <router-link to="/mergeSort">Merge Sort</router-link> |
    <router-link to="/quickSort">Quick Sort</router-link> |
    <router-link to="/countSort">Count Sort</router-link> |
    <router-link to="/radixSort">Radix Sort</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
a {
  color: #42b983;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
