<script setup>
  import { useHousesStore } from "../stores/HousesStore"
  import { storeToRefs } from "pinia"
  import { useRoute, useRouter } from "vue-router"
  import { ref } from "vue"

  const router = useRouter()

  const { id } = defineProps(["id"])

  const housesStore = useHousesStore()

  const { houseId } = storeToRefs(housesStore)

  // To change icon to white on mobile details page
  const windowWidth = ref(window.innerWidth)

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

</script>

<template>
  <img
    v-if="useRoute().fullPath === '/details' && windowWidth < 601" 
    @click.prevent="router.push('/form'); houseId = id"
    src="../assets/icons/ic_edit_white@3x.png"
    class="icon-white">

  <img
    v-else
    @click.prevent="router.push('/form'); houseId = id"
    src="../assets/icons/ic_edit@3x.png"
    class="icon">
    
</template>

<style scoped>
  .icon {
    cursor: pointer;
  }
</style>