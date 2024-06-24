<script setup>
  import { useHousesStore } from "../stores/HousesStore"
  import { reactive } from "vue"
  import { storeToRefs } from "pinia";

  const housesStore = useHousesStore()

  const sort = reactive({
    price: false,
    size: false,
  })

  // Toggle button and sort accordingly
  const handlePriceSort = () => {
    sort.size = false
    sort.price = !sort.price

    if (sort.price) {
      housesStore.priceSort
    } else {
      housesStore.idSort
    }
  }

  // Toggle button and sort accordingly
  const handleSizeSort = () => {
    sort.price = false 
    sort.size = !sort.size

    if (sort.size) {
      housesStore.sizeSort
    } else {
      housesStore.idSort
    }
  }


</script>

<template>
  <div class="sort-container">
    <p>Sort by:</p>
    <select>
      <option @click="housesStore.idSort"></option>
      <option @click="housesStore.priceSort">Price</option>
      <option @click="housesStore.sizeSort">Size</option>
    </select>
  </div>
</template>"

<style scoped>
  .sort-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    font-weight: 500;
  }
</style>