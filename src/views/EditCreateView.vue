<script setup>
  import Loading from "../components/Loading.vue"
  import BackButton from "../components/BackButton.vue"
  import HouseForm from "../components/HouseForm.vue"
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
    <div class="edit-create-header">
      <BackButton />
      <h1>{{ housesStore.houseId ? "Edit listing" : "Create new listing" }}</h1>
    </div>
    <HouseForm />
  </div>
  
</template>

<style scoped>

  @media screen and (max-width: 600px) {
    .edit-create-header {
      display: flex;
      flex-direction: row;
      padding: 10px;
    }  

    h1 {
      margin: auto;
    }

    a {
      position: fixed;
    }
  }
  
</style>