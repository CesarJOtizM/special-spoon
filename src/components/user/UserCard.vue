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
        <UserAvatar
          :user="user"
          :size="avatarSize"
          class="user-avatar"
        />
        <div class="user-status-indicator" />
      </div>
      
      <UserInfo
        :user="user"
        class="user-info"
      />
    </div>

    <!-- Contenido de la card -->
    <v-card-text class="user-card-content">
      <!-- Tags de información -->
      <UserTags
        :user="user"
        class="user-tags"
      />

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
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import UserAvatar from '@/components/common/UserAvatar.vue'
import UserInfo from '@/components/common/UserInfo.vue'
import UserTags from '@/components/common/UserTags.vue'
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

// 📏 Tamaño responsive del avatar
const avatarSize = computed(() => {
  return mobile.value ? 60 : 72
})
</script>

<style scoped>
/* Base card styles */
.user-card {
  cursor: pointer;
  height: 100%;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg) !important;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  transition: all var(--duration-normal) var(--ease-in-out);
}

/* Modificador para tarjetas cuadradas */
.square-card {
  max-width: 280px;
  margin: 0 auto;
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
  flex: 0 0 auto;
  min-height: 180px;
  justify-content: center;
}

.user-avatar-wrapper {
  position: relative;
  margin-bottom: var(--spacing-md);
  display: flex;
  justify-content: center;
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

/* Content styles */
.user-card-content {
  padding: var(--spacing-md) var(--spacing-lg) var(--spacing-lg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 120px;
  text-align: center;
}

.user-actions {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: auto;
  flex: 0 0 auto;
  padding-top: var(--spacing-sm);
}

.action-button {
  min-height: 44px;
  border-radius: var(--border-radius-md);
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-normal) var(--ease-in-out);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--elevation-2);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .square-card {
    max-width: 100%;
    min-height: 300px;
  }
  
  .user-card-header {
    padding: var(--spacing-md);
    min-height: 160px;
  }
  
  .user-card-content {
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
    min-height: 100px;
  }
  
  .action-button {
    min-height: 40px;
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