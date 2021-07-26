import { createRouter, createWebHashHistory } from "vue-router";
import InsertionSort from "../components/InsertionSort.vue";
import BubbleSort from "../components/BubbleSort.vue";

const routes = [
  {
    path: "/",
    name: "BubbleSort",
    component: BubbleSort,
  },
  {
    path: "/insertionSort",
    name: "InsertionSort",
    component: InsertionSort,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
