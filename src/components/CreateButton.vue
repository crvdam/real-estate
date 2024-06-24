<script setup>
  import { useRouter } from "vue-router";
  import { useHousesStore } from "../stores/HousesStore"
  import { useRoute } from "vue-router"
  import { ref } from "vue"
 
  const router = useRouter()

  const housesStore = useHousesStore()

</script>

<template>
  <button
    @click="router.push('/form'); housesStore.houseId = ''"
    class="desktop">
      New Listing
  </button>

  <img 
    @click="router.push('/form'); housesStore.houseId = ''"
    class="mobile"
    src="../assets/icons/ic_plus_grey@3x.png">
      
</template>

<style scoped>
  button {
    background: var(--clr-primary);
    color: var(--clr-background2);
    border-radius: 10px;
    padding: 5px 5px;
    width: 170px;
  }

  img {
    height: 20px;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .desktop {
      display: none;
    }
    .mobile {
      display: block;
    }
  }

  @media screen and (min-width: 601px) {
    .desktop {
      display: block;
    }
    .mobile{
      display: none;
    }
  }

</style>