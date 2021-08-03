<template>
  <Navbar />
  <div>
    <span>Slower</span>
    <input
      type="range"
      v-model="animationSpeed"
      min="100"
      max="800"
      step="25"
    />
    <span>Faster</span>
  </div>
  <router-view :key="key" :sleep="sleep" @clicked="handleReset" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar,
  },
  data() {
    return {
      animationSpeed: 500,
      key: 0,
    };
  },
  methods: {
    sleep() {
      return new Promise((resolve) =>
        setTimeout(resolve, 900 - this.animationSpeed)
      );
    },

    handleReset() {
      this.key++;
    },
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

.main {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 250px;
}

button {
  background: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 6px;
  width: 80px;
  cursor: pointer;
}

button.reset {
  background: red;
}

.col {
  color: white;
  background: #222;
  width: 25px;
  margin-right: 5px;
}

.active {
  background: #42b983;
}

.done {
  background: rgb(204, 216, 29);
}

.current {
  background: red;
}

.smaller {
  background: purple;
}
</style>
