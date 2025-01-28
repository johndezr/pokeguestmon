<template>
  <main id="app-layout">
    <h1 class="game-title">¿Quien es este Pokemon?</h1>
    <p v-if="!isCover">Siguiente Pokemon en: {{ secondsToNextPokemon }} segundos.</p>
    <ConfettiExplosion v-if="!isCover" />
    <PokemonPicture :image="currentPokemon?.image" :isCover="isCover" />
    <PokemonOptions :options="options" @handlePokemonSelection="handlePokemonSelection" />
  </main>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import PokemonPicture from '@/components/PokemonPicture.vue'
  import PokemonOptions from '@/components/PokemonOptions.vue'
  import ConfettiExplosion from "vue-confetti-explosion"
  import usePokemon from '@/composables/usePokemon';

  const {
    currentPokemon,
    options,
    isCover,
    secondsToNextPokemon,
    getNewPokemon,
    handlePokemonSelection
  } = usePokemon()

  onMounted(async () => {
    await getNewPokemon()
  })
</script>

<style scoped>
  #app-layout {
    text-align: center;
  }
</style>
