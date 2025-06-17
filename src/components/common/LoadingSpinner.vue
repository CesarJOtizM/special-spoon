<template>
  <div class="loading-spinner-container">
    <!-- Skeleton Mode -->
    <div v-if="skeleton" class="skeleton-container">
      <div v-for="item in skeletonCount" :key="item" class="skeleton-item">
        <v-skeleton-loader
          :type="skeletonType"
          :loading="true"
          class="mb-3"
        />
      </div>
    </div>
    
    <!-- Normal Spinner Mode -->
    <div v-else class="spinner-content">
      <v-progress-circular
        :size="size"
        :width="width"
        :color="color"
        indeterminate
        class="loading-spinner mb-4"
      />
      
      <div v-if="title" class="loading-text">
        {{ title }}
      </div>
      
      <div v-if="subtitle" class="loading-subtitle">
        {{ subtitle }}
      </div>
      
      <!-- Dots animados opcionales -->
      <div v-if="showDots" class="loading-dots mt-2">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: string | number
  width?: string | number
  color?: string
  title?: string
  subtitle?: string
  showDots?: boolean
  skeleton?: boolean
  skeletonType?: string
  skeletonCount?: number
}

withDefaults(defineProps<Props>(), {
  size: 64,
  width: 4,
  color: 'primary',
  title: 'Cargando...',
  subtitle: '',
  showDots: false,
  skeleton: false,
  skeletonType: 'card',
  skeletonCount: 3
})
</script>

<style scoped>
.loading-spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: var(--spacing-xl);
  text-align: center;
}

.spinner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.skeleton-container {
  width: 100%;
  max-width: 600px;
}

.skeleton-item {
  margin-bottom: 16px;
}

.loading-spinner {
  margin-bottom: var(--spacing-md);
}

.loading-text {
  color: rgb(var(--v-theme-on-surface));
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  margin-bottom: var(--spacing-sm);
}

.loading-subtitle {
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: var(--font-size-sm);
  max-width: 300px;
  line-height: var(--line-height-relaxed);
}

.loading-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  animation: pulse 1.5s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0s; }
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

/* Responsive */
@media (max-width: 600px) {
  .loading-spinner-container {
    min-height: 150px;
    padding: var(--spacing-lg);
  }
  
  .loading-text {
    font-size: var(--font-size-sm);
  }
  
  .loading-subtitle {
    font-size: var(--font-size-xs);
  }
}

/* Performance */
.loading-spinner,
.dot {
  will-change: transform, opacity;
}
</style> 