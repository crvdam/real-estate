<script setup>
  import { useHousesStore } from "../stores/HousesStore"
  import { ref } from "vue"
  import { useRoute } from "vue-router"

  const housesStore = useHousesStore()
  
  const housesActive = ref(true)

</script>

<template>
  <div class="navigation">
    <RouterLink
      :class="housesActive ? 'active' : 'inactive'"
      @click="housesStore.getAllHouses(); housesActive = true" 
      to="/">
        <img 
          id="dtt-image"
          src="../assets/icons/img_main_logo.png" 
          alt="DTT Real Estate">
    </RouterLink>

    <RouterLink 
      @click="housesStore.getAllHouses(); housesActive = true" 
      :class="housesActive ? 'active' : 'inactive'"
      to="/">
        <p>Houses</p>
        <img class="icon-inactive" src="../assets/icons/ic_mobile_navigarion_home@3x.png">
        <img class="icon-active" src="../assets/icons/ic_mobile_navigarion_home_active@3x.png">
    </RouterLink>

    <RouterLink 
      @click="housesActive = false" 
      :class="housesActive ? 'inactive' : 'active'"     
      to="/about">
        <p>About</p>
        <img class="icon-inactive" src="../assets/icons/ic_mobile_navigarion_info@3x.png">
        <img class="icon-active" src="../assets/icons/ic_mobile_navigarion_info_active@3x.png">
    </RouterLink>
  </div>
</template>

<style scoped>
  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    z-index: 1;
    background: var(--clr-background2);
    padding: 10px;
  }

  p {
     font-size: 18px;
  }

  @media screen and (max-width: 600px) {
    .navigation {
      position: fixed;
      bottom: 0;
      width: 100vw;
      height: 50px;
      background: var(--clr-background2);
      box-shadow: 0 10px 15px 5px var(--clr-secondary);
      justify-content: space-evenly;
      
    }

    .navigation > a:first-of-type {
      display: none;
    }

    .inactive > .icon-inactive {
      display: block;
    }

    .inactive > .icon-active {
      display: none;
    }

    .active > .icon-active {
      display: block;
    }

    .active > .icon-inactive {
      display: none;
    }

    img {
      height: 25px;     
    }

    #dtt-image {
      display: none;
    }

    p {
      display: none;
    }
  }

  @media screen and (min-width: 601px) {
    .navigation {
      gap: 30px;
      min-width: 600px;
      max-width: 1000px;
    }

    img {
      display: none;
    }

    #dtt-image {
      height: 40px;
      display: block;
    }

    .active {
      font-weight: 700;
    }
  
    p {
      display: block;
    }
  }
</style>