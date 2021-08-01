import { createRouter, createWebHashHistory } from "vue-router";
import InsertionSort from "../views/InsertionSort.vue";
import BubbleSort from "../views/BubbleSort.vue";
import SelectionSort from "../views/SelectionSort.vue";
import MergeSort from "../views/MergeSort.vue";
import QuickSort from "../views/QuickSort.vue";

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

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
