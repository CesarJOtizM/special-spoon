<template>
  <div class="user-info" :class="containerClass">
    <h3 class="user-name text-ellipsis" :class="nameClass">
      {{ user.name }}
    </h3>
    <p v-if="showEmail" class="user-email text-ellipsis" :class="emailClass">
      {{ user.email }}
    </p>
    <p v-if="showUsername" class="user-username text-ellipsis" :class="usernameClass">
      @{{ user.username }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

interface Props {
  user: User
  showEmail?: boolean
  showUsername?: boolean
  containerClass?: string
  nameClass?: string
  emailClass?: string
  usernameClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  showEmail: true,
  showUsername: true,
  containerClass: '',
  nameClass: '',
  emailClass: '',
  usernameClass: ''
})
</script> 