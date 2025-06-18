<template>
  <div class="company-section">
    <h3 class="text-h6 mb-3 d-flex align-center section-title">
      <v-icon icon="mdi-office-building" class="mr-2" />
      Empresa y Ubicación
    </h3>
    
    <v-list density="compact" class="pa-0">
      <v-list-item v-if="user.company?.name" class="company-item" :style="{ animationDelay: '0.4s' }">
        <template #prepend>
          <v-icon icon="mdi-domain" color="secondary" />
        </template>
        <v-list-item-title class="text-dark">Compañía</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          {{ user.company.name }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item v-if="user.company?.catchPhrase" class="company-item" :style="{ animationDelay: '0.5s' }">
        <template #prepend>
          <v-icon icon="mdi-lightbulb" color="secondary" />
        </template>
        <v-list-item-title class="text-dark">Eslogan</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          "{{ user.company.catchPhrase }}"
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item v-if="formattedAddress" class="company-item" :style="{ animationDelay: '0.6s' }">
        <template #prepend>
          <v-icon icon="mdi-map-marker" color="secondary" />
        </template>
        <v-list-item-title class="text-dark">Dirección</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          {{ formattedAddress }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userService } from '@/services'
import type { User } from '@/types/user'

interface Props {
  user: User
}

const props = defineProps<Props>()

// 📍 Dirección formateada
const formattedAddress = computed(() => {
  return userService.formatAddress(props.user)
})
</script> 