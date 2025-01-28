<script setup lang="ts">
import TheLayout from '@/layout/TheLayout.vue'
</script>

<template>
  <Suspense>
    <TheLayout />
  <template #fallback>
    <div div>Loading...</div>
  </template>
  </Suspense>
</template>

<style scoped>
</style>
