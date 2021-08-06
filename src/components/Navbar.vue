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

@media only screen and (max-width: 599px) {
  #nav {
    font-size: 10px;
    overflow: hidden;
  }

  #nav a {
    padding: 16px 0px;
  }
}

#nav {
  display: flex;
  height: 45px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #42b983;
}

#nav a {
  margin: 0;
  font-weight: bold;
  vertical-align: middle;
  padding: 16px 8px;
  color: #2c3e50;
  justify-content: center;
  text-decoration: none;
  color: white;
}

#nav a.router-link-exact-active {
  background: #3ba776;
}
</style>
