<script setup>
  import Listing from "../components/Listing.vue"
  import HousesHeader from "../components/HousesHeader.vue"
  import Loading from "../components/Loading.vue"
  import { useHousesStore } from "../stores/HousesStore"
  import { storeToRefs } from "pinia"
  import { RouterLink } from "vue-router"
  
  const housesStore = useHousesStore()
  
  // API GET to retrieve all houses and store in state
  housesStore.getAllHouses()

  // filteredHouses to render listings
  // houseId to pass a single house to ListingDetailed component
  const { filteredHouses, houseId } = storeToRefs(housesStore)

</script>
 
<template>
  <div
    v-if="housesStore.isLoading === true" 
    class="loading-div">
      <Loading  />
  </div>
  
  <div v-if="housesStore.isLoading === false">
    <HousesHeader />   
    <RouterLink to="/details">
      <Listing
        v-for="house in filteredHouses"
        :key="house.id"      
        :house="house"
        @click="houseId = house.id" />
    </RouterLink>
  </div>
</template>
