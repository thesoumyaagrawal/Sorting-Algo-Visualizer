<template>
  <div>
    <p v-if="false">Done!</p>
    <button v-on:click="radixSort" :disabled="started">Start</button>
    <button v-on:click="reset" class="reset">Reset</button>

    <div class="radix-main">
      <div
        v-for="(item, index) in array"
        :key="index"
        :class="getClassName(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="radix-bucket">
      <div v-for="(bucket, index) in buckets" :key="index">
        <div
          v-for="number in bucket"
          :key="number + '-' + index"
          :class="getClassName(number)"
        >
          {{ number }}
        </div>
        <div class="bucket-indicator">{{ index }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const getInitialState = () => {
  let array = [];

  /* !TODO: rewrite this */
  for (let i = 0; i < 15; i++) {
    array.push(_.random(i * 2 + 1, i * 700 + 10));
  }

  array = _.shuffle(array).map((element) => element.toString());

  let buckets = [];
  for (let i = 0; i < 10; i++) {
    buckets.push([...Array(10).fill("0")]);
  }

  return {
    array: array,
    buckets: buckets,
    started: false,
  };
};

export default {
  name: "radix-sort",
  data: getInitialState,
  props: {
    sleep: Function,
  },
  methods: {
    async radixSort() {
      this.started = true;
      let maxDigitCount = this.getMaxDigitCount();

      for (let n = 0; n < maxDigitCount; n++) {
        await this.putNumbersIntoBuckets(n);
        await this.copyBackFromBuckets();
      }
    },

    getClassName(number) {
      if (number === "0") {
        return "radix-element-empty";
      }
      return "radix-element";
    },

    getMaxDigitCount() {
      let maxDigitCount = 0;

      for (let i = 0; i < this.array.length; i++) {
        if (this.array[i].length > maxDigitCount) {
          maxDigitCount = this.array[i].length;
        }
      }
      return maxDigitCount;
    },

    async copyBackFromBuckets() {
      let count = 0;
      for (let i = 0; i < this.buckets.length; i++) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          if (this.buckets[i][j] !== "0") {
            await this.sleep();
            this.array[count++] = this.buckets[i][j];
            this.buckets[i][j] = "0";
            j--;
          }
        }
      }
    },

    async putNumbersIntoBuckets(i) {
      for (let j = 0; j < this.array.length; j++) {
        await this.sleep();
        let number = this.array[j];
        this.array[j] = "0";
        let compareDigitAt = number.length - i - 1;

        /* if the number has a digit at the nth position, put the number into */
        if (compareDigitAt >= 0) {
          let digit = Number(number[compareDigitAt]);
          this.buckets[digit].shift();
          this.buckets[digit].push(number);
        } else {
          this.buckets[0].shift();
          this.buckets[0].push(number);
        }
      }
    },

    reset() {
      this.$emit("clicked");
    },

    getStyling(index, item) {
      return {
        height: (index + 1) * 20 + "px",
        background: `hsl(0, 0%, ${90 - item * 15}%)`,
      };
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
  height: 200px;
  display: flex;
  justify-content: center;
}

.radix-bucket-element {
  display: flex;
  direction: columns;
  justify-content: center;
}

.bucket-indicator {
  margin: 0 2px 0 2px;
  width: 50px;
  border-top: 1px solid black;
}

.radix-element {
  display: block;
  width: 50px;
  text-align: center;
  border: 1px solid black;
  margin: 0 2px 0 2px;
}

.radix-element-empty {
  color: transparent;
  width: 50px;
  text-align: center;
  margin: 0 2px 0 2px;
}
</style>
