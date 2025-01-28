<template>
    <div v-for="option in options" :key="option">
      <button class="option-button" @click="$emit('handlePokemonSelection', option)">
        {{ option }}
      </button>
    </div>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'

  defineProps<{ options: string[] }>()
  defineEmits<{
    handlePokemonSelection: (pokemonName: string) => void
  }>()
</script>

<style scoped>
  .option-button{
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    color: #333;
    min-width: 120px;
  }
</style>
