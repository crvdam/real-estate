<script setup>
  import ListingDetailed from "../components/ListingDetailed.vue"
  import Loading from "../components/Loading.vue"
  import { useHousesStore } from "../stores/HousesStore"

  const housesStore = useHousesStore()

</script>

<template>
  <div
    v-if="housesStore.isLoading === true" 
    class="loading-div">
      <Loading  />
  </div>
  
  <div v-if="housesStore.isLoading === false">
    <ListingDetailed />
  </div>
  
</template>