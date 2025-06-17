<template>
  <v-card
    class="user-card"
    :class="{ 'user-card--mobile': $vuetify.display.mobile }"
    elevation="2"
    hover
    @click="handleCardClick"
  >
    <v-card-text class="pa-4">
      <!-- Avatar y información básica -->
      <div class="d-flex align-center mb-3">
        <v-avatar
          :image="avatarUrl"
          :size="avatarSize"
          class="mr-4 user-avatar"
        >
          <v-icon v-if="!avatarUrl" icon="mdi-account" />
        </v-avatar>
        
        <div class="flex-grow-1 min-width-0">
          <h3 class="text-h6 text-truncate mb-1">
            {{ user.name }}
          </h3>
          <p class="text-body-2 text-medium-emphasis text-truncate mb-1">
            {{ user.email }}
          </p>
          <p class="text-caption text-medium-emphasis text-truncate">
            @{{ user.username }}
          </p>
        </div>
      </div>

      <!-- Información adicional -->
      <div class="user-info mb-3">
        <v-chip
          v-if="user.company?.name"
          size="small"
          variant="tonal"
          color="primary"
          class="mr-2 mb-1"
          prepend-icon="mdi-office-building"
        >
          {{ user.company.name }}
        </v-chip>
        
        <v-chip
          v-if="user.address?.city"
          size="small"
          variant="tonal"
          color="secondary"
          class="mb-1"
          prepend-icon="mdi-map-marker"
        >
          {{ user.address.city }}
        </v-chip>
      </div>

      <!-- Botón de acción -->
      <v-btn
        variant="outlined"
        color="primary"
        block
        prepend-icon="mdi-eye"
        @click.stop="handleViewMore"
      >
        Ver más detalles
      </v-btn>
    </v-card-text>

    <!-- Indicador de carga -->
    <v-overlay
      v-if="loading"
      contained
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="48"
      />
    </v-overlay>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { userService } from '@/services'
import type { User } from '@/types/user'

interface Props {
  user: User
  loading?: boolean
}

interface Emits {
  (event: 'openModal', user: User): void
  (event: 'click', user: User): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// 📱 Responsive
const { mobile } = useDisplay()

// 🖼️ Avatar URL generada
const avatarUrl = computed(() => {
  return userService.generateAvatarUrl(props.user)
})

// 📏 Tamaño responsive del avatar
const avatarSize = computed(() => {
  return mobile.value ? 56 : 64
})

// 🎯 Manejar click en la tarjeta
const handleCardClick = () => {
  emit('click', props.user)
  handleViewMore()
}

// 👁️ Manejar ver más detalles
const handleViewMore = () => {
  console.log(`🔍 Abriendo modal para usuario: ${props.user.name}`)
  emit('openModal', props.user)
}
</script>

<style scoped>
.user-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.user-card--mobile {
  margin-bottom: 12px;
}

.user-avatar {
  border: 2px solid rgba(var(--v-theme-primary), 0.1);
  transition: border-color 0.3s ease;
}

.user-card:hover .user-avatar {
  border-color: rgba(var(--v-theme-primary), 0.3);
}

.user-info {
  min-height: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

/* Animación de entrada */
.user-card {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Optimizaciones móviles */
@media (max-width: 600px) {
  .user-card {
    margin-bottom: 8px;
  }
  
  .user-card .v-card-text {
    padding: 12px !important;
  }
  
  .user-card:hover {
    transform: translateY(-2px);
  }
}

/* Accesibilidad */
.user-card:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

/* Prevenir overflow en textos largos */
.min-width-0 {
  min-width: 0;
}
</style> 