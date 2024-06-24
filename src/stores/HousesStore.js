import { defineStore } from 'pinia'

// ! API url and key have been removed from this file

// State manager
export const useHousesStore = defineStore('housesStore', {
  state: () => ({
    // Unfiltered data
    houses: [],

    // Used to render listings after search/sort/filter
    filteredHouses: [],

    // Id used to render details page
    houseId: 0,

    // Loading state for async API calls
    isLoading: false,

    searchQuery: "",

    searchFilters: {},
  }),

  getters: {
    idSort() {
      return (
        this.filteredHouses.sort((a, b) => a.id > b.id) 
        && this.houses.sort((a, b) => a.id > b.id))
    },

    priceSort() {
      return (
        this.filteredHouses.sort((a, b) => a.price < b.price) 
        && this.houses.sort((a, b) => a.price < b.price))
    },      

    sizeSort() {
      return (
        this.filteredHouses.sort((a, b) => a.size < b.size) 
        && this.houses.sort((a, b) => a.size < b.size))
    },  

    resultsCounter() {
      return this.filteredHouses.length
    }
  },

  actions: {
    // API GET all house listings
    async getAllHouses() {
      REQUEST_OPTIONS.method = "GET"
      REQUEST_OPTIONS.body = null

      this.isLoading = true
      const response = await fetch(API_URL, REQUEST_OPTIONS)
      const data = await response.json()
      console.log("get ok: " + response.ok)
      this.isLoading = false
        
      // Store data in state
      this.houses = data
      this.filteredHouses = data

    },

    // API POST create/edit listing
    async postHouse(formData, imageData, id = "") {
      REQUEST_OPTIONS.method = "POST"
      REQUEST_OPTIONS.body = formData
    
      this.isLoading = true
      const response = await fetch((API_URL + id), REQUEST_OPTIONS)
       
      // Upload image, if posting a new listing, get id from response
      REQUEST_OPTIONS.body = imageData
      if (!id) {
        const data = await response.json()
        id = data.id
      }
      
      const responseImage = await fetch((API_URL + id + "/upload"), REQUEST_OPTIONS)
      console.log("post OK: " + response.ok +"; post image OK: " + responseImage.ok)
      this.isLoading = false

      // Redirect user to edited listing
      this.getAllHouses()
      this.houseId = id
      
    },

    // API DELETE house a listing
    async deleteHouse(id) {
      REQUEST_OPTIONS.method = "DELETE"
      REQUEST_OPTIONS.body = null

      this.isLoading = true
      const response = await fetch((API_URL + id), REQUEST_OPTIONS)     
      console.log("delete OK: " + response.ok)
      this.isLoading = false

      // Update state
      this.getAllHouses()
    },

    // Find single house in state
    findHouseInState(id = "") {
      return this.houses.find(h => h.id === id)
    },

    // Search state for adress, postal code or city
    filterHouses() {
      const s = this.searchQuery.replace(/\s/g, "").toLowerCase()

      const { bedrooms, bathrooms, hasGarage } = this.searchFilters

      this.filteredHouses = this.houses 

      // Apply filters and search query if applicable
      if (bedrooms) {
        this.filteredHouses = this.filteredHouses.filter(h => h.rooms.bedrooms.toString() === bedrooms)
      }

      if (bathrooms) {
        this.filteredHouses = this.filteredHouses.filter(h => h.rooms.bathrooms.toString() === bathrooms)
      }

      if (hasGarage) {
        this.filteredHouses = this.filteredHouses.filter(h => h.hasGarage.toString() === hasGarage)
      }

      if (s) {
        this.filteredHouses = this.filteredHouses.filter(h=> {

          const adress = (
            h.location.street + 
            h.location.houseNumber + 
            h.location.houseNumberAddition +
            h.location.zip + 
            h.location.city).replace(/\s/g, "").toLowerCase().toString()
  
          return adress.includes(s)
        })
      }
    }  
  }
})
