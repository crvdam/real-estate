<script setup>
  import { useHousesStore } from "../stores/HousesStore"
  import { useRoute, useRouter } from "vue-router"
  import { ref } from "vue"

  const router = useRouter()

  const housesStore = useHousesStore()

  const { id } = defineProps(["id"])

  const confirmationPopup = ref(false)

  // To change icon to white on mobile details page
  const windowWidth = ref(window.innerWidth)
  
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

  // Delete house and redirect to homepage
  const handleConfirmation = () => {
    confirmationPopup.value = false

    housesStore.deleteHouse(id)

    router.push("/")
  }

</script>

<template>
  <img
    v-if="useRoute().fullPath === '/details' && windowWidth < 601"
    @click.prevent="confirmationPopup = true" 
    src="../assets/icons/ic_delete_white@3x.png"
    class="icon-white">

  <img
    v-else
    @click.prevent="confirmationPopup = true" 
    src="../assets/icons/ic_delete@3x.png"
    class="icon">

  <div 
    v-if="confirmationPopup" 
    class="confirmation-popup">
      <div class="confirmation-content">
        <h2>Delete listing</h2>

        <p>Are you sure you want to delete this listing?</p>

        <p>This action cannot be undone.</p>

        <button 
          id="confirm-button"
          @click.prevent="handleConfirmation">
            YES, DELETE
          </button>

        <button 
          @click.prevent="confirmationPopup = false">
            GO BACK
        </button>
    </div>
  </div>
</template>

<style scoped>
  .confirmation-popup {
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
  }

  .confirmation-content {
    background: var(--clr-background2);
    border-radius: 10px;
    text-align: center;
    padding: 25px;
  }

  button {
    background: var(--clr-secondary);
    color: var(--clr-background2);
    border-radius: 10px;
    padding: 5px 5px;
    margin: 5px;
    width: 170px;
  }

  #confirm-button {
    background: var(--clr-primary);
  }

  .icon {
    cursor: pointer;
  }

  @media screen and (max-width: 600) {
    .confirmation-content {
      height: 150px;
      width: 100vw;
    }
  }

  @media screen and (min-width: 601) {
    .confirmation-content {
      height: 250px;
      width: 500px;
    }
  }

</style>