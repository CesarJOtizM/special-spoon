<template>
  <v-avatar
    :image="avatarUrl"
    :size="size"
    class="user-avatar"
   />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userService } from '@/services'
import type { User } from '@/types/user'

interface Props {
  user: User
  size?: number | string
  fallbackIcon?: string
  avatarClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 48,
  fallbackIcon: 'mdi-account',
  avatarClass: ''
})

// 🖼️ Avatar URL generada
const avatarUrl = computed(() => {
  return userService.generateAvatarUrl(props.user)
})

// 📏 Tamaño del icono de fallback
const iconSize = computed(() => {
  const size = typeof props.size === 'number' ? props.size : parseInt(props.size as string)
  return Math.floor(size * 0.6)
})
</script> 