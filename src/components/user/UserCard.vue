<template>
  <v-card
    class="user-card hover-lift card-enhanced"
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
/* Base card styles */
.user-card {
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg) !important;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--elevation-3);
  border-color: rgba(var(--v-theme-primary), 0.2);
}

/* Header styles */
.user-card-header {
  position: relative;
  padding: var(--spacing-xl) var(--spacing-lg);
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.05),
    rgba(var(--v-theme-secondary), 0.05)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-avatar-wrapper {
  position: relative;
  margin-bottom: var(--spacing-lg);
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
}

.user-username {
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
  margin: 0;
}

/* Content styles */
.user-card-content {
  padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-xl) var(--spacing-lg) !important;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.user-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  justify-content: center;
}

.company-tag {
  background: rgba(var(--v-theme-primary), 0.1) !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.location-tag {
  background: rgba(var(--v-theme-secondary), 0.1) !important;
  color: rgb(var(--v-theme-secondary)) !important;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.user-actions {
  margin-top: auto;
}

.action-button {
  min-height: var(--button-height-md);
  border-radius: var(--border-radius-md) !important;
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-normal) var(--ease-in-out);
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-2);
}

/* Animaciones */
.user-card {
  animation: fadeInUp var(--duration-slow) var(--ease-out);
}

.card-enhanced {
  will-change: transform;
  transform: translateZ(0);
}

/* Responsive */
@media (max-width: 599px) {
  .user-card-header {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .user-card-content {
    padding: var(--spacing-lg) var(--spacing-md) !important;
  }
  
  .user-card:hover {
    transform: translateY(-2px);
  }
  
  .user-name {
    font-size: var(--font-size-base);
  }
  
  .user-avatar-wrapper {
    margin-bottom: var(--spacing-md);
  }
}

/* Accesibilidad */
.user-card:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
  border-radius: var(--border-radius-md);
}

/* Estados de loading */
.v-overlay {
  border-radius: var(--border-radius-lg);
}

/* Optimizaciones de performance */
@media (prefers-reduced-motion: reduce) {
  .user-card,
  .user-avatar,
  .action-button {
    transition: none;
  }
}
</style> 