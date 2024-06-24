<script setup>
  import DeleteButton from "./DeleteButton.vue"
  import EditButton from "./EditButton.vue"

  const { house } = defineProps(["house"])

</script>

<template>
  <div class="listing-container">
    <div class="listing-image">
      <img 
      :src="house.image" 
      class="house-image">
    </div>
    
    <div class="listing-info">
      <p class="listing-info-adress">
        {{ house.location.street }}
        {{ house.location.houseNumber }}
        {{ house.location.houseNumberAddition }}
      </p>

      <p class="listing-info-price">
        <img 
          src="../assets/icons/ic_price@3x.png"
          class="icon">
          {{ house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
      </p>

      <p class="listing-info-zip">
        <img 
          src="../assets/icons/ic_location@3x.png"
          class="icon">
          {{ house.location.zip }}
          {{ house.location.city }}
      </p>

      <div class="listing-info-additional">
        <p>
          <img 
            src="../assets/icons/ic_size@3x.png"
            class="icon">
            {{ house.size }} m2
        </p>

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
</template>

<style scoped>
  .listing-container {
    display: flex;
    flex-direction: row;
    background: var(--clr-background2);
    padding: 10px 10px;
    margin: 15px 10px;
    border-radius: 10px;
    box-shadow: 3px 3px 5px var(--clr-tertiary);
  }

  .listing-container:hover {
    background: var(--clr-tertiary) ;
  }
  
  .listing-image {
    align-self: center;
  }

  .house-image {
    object-fit: cover;
    border-radius: 10px;
  }

  .listing-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .listing-info-adress {
    font-weight: 700;
  }

  .listing-info-price {
    font-weight: 600;
  }

  .listing-info-zip {
    color: var(--clr-text-secondary)
  }

  .listing-info-additional {
    color: var(--clr-text-secondary);
    display: flex;
    flex-direction: row;
  }

  .listing-buttons {
    flex-grow: 1;
    display: flex;
    justify-content: right;
  }

  p {
    display: flex;
    flex-direction: row;
    align-content: center;
    margin: 0 5px;
  }

  @media screen and (max-width: 600px) {
    .listing-container {
      height: 100px;
    }

    .house-image {
      height: 80px;
      width: 80px;
    }

    p {
      margin-left: 10px;
    }
  }
  
  @media screen and (min-width: 601px) {
    .listing-container {
      height: 150px;
    }

    .house-image {
      height: 120px;
      width: 120px;
    }
    
    .icon {
      margin-right: 5px;
    }

    .listing-buttons > div {
      margin: 5px;
    }
  
    p {
      margin-left: 20px;
    }
  }

</style>
