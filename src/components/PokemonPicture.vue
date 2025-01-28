<template>
  <img class="pokemon-image-cover" :class="{'apply-filter': isCover}" :src="image" alt="">
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  defineProps<{ image: string | undefined, isCover: boolean }>()
</script>

<style scoped>
  .pokemon-image-cover {
    margin: 20px 0;
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
  .apply-filter {
    filter: brightness(0);
  }
</style>
