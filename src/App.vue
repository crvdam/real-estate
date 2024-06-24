<script setup>
  import Navigation from "./components/Navigation.vue"
</script>

<template>
  <div class="container">
    <header>
      <Navigation />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  background-color: var(--clr-background2);
  min-width: 600px;
  z-index: 1;
}

main {
  padding-bottom: 50px;
}

@media screen and (max-width: 600px) {
  main {
    width: 100vw;
  }
}

@media screen and (min-width: 601px) {  
  main {
    min-width: 600px;
    max-width: 1000px;
    margin: auto;
    padding-top: 80px;
  }

  header {
    height: 80px;
    position: fixed;
    width: 100vw;
    box-shadow: 5px 0 5px var(--clr-tertiary-dark);
  }
}
</style>
