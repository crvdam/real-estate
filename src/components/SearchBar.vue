<script setup>
  import { useHousesStore } from "../stores/HousesStore";
  import { ref, watch } from "vue"

  const housesStore = useHousesStore()

  const search = ref("")

  // Filter listings according to searchQuery
  watch(search, () => {
    housesStore.searchQuery = search
    housesStore.filterHouses()
  })
  
</script>

<template>
    <div class="search-container">
      <img class="search-icon" src="../assets/icons/ic_search@3x.png">
      <input 
        v-model="search"
        type="text">
      <Transition>
        <img
          v-show="search"
          @click="search = ''"
          class="clear-search-icon"
          src="../assets/icons/ic_clear@3x.png">
      </Transition> 
    </div>
</template>

<style scoped>
  .search-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
  }

  input {
    background: var(--clr-tertiary);
    height: 30px;
    max-width: 280px;
    padding: 0 35px;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.2s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
  
  .search-icon {
    position: absolute;
    left: 10px;
  }

  .clear-search-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
  }

</style>
