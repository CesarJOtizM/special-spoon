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

<style scoped>
.user-info {
  width: 100%;
  text-align: center;
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

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
</style> 