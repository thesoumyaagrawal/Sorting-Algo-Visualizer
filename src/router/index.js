import { createRouter, createWebHashHistory } from "vue-router";
import InsertionSort from "../components/InsertionSort.vue";
import BubbleSort from "../components/BubbleSort.vue";
import SelectionSort from "../components/SelectionSort.vue";
import MergeSort from "../components/MergeSort.vue";
import QuickSort from "../components/QuickSort.vue";

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
  {
    path: "/mergeSort",
    name: "MergeSort",
    component: MergeSort,
  },
  {
    path: "/quickSort",
    name: "QuickSort",
    component: QuickSort,
  },
];

// console.log(this.animationSpeed);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
