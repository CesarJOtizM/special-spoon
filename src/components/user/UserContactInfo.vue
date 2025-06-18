<template>
  <div class="contact-section">
    <h3 class="text-h6 mb-3 d-flex align-center section-title">
      <v-icon icon="mdi-account-details" class="mr-2" />
      Información de Contacto
    </h3>
    
    <v-list density="compact" class="pa-0">
      <v-list-item :style="{ animationDelay: '0.1s' }">
        <template #prepend>
          <v-icon icon="mdi-phone" color="primary" />
        </template>
        <v-list-item-title class="text-dark">Teléfono</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          <a :href="`tel:${user.phone}`" class="contact-link">
            {{ user.phone }}
          </a>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item :style="{ animationDelay: '0.2s' }">
        <template #prepend>
          <v-icon icon="mdi-web" color="primary" />
        </template>
        <v-list-item-title class="text-dark">Sitio Web</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          <a 
            :href="`https://${user.website}`" 
            target="_blank" 
            rel="noopener noreferrer"
            class="contact-link"
          >
            {{ user.website }}
            <v-icon icon="mdi-open-in-new" size="small" class="ml-1" />
          </a>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item :style="{ animationDelay: '0.3s' }">
        <template #prepend>
          <v-icon icon="mdi-email" color="primary" />
        </template>
        <v-list-item-title class="text-dark">Email</v-list-item-title>
        <v-list-item-subtitle class="text-dark">
          <a :href="`mailto:${user.email}`" class="contact-link">
            {{ user.email }}
          </a>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

interface Props {
  user: User
}

defineProps<Props>()
</script> 