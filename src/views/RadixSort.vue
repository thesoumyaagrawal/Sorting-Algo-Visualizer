<template>
  <div>
    <Header
      :done="maxDigitCount === index"
      :array="array"
      :started="started"
      :range="{ min: 1, max: 9999 }"
      @sort="radixSort"
      @reset="reset"
      @changeArray="changeArray"
    />

    <div class="radix-main">
      <div
        v-for="(number, numberIndex) in array"
        :key="numberIndex"
        :class="getClassName(number)"
      >
        <DisplayNumber :number="number" :index="index" />
      </div>
    </div>
    <div class="radix-bucket">
      <div v-for="(bucket, bucketIndex) in buckets" :key="bucketIndex">
        <div
          v-for="(number, numberIndex) in bucket"
          :key="numberIndex"
          :class="getClassName(number) + ' bucket'"
        >
          <DisplayNumber :number="number" :index="index" />
        </div>
        <div class="bucket-indicator">{{ bucketIndex }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import DisplayNumber from "@/components/DisplayNumber.vue";
import Header from "@/components/Header.vue";

const getInitialState = () => {
  let array = [];
  let buckets = [];
  let maxDigitCount = 0;

  for (let i = 0; i < 15; i++) {
    /* !TODO: rewrite this */
    array.push(_.random(i * 2 + 1, i * 700 + 10).toString());
    if (array[i].length > maxDigitCount) {
      maxDigitCount = array[i].length;
    }
  }

  array = _.shuffle(array);

  for (let i = 0; i < 10; i++) {
    buckets.push([...Array(10).fill("0")]);
  }

  return {
    array: array,
    maxDigitCount: maxDigitCount,
    buckets: buckets,
    index: -1,
    started: false,
  };
};

export default {
  name: "radix-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  components: {
    DisplayNumber,
    Header,
  },
  methods: {
    async radixSort() {
      this.started = true;

      for (this.index = 0; this.index < this.maxDigitCount; this.index++) {
        await this.putNumbersIntoBuckets();
        await this.copyBackFromBuckets();
      }
    },

    changeArray(newArray) {
      this.array = [];
      this.maxDigitCount = 0;
      for (let i = 0; i < newArray.length; i++) {
        this.array.push(newArray[i].toString());
        if (this.array[i].length > this.maxDigitCount) {
          this.maxDigitCount = this.array[i].length;
        }
      }
    },

    getClassName(number) {
      if (number === "0") {
        return "radix-element empty";
      }
      return "radix-element";
    },

    async copyBackFromBuckets() {
      let count = 0;
      for (const bucket of this.buckets) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i] !== "0") {
            await this.sleep();
            this.array[count++] = bucket[i];
            bucket[i] = "0";
          }
        }
      }
    },

    async putNumbersIntoBuckets() {
      for (let i = 0; i < this.array.length; i++) {
        await this.sleep();

        let digit = 0;
        let number = this.array[i];
        let currentIndex = number.length - this.index - 1;

        this.array[i] = "0";

        if (currentIndex >= 0) {
          digit = Number(number[currentIndex]);
        }

        this.buckets[digit].shift();
        this.buckets[digit].push(number);
      }
    },

    reset() {
      this.$emit("clicked");
    },
  },
};
</script>

<style scoped>
.radix-main {
  margin-top: 25px;
  display: flex;
  justify-content: center;
}

.radix-bucket {
  height: 300px;
  display: flex;
  justify-content: center;
}

.bucket-indicator {
  width: 50px;
  border-top: 1px solid black;
  padding-top: 2px;
  margin: 3px 2px 0 2px;
}

.radix-element {
  width: 50px;
  border: 1px solid black;
  margin: 0 2px 0 2px;
}

.bucket {
  margin: 2px 0 2px 0;
}

.empty {
  color: transparent;
  border: 1px solid transparent;
}
</style>
