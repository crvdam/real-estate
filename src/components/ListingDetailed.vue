<script setup>
  import DeleteButton from "./DeleteButton.vue"
  import BackButton from "./BackButton.vue"
  import EditButton from "./EditButton.vue"
  import { useHousesStore } from "../stores/HousesStore"
  import { ref } from "vue"

  const housesStore = useHousesStore()

  // Retrieve a single house by id
  const house = ref(housesStore.findHouseInState(housesStore.houseId))

</script>

<template>
  <div class="back-button">
    <BackButton />
  </div>

  <div 
    v-if="house"
    class="listing-container">

    <div class="top-div">
      <img 
      :src="house.image" 
      class="house-image">
    </div>

    <div class="bottom-div">
      <div class="listing-info">
        <div class="listing-adress">
          <h1>
            {{ house.location.street }}
            {{ house.location.houseNumber }}
            {{ house.location.houseNumberAddition }}
          </h1>

          <p>
            <img 
              src="../assets/icons/ic_location@3x.png"
              class="icon">
                {{ house.location.zip }}
                {{ house.location.city }}
          </p>

          <div class="listing-info-additional-top">
            <p>
              <img 
                src="../assets/icons/ic_price@3x.png"
                class="icon">
                  {{ house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
            </p>

            <p>
              <img 
                src="../assets/icons/ic_size@3x.png"
                class="icon">
                  {{ house.size }} m2
            </p>

            <p>
              <img 
                src="../assets/icons/ic_construction_date@3x.png"
                class="icon">
                Built in {{ house.constructionYear }}
            </p>

          </div>

          <div class="listing-info-additional-bottom">
            <p>
              <img 
                src="../assets/icons/ic_bed@3x.png"
                class="icon">
                {{ house.rooms.bedrooms }}
            </p>

            <p>
              <img 
                src="../assets/icons/ic_bath@3x.png"
                class="icon">
                {{ house.rooms.bathrooms }}
            </p>

            <p>
              <img 
                src="../assets/icons/ic_garage@3x.png"
                class="icon">
                {{ house.hasGarage ? "Yes" : "No" }}
            </p>
          </div>

          <p class="description">{{ house.description }}</p>

        </div>
      </div>
      <div class="listing-buttons">
        <div class="edit-button">
          <EditButton 
            v-if="house.madeByMe"
            :id="house.id" />
       </div>
        <div class="delete-button">
          <DeleteButton 
            v-if="house.madeByMe"
            :id="house.id"/>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .listing-container {
    background-color: var(--clr-background2);
    padding-bottom: 40px;
  }
  
  .bottom-div {
    display: flex;
    flex-direction: row;
  }

  .listing-buttons {
    flex-grow: 1;
    display: flex;
    justify-content: right;
    gap: 15px;
  }

  .listing-info {
 
    margin:auto;
  }
 
  p {
    display: flex;
    flex-direction: row;
    align-content: center;
    margin-right: 25px;
    margin-bottom: 5px;
    color: var(--clr-text-secondary)
  }

  .listing-info-additional-top {
    display: flex;
    flex-direction: row;
  }

  .listing-info-additional-bottom {
    display: flex;
    flex-direction: row;
  }

  .description {
    display: flex;
    text-align: justify
  }

  @media screen and (max-width: 600px) {
    .listing-container {
      position: relative;
      top: 0;
    }

    .listing-info {
      margin-left: 10px;
    }

    .listing-buttons {
      position: fixed;
      top: 20px;
      right: 15px;
      z-index: 1;
    }

    .back-button {
      position: fixed;
      top: 20px;
      left: 15px;
      z-index: 1;
    }

    .house-image {
      width: 100vw;      
    }

    .bottom-div {
      border-radius: 30px;
      background: var(--clr-background2);
      padding: 10px;
      position: relative;
      top: -40px;    
    }
  }
  
  @media screen and (min-width: 601px) {
    .listing-container {
      min-height: 300px;
    }

    .listing-info {
      padding-left: 20px;
    }
    
    .listing-buttons {
      margin: 15px;
    }

    .house-image {
      width: 100%;
    }
    
    .icon {
      margin-right: 5px;
    }

  }

</style>
