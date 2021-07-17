<template>
  <div class="home">
    <SortingPage />
  </div>
</template>

<script>
// @ is an alias to /src
import SortingPage from "@/components/SortingPage.vue";

export default {
  name: "home",
  components: {
    SortingPage,
  },
};
</script>
