import { createRouter, createWebHashHistory } from "vue-router";
import InsertionSort from "../components/InsertionSort.vue";
import BubbleSort from "../components/BubbleSort.vue";
import SelectionSort from "../components/SelectionSort.vue";

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
  {
    path: "/selectionSort",
    name: "SelectionSort",
    component: SelectionSort,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
