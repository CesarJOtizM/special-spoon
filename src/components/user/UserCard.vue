<template>
  <v-card
    class="user-card hover-lift card-enhanced square-card"
    :class="{ 'v-card--hover': true }"
    elevation="2"
    @click="$emit('openModal', user)"
  >
    <!-- Header de la card -->
    <div class="user-card-header">
      <div class="user-avatar-wrapper">
        <v-avatar
          :image="avatarUrl"
          :size="avatarSize"
          class="user-avatar"
        />
        <div class="user-status-indicator" />
      </div>
      
      <div class="user-info">
        <h3 class="user-name text-ellipsis">{{ user.name }}</h3>
        <p class="user-email text-ellipsis">{{ user.email }}</p>
        <p class="user-username text-ellipsis">@{{ user.username }}</p>
      </div>
    </div>

    <!-- Contenido de la card -->
    <v-card-text class="user-card-content">
      <!-- Tags de información -->
      <div class="user-tags">
        <v-chip
          size="small"
          color="primary"
          variant="tonal"
          class="company-tag"
        >
          <v-icon start size="16">mdi-office-building</v-icon>
          {{ user.company?.name }}
        </v-chip>
        
        <v-chip
          size="small"
          color="secondary"
          variant="tonal"
          class="location-tag"
        >
          <v-icon start size="16">mdi-map-marker</v-icon>
          {{ user.address?.city }}
        </v-chip>
      </div>

      <!-- Acciones -->
      <div class="user-actions">
        <v-btn
          variant="outlined"
          color="primary"
          block
          class="action-button"
          @click.stop="$emit('openModal', user)"
        >
          <v-icon start>mdi-eye</v-icon>
          Ver detalles
        </v-btn>
      </div>
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
  return mobile.value ? 60 : 72
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
/* Base card styles */
.user-card {
  cursor: pointer;
  height: 100%;
  min-height: 340px; /* Aumentar altura mínima para dar más espacio */
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg) !important;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  transition: all var(--duration-normal) var(--ease-in-out);
  /* Removemos aspect-ratio para permitir que el contenido determine la altura */
}

/* Modificador para tarjetas cuadradas */
.square-card {
  max-width: 280px; /* Ancho máximo para mantener proporción cuadrada */
  margin: 0 auto; /* Centrar la tarjeta */
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation-3);
  border-color: rgba(var(--v-theme-primary), 0.2);
}

/* Header styles */
.user-card-header {
  position: relative;
  padding: var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.05),
    rgba(var(--v-theme-secondary), 0.05)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 0 0 auto; /* No crecer ni encogerse, tamaño automático */
  min-height: 180px; /* Altura mínima fija para el header */
  justify-content: center; /* Centrar verticalmente */
}

.user-avatar-wrapper {
  position: relative;
  margin-bottom: var(--spacing-md);
  display: flex;
  justify-content: center; /* Centrar horizontalmente */
}

.user-avatar {
  border: 3px solid rgba(var(--v-theme-primary), 0.2);
  transition: border-color var(--duration-normal) ease;
  box-shadow: var(--elevation-1);
}

.user-card:hover .user-avatar {
  border-color: rgba(var(--v-theme-primary), 0.4);
}

.user-status-indicator {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgb(var(--v-theme-surface));
  background: rgb(var(--v-theme-success));
}

.user-info {
  width: 100%;
  text-align: center; /* Centrar todo el texto */
}

.user-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: var(--spacing-xs);
  line-height: var(--line-height-tight);
}

.user-email {
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: var(--font-size-sm);
  margin-bottom: var(--spacing-xs);
  line-height: var(--line-height-normal);
}

.user-username {
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
  line-height: var(--line-height-normal);
}

/* Content styles */
.user-card-content {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1; /* Tomar el espacio restante */
  min-height: 120px; /* Altura mínima para asegurar espacio para el botón */
  text-align: center; /* Centrar contenido */
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
  justify-content: center; /* Centrar los chips */
  flex: 0 0 auto; /* No crecer ni encogerse */
}

.user-tags .v-chip {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.user-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto; /* Empujar al final */
  flex: 0 0 auto; /* No crecer ni encogerse */
  padding-top: var(--spacing-sm); /* Espacio adicional arriba del botón */
}

.action-button {
  min-height: 44px; /* Aumentar altura mínima del botón */
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-normal) var(--ease-in-out);
  font-size: var(--font-size-sm);
  white-space: nowrap; /* Evitar que el texto se corte */
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-2);
}

/* Texto ellipsis */
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .square-card {
    max-width: 100%;
    min-height: 300px; /* Altura mínima en móviles */
  }
  
  .user-card-header {
    padding: var(--spacing-md);
    min-height: 160px; /* Altura mínima del header en móviles */
  }
  
  .user-card-content {
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
    min-height: 100px; /* Altura mínima del contenido en móviles */
  }
  
  .action-button {
    min-height: 40px; /* Altura del botón en móviles */
    font-size: var(--font-size-xs);
  }
}

/* Asegurar que en pantallas muy pequeñas el botón sea visible */
@media (max-width: 400px) {
  .user-card {
    min-height: 280px;
  }
  
  .user-card-header {
    min-height: 140px;
    padding: var(--spacing-sm);
  }
  
  .user-card-content {
    min-height: 90px;
    padding: var(--spacing-xs) var(--spacing-sm) var(--spacing-sm);
  }
}
</style> 