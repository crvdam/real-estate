<script setup>
  import SearchBar from "./SearchBar.vue"
  import CreateButton from "./CreateButton.vue"
  import Filters from "./Filters.vue"
  import SortButtons from "./SortButtons.vue"
  import { storeToRefs } from "pinia"
  import { useHousesStore } from "../stores/HousesStore"

  const housesStore = useHousesStore()
  
  // If user is searching, render results counter
  const { resultsCounter } = storeToRefs(housesStore)
  
</script>

<template>
  <div class="container">
    <div class="grid-item-1">
      <h1>Houses</h1>
    </div>

    <div class="grid-item-2">
      <SearchBar />
      <Filters />
    </div>

    <div 
      v-if="housesStore.searchQuery && resultsCounter" 
      class="grid-item-3">
        <h2>
          {{ resultsCounter }} 
          {{ resultsCounter === 1 ? "result" : "results" }} found 
        </h2>
    </div>

    <div
      v-else-if="housesStore.searchQuery && !resultsCounter" 
      class="no-results-div">
        <p>No results found.</p>
        <p>Please try another keyword.</p>
    </div>

    <div class="grid-item-4">
      <CreateButton />
    </div>

    <div class="grid-item-5">
      <SortButtons />
    </div>
  </div>
</template>

<style scoped>
  .no-results-div {
    position: fixed;
    top: 40vh;
    color: var(--clr-secondary);
    text-align: center;
  }

  .grid-item-2 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .container {
      display: flex;
      max-width: 100vw;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      row-gap: 15px;
    }

    .grid-item-1 {
      order: 1;
    }
    .grid-item-2 {
      order: 2;
    }
    .grid-item-3 {
      order: 3;
    }
    .grid-item-4 {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .grid-item-5 {
      order: 5;
    }

    p {
      font-size: 12px;
    }

    #no-results-image {
      width: 200px;
      justify-self: center;
    }
  }

  @media screen and (min-width: 601px) {
    .container {
      display: grid;
      padding: 15px;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto auto;
    }

    .grid-item-1 {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    .grid-item-2 {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    .grid-item-3 {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }

    .grid-item-4 {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
      align-self: center;
      justify-self: end;
    }

    .grid-item-5 {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
      justify-self: end;
      align-self: center;
    }

    p {
      font-size: 18px;
    }

    .no-results-div {
      left: 40vw;
    }
    
    #no-results-image {
      width: 20vw;
    }
  }
</style>