<script setup>
  import { useRouter } from "vue-router"
  import { useHousesStore } from "../stores/HousesStore"
  import { watch, ref, reactive, toRaw, computed } from "vue"
  import { useVuelidate } from "@vuelidate/core"
  import { required, alpha, alphaNum, numeric, minValue } from "@vuelidate/validators"

  const router = useRouter()
      
  window.scrollTo(0,0);

  const housesStore = useHousesStore()

  // User is editing: load single house by id
  let house = null
  if (housesStore.houseId) {
    house = toRaw(housesStore.findHouseInState(housesStore.houseId))
  }
  
  // Empty FormData object for image
  var imageData = new FormData()

  // Prepopulate form if editing
  const form = reactive({
    price:            house ? house.price                         : "",
    bedrooms:         house ? house.rooms.bedrooms                : "",
    bathrooms:        house ? house.rooms.bathrooms               : "",
    size:             house ? house.size                          : "",
    streetName:       house ? house.location.street               : "",
    houseNumber:      house ? house.location.houseNumber          : "",
    numberAddition:   house ? house.location.houseNumberAddition  : "",
    zip:              house ? house.location.zip                  : "",
    city:             house ? house.location.city                 : "",
    constructionYear: house ? house.constructionYear              : "",
    hasGarage:        house ? house.hasGarage                     : "",
    description:      house ? house.description                   : "",
    imageURL:         house ? house.image                         : ""
  })

  // Watch form input to enable submit button
  const submitActive = ref(false)

  watch(form, () => {
    for (const [key, value] of Object.entries(form)) {
      if (key !== 'numberAddition' && value === "") {
        submitActive.value = false
        return
      }
      submitActive.value = true
    }
  })

  // Form validators
  const formRules = computed(() => {
    return {
      price: { required, numeric },
      bedrooms: { required, numeric },
      bathrooms: { required, numeric },
      size: { required, numeric },
      streetName: { required },
      houseNumber: { required, numeric },
      numberAddition: { alphaNum },
      zip: { required, alphaNum },
      city: { required, alpha },
      constructionYear: { required, minValue: minValue(1901), numeric },
      hasGarage: { required },
      description: { required },
      imageURL: { required }
    }
  })

  // Setup Vuelidate
  const v$ = useVuelidate(formRules, form)

  async function handleSubmit() {
    // Check validity of form
    const formResults = await v$.value.$validate()

    if (!formResults) {
      return
    }

    // Populate FormData object
    const formData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if (key != "imageURL") {formData.append(key, value)}
    }
  
    // Edit existing listing or post new listing
    if (housesStore.houseId) {
      housesStore.postHouse(formData, imageData, house.id,)
    } else {
      housesStore.postHouse(formData, imageData)
    }

    router.push("/details")
  }

  const onFileSelected = e => {
    // Check valid file format
    if (["image/png", "image/jpeg"].includes(e.target.files[0].type)) {
      
      // URL to display image in form
      form.imageURL = URL.createObjectURL(e.target.files[0])

      // Clear image if one exists, store new image
      if (imageData) { 
        imageData.delete("image")
      }
      imageData.append("image", e.target.files[0], e.target.files[0].name)
    }
  }

