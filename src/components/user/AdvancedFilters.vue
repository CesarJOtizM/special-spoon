<template>
  <v-expand-transition>
    <div v-if="show" class="advanced-filters mt-3">
      <v-row>
        <!-- Tipo de búsqueda -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.searchType"
            :items="searchTypeOptions"
            label="Buscar en"
            variant="outlined"
            density="compact"
            hide-details
            @update:model-value="handleFilterChange"
          />
        </v-col>

        <!-- Ordenar por -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.sortBy"
            :items="sortByOptions"
            label="Ordenar por"
            variant="outlined"
            density="compact"
            hide-details
            @update:model-value="handleFilterChange"
          />
        </v-col>

        <!-- Orden -->
        <v-col cols="12" sm="4">
          <v-select
            v-model="localFilters.sortOrder"
            :items="sortOrderOptions"
            label="Orden"
            variant="outlined"
            density="compact"
            hide-details
            @update:model-value="handleFilterChange"
          />
        </v-col>
      </v-row>

      <!-- Botón para limpiar filtros -->
      <div class="d-flex justify-end mt-2">
        <v-btn
          variant="text"
          size="small"
          @click="resetFilters"
        >
          <v-icon start>mdi-filter-off</v-icon>
          Limpiar filtros
        </v-btn>
      </div>
    </div>
  </v-expand-transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SearchFilters } from '@/composables/useSearch'

interface Props {
  show: boolean
  modelValue: SearchFilters
}

interface Emits {
  (event: 'update:modelValue', filters: SearchFilters): void
  (event: 'filter-change', filters: SearchFilters): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 🎛️ Estado local de filtros
const localFilters = ref<SearchFilters>({ ...props.modelValue })

// 🎛️ Opciones para los selectores
const searchTypeOptions = [
  { title: 'Todo', value: 'all' },
  { title: 'Nombre', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Compañía', value: 'company' }
]

const sortByOptions = [
  { title: 'Nombre', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Compañía', value: 'company' }
]

const sortOrderOptions = [
  { title: 'A-Z', value: 'asc' },
  { title: 'Z-A', value: 'desc' }
]

// 🔄 Sincronizar con prop modelValue
watch(() => props.modelValue, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

// 🎛️ Manejar cambios en filtros
const handleFilterChange = () => {
  emit('update:modelValue', { ...localFilters.value })
  emit('filter-change', { ...localFilters.value })
}

// 🧹 Resetear filtros
const resetFilters = () => {
  localFilters.value = {
    searchType: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  }
  emit('update:modelValue', { ...localFilters.value })
  emit('filter-change', { ...localFilters.value })
}
</script>

<style scoped>
.advanced-filters {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
  animation: slideInDown 0.3s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejoras responsive */
@media (max-width: 600px) {
  .advanced-filters {
    padding: 12px;
  }
}

/* Hover effects */
.advanced-filters :deep(.v-field) {
  transition: all 0.2s ease;
}

.advanced-filters :deep(.v-field:hover) {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.1);
}
</style> 