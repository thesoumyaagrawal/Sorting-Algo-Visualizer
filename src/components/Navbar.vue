<template>
  <div id="nav">
    <router-link to="/">Bubble Sort</router-link>
    <router-link to="/insertionSort">Insertion Sort</router-link>
    <router-link to="/selectionSort">Selection Sort</router-link>
    <router-link to="/mergeSort">Merge Sort</router-link>
    <router-link to="/quickSort">Quick Sort</router-link>
    <router-link to="/countSort">Count Sort</router-link>
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
  display: flex;
  justify-content: center;
  width: 100%;
  background: #42b983;
}

#nav a {
  font-weight: bold;
  padding: 16px 8px;
  color: #2c3e50;
  justify-content: center;
  text-decoration: none;
  color: white;
}

#nav a.router-link-exact-active {
  background: #3ba776;
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
