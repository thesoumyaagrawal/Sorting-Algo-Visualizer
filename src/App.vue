<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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

div.main {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
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
