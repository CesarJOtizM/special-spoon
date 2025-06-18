<template>
  <div class="user-tags" :class="containerClass">
    <v-chip
      v-if="user.company?.name"
      size="small"
      color="primary"
      variant="tonal"
      class="company-tag"
    >
      <v-icon start size="16">mdi-office-building</v-icon>
      {{ user.company.name }}
    </v-chip>
    
    <v-chip
      v-if="user.address?.city"
      size="small"
      color="secondary"
      variant="tonal"
      class="location-tag"
    >
      <v-icon start size="16">mdi-map-marker</v-icon>
      {{ user.address.city }}
    </v-chip>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

interface Props {
  user: User
  containerClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  containerClass: ''
})
</script> 