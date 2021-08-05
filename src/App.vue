<template>
  <Navbar />
  <router-view :key="key" :sleep="sleep" @reset="handleReset" />
  <Footer @speedChanged="changeSpeed" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "app",
  components: {
    Navbar,
    Footer,
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

    changeSpeed(value) {
      this.animationSpeed = value;
    },

    handleReset() {
      this.key++;
    },
  },
};
</script>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main {
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

button {
  min-width: 80px;
  background: #42b983;
  color: white;
  border: none;
  margin: 2px;
  padding: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

.reset {
  background: #ec5555;
}
</style>