</script>
<template>
  <form @submit.prevent="handleSubmit">

    <div class="form-input-large">
      <label for="streetName">Street name*</label>
        <input 
          v-model="form.streetName"
          :class="v$.streetName.$error && 'invalid'"
          id="streetName"
          type="text" 
          placeholder="Enter the street name">
        <p 
        v-for="error of v$.streetName.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small">
      <label for="houseNumber">House number*</label>
      <input 
        v-model="form.houseNumber" 
        :class="v$.houseNumber.$error && 'invalid'"
        id="houseNumber"
        type="text" 
        placeholder="Enter the house number">
      <p 
        v-for="error of v$.houseNumber.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small">
      <label for="numberAddition">Addition (optional)</label>
      <input 
        v-model="form.numberAddition" 
        :class="v$.numberAddition.$error && 'invalid'"
        id="numberAddition"
        type="text" 
        placeholder="e.g. A">
      <p 
        v-for="error of v$.numberAddition.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-large">
      <label for="zip">Postal code*</label>
      <input 
        v-model="form.zip" 
        :class="v$.zip.$error && 'invalid'"
        id="zip"
        type="text" 
        placeholder="e.g. 1000 AA">
      <p 
        v-for="error of v$.zip.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-large">
      <label for="city">City*</label>
      <input 
        v-model="form.city" 
        :class="v$.city.$error && 'invalid'"
        id="city"
        type="text" 
        placeholder="e.g. Utrecht">
      <p 
        v-for="error of v$.city.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>
    
    <div class="form-input-image">
      <div
        @click="$refs.fileInput.click()"
        class="house-image-container">
          <img
            v-if="form.imageURL" 
            :src="form.imageURL"
            class="house-image">
          <div
            v-else="form.imageURL" 
            class="empty-image">
              +
          </div>
      </div>
  
      <img 
        v-if="form.imageURL"
        src="../assets/icons/ic_clear_white@3x.png"
        @click="form.imageURL = ''; "
        class="clear-house-image">
      <label for="houseImage">Upload picture (PNG or JPG)*</label>
      <input 
        type="file" 
        ref="fileInput"
        accept="image/png, image/jpeg"
        @change="onFileSelected">
      <p 
        v-for="error of v$.imageURL.$errors" 
        :key="error.$uid"
        class="error-message">
        Please provide a valid image
      </p>
    </div> 

    <div class="form-input-large">
      <label for="price">Price*</label>
      <input 
        v-model="form.price"
        :class="v$.price.$error && 'invalid'"
        id="price"
        type="number" 
        placeholder="€150.000">
      <p 
        v-for="error of v$.price.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small"> 
      <label for="size">Size*</label>
      <input 
        v-model="form.size"
        :class="v$.size.$error && 'invalid'"
        id="size"
        type="number" 
        placeholder="e.g. 60m2">
      <p 
        v-for="error of v$.size.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small">
      <label for="hasGarage">Garage*</label>
      <select
        v-model="form.hasGarage"
        :class="v$.hasGarage.$error && 'invalid'"
        id="hasGarage">
          <option value="">Select</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
      </select>
      <p 
        v-for="error of v$.hasGarage.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small">
      <label for="bedrooms">Bedrooms*</label>
      <input 
        v-model="form.bedrooms"
        :class="v$.bedrooms.$error && 'invalid'"
        id="bedrooms"
        type="number" 
        placeholder="Enter amount">
        <p 
        v-for="error of v$.bedrooms.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-input-small">
      <label for="bathrooms">Bathrooms*</label>
      <input 
        v-model="form.bathrooms"
        :class="v$.bathrooms.$error && 'invalid'"
        id="bathrooms"
        type="number" 
        placeholder="Enter amount">
        <p 
        v-for="error of v$.bathrooms.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>  

    <div class="form-input-large">
      <label for="constructionYear">Construction year*</label>
      <input 
        v-model="form.constructionYear"
        :class="v$.constructionYear.$error && 'invalid'"
        id="constructionYear"
        type="number" 
        placeholder="e.g. 1990">
        <p 
        v-for="error of v$.constructionYear.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p> 
    </div>  

    <div class="form-input-textarea">
      <label for="description">Description*</label>
      <textarea
      rows="8"
        v-model="form.description"
        :class="v$.description.$error && 'invalid'"
        id="description"
        type="text"
        placeholder="Enter description">
      </textarea>
      <p 
        v-for="error of v$.description.$errors" 
        :key="error.$uid"
        class="error-message">
        {{ error.$message }}
      </p>
    </div>  

    
    <div class="form-submit">
      <button
        :disabled="submitActive ? false : true"
        :style="!submitActive && 'opacity: 50%;'"
        type="submit">
        {{ house ? "SAVE" : "POST" }}
      </button>
    </div>
    
  </form>
  <img class="background" src="../assets/icons/img_background@3x.png">
</template>

<style scoped>
  form {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    margin-top: 20px;
  }

  .form-input-small {
    grid-column: span 1;
    width: auto;
  }

  .form-input-large {
    grid-column: 1 / 3;
    width: auto;
  }

  .form-input-image {
    grid-column: 1 / 3;
    grid-row: span 3;
    position: relative;
    padding: 15px;
  }

  .form-input-textarea {
    grid-column: 1 / 3;
    grid-row: span 2;
  }

  .form-submit {
    grid-column: 2 / 3;
  }

  .inactive {
    opacity: 50%;
  }

  input {
    padding: 10px 20px;
  }

  .house-image-container {
    margin: 10px;
    cursor: pointer;
  }

  .house-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  form > div {
    display: flex;
    flex-direction: column;
    margin: 5px 0;
    padding: 5px 10px;
  }

  button {
    background: var(--clr-primary);
    color: var(--clr-background2);
    border-radius: 10px;
    padding: 5px 5px;
    width: 170px;
  }

  .error-message { 
    font-style: italic;
    color: var(--clr-primary)
  }

  .invalid {
    color: var(--clr-primary);
    border: 1px solid var(--clr-primary);
  }

  input[type="file"] {
    display: none;
  }

  .empty-image {
    border: 2px dashed var(--clr-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--clr-secondary);
    font-size: 60px;

  }

  @media screen and (max-width: 600px) {
    form {
      width: 100vw;
    }

    .form-input-small {
      width: 50vw;
    }
    .form-input-large {
      width: 100vw;
    }
    .house-image-container, .empty-image {
      height: 90px;
      width: 90px;
    }

    .clear-house-image {
      height: 40px;
      width: 40px; 
    }

    .clear-house-image {
      cursor: pointer;
      position: absolute;
      left: 90px;
    }

    .background { 
      width: 100vw;
      height: 60vh;
      position: sticky;
      bottom: 0;
      z-index: -1;
      opacity: 0.1;
    }

    .error-message {
      font-size: 12px;
    }
  }

  @media screen and (min-width: 601px) {
    form {
      max-width: 300px;
    }

    .house-image-container, .empty-image {
      height: 140px;
      width: 140px;
    }

    .clear-house-image {
      height: 50px;
      width: 50px; 
    }

    .clear-house-image {
      cursor: pointer;
      position: absolute;
      left: 135px;
    }

    .background { 
      height: 100%;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.1;
    }

    .error-message {
      font-size: 14px;
    }
  }
</style>