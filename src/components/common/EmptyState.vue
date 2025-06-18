<template>
  <div class="empty-state text-center">
    <v-icon
      :icon="icon"
      :size="iconSize"
      :color="iconColor"
      class="mb-4"
    />
    <h3 class="text-h6 mb-2">
      {{ title }}
    </h3>
    <p class="text-body-1 text-medium-emphasis mb-4">
      {{ description }}
    </p>
    <v-btn
      v-if="actionText"
      :variant="actionVariant"
      :color="actionColor"
      @click="$emit('action')"
    >
      <v-icon v-if="actionIcon" start :icon="actionIcon" />
      {{ actionText }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  iconSize?: number | string
  iconColor?: string
  title: string
  description: string
  actionText?: string
  actionIcon?: string
  actionVariant?: 'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain'
  actionColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'mdi-information-outline',
  iconSize: 80,
  iconColor: 'medium-emphasis',
  actionVariant: 'outlined',
  actionColor: 'primary'
})

interface Emits {
  (event: 'action'): void
}

defineEmits<Emits>()
</script>

<style scoped>
.empty-state {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--spacing-xl);
}

.empty-state .v-icon {
  opacity: 0.6;
  transition: all 0.3s ease;
}

.empty-state:hover .v-icon {
  opacity: 1;
  transform: scale(1.05);
}
</style> 