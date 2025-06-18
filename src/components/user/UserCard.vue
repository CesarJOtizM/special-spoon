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