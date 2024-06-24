<script setup>
  import { useHousesStore } from "../stores/HousesStore";
  import { watch, ref, reactive } from "vue";
  import SortButtons from "./SortButtons.vue";

  const housesStore = useHousesStore()

  const filterPopup = ref(false)

  const filters = reactive({
    bedrooms: 0,
    bathrooms: 0, 
    hasGarage: 0,
  })

  // Filter listings according to filters
  watch(filters, ()=> {
    housesStore.searchFilters = filters
    housesStore.filterHouses()
  })
  
</script>

<template>
  <img
    @click="filterPopup = !filterPopup"
    src="../assets/icons/ic_filter.png">

  <div 
    v-if="filterPopup"
    class="filter-popup"
    @click="filterPopup = false">
      <div 
        @click.stop=""
        class="filter-popup-content">
        <h2>
          Select filters
        </h2>
        <p>
          Bedrooms: 
          <select
            v-model="filters.bedrooms">
            <option value=""></option>
            <option v-for="i in 10">{{ i }}</option>
          </select>
          <img 
            v-show="filters.bedrooms"
            @click="filters.bedrooms = ''"
            src="../assets/icons/ic_clear@3x.png">
        </p>
        <p>
          Bathrooms:
          <select
            v-model="filters.bathrooms">
              <option value=""></option>
              <option v-for="i in 10">{{ i }}</option>
          </select>
          <img 
            v-show="filters.bathrooms"
            @click="filters.bathrooms = ''"
            src="../assets/icons/ic_clear@3x.png">
        </p>
        <p>Garage:
          <select
            v-model="filters.hasGarage">
              <option value=""></option>
              <option value="true">Yes</option>
              <option value="false">No</option>
          </select>
          <img 
            v-show="filters.hasGarage"
            @click="filters.hasGarage = ''"
            src="../assets/icons/ic_clear@3x.png">
        </p>
        <button 
          @click="filterPopup = false">
            BACK
          </button>
      </div>
    </div>
</template>

<style scoped>
  img {
    margin: 0 10px;
    cursor: pointer;
  }

  p {
    display: flex;
    align-items: center;
  }

  p > img {
    height: 20px;
  }

  button {
    border-radius: 10px;
    padding: 10px;
  }

  .filter-popup {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.200);
    overflow:visible;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .filter-popup-content {
    background: var(--clr-background2);
    border-radius: 10px; 
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
  }

  @media screen and (max-width: 600px) {
    img {
      height: 25px;
    }

    .filter-popup-content {
      width: 100vw;
    }
  }

  @media screen and (min-width: 601px) {
    img {
      height: 30px;
    }

    .filter-popup-content {
      width: 300px;
    }
  }
</style>