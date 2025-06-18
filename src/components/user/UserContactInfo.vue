<template>
  <div class="contact-section">
    <h3 class="text-h6 mb-3 d-flex align-center section-title">
      <v-icon icon="mdi-account-details" class="mr-2" />
      Información de Contacto
    </h3>
    
    <v-list density="compact" class="pa-0">
      <v-list-item class="contact-item" :style="{ animationDelay: '0.1s' }">
        <template #prepend>
          <v-icon icon="mdi-phone" color="primary" />
        </template>
        <v-list-item-title>Teléfono</v-list-item-title>
        <v-list-item-subtitle>
          <a :href="`tel:${user.phone}`" class="contact-link">
            {{ user.phone }}
          </a>
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item class="contact-item" :style="{ animationDelay: '0.2s' }">
        <template #prepend>
          <v-icon icon="mdi-web" color="primary" />
        </template>
        <v-list-item-title>Sitio Web</v-list-item-title>
        <v-list-item-subtitle>
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

      <v-list-item class="contact-item" :style="{ animationDelay: '0.3s' }">
        <template #prepend>
          <v-icon icon="mdi-email" color="primary" />
        </template>
        <v-list-item-title>Email</v-list-item-title>
        <v-list-item-subtitle>
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

<style scoped>
.contact-section {
  animation: fadeInLeft 0.4s ease-out 0.5s both;
}

.section-title {
  animation: fadeInLeft 0.4s ease-out 0.2s both;
}

.contact-item {
  animation: slideInRight 0.4s ease-out both;
  opacity: 0;
}

.contact-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.contact-link:hover {
  color: rgb(var(--v-theme-primary-darken-1));
  transform: translateX(4px);
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 100%;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style> 