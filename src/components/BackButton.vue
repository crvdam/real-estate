<script setup>
  import { RouterLink } from "vue-router"
  import { useRoute } from "vue-router"
  import { ref } from "vue"
 
  // To change icon to white on mobile details page
  const windowWidth = ref(window.innerWidth)

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
  })

</script>

<template>
  <RouterLink 
    to="/"
    class="back-button-container">
      <img 
        v-if="useRoute().fullPath === '/details' && windowWidth < 601"
        src="../assets/icons/ic_back_white@3x.png" 
        alt="<"
        class="icon-white">
      <img 
        v-else 
        src="../assets/icons/ic_back_grey@3x.png" 
        alt="<"
        class="icon">
      <p class="desktop">Back to overview</p>
  </RouterLink>
</template>

<style scoped>
  .back-button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  p {
    font-size: 16px;
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    .desktop {
      display: none;
    }

    .back-button-container {
      width: 40px;
    }
  }

  @media screen and (min-width: 601px) {
    .desktop {
      display: block;
    }

    .back-button-container {
      margin: 10px;
    }
  }
  
</style>

