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
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

button {
  width: 80px;
  background: #8bc34a;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 2px;
  padding: 6px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.col {
  width: 25px;
  color: white;
  background: #222;
  margin-right: 5px;
}

.active {
  background: #6b9b37;
}

.done {
  background: #ffeb3b;
}

.current {
  background: #f44336;
}

.smaller {
  background: #9c27b0;
}
</style>
