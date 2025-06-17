<template>
  <div class="search-container">
    <!-- 🔍 Campo de búsqueda principal -->
    <v-text-field
      v-model="localSearchQuery"
      :label="placeholder"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      hide-details
      density="comfortable"
      class="search-bar"
      @input="handleSearch"
      @click:clear="handleClear"
    >
      <template #append-inner>
        <v-fade-transition>
          <v-progress-circular
            v-if="isSearching"
            size="20"
            width="2"
            color="primary"
            indeterminate
          />
        </v-fade-transition>
      </template>
    </v-text-field>

    <!-- 🎛️ Filtros avanzados (colapsables) -->
    <v-expand-transition>
      <div v-if="showAdvancedFilters" class="advanced-filters mt-3">
        <v-row>
          <!-- Tipo de búsqueda -->
          <v-col cols="12" sm="4">
            <v-select
              v-model="filters.searchType"
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
              v-model="filters.sortBy"
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
              v-model="filters.sortOrder"
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

    <!-- 🔧 Toggle para filtros avanzados -->
    <div class="d-flex justify-space-between align-center mt-2">
      <v-btn
        variant="text"
        size="small"
        @click="toggleAdvancedFilters"
      >
        <v-icon start>
          {{ showAdvancedFilters ? 'mdi-chevron-up' : 'mdi-tune' }}
        </v-icon>
        {{ showAdvancedFilters ? 'Ocultar' : 'Mostrar' }} filtros
      </v-btn>

      <!-- Contador de resultados -->
      <v-chip
        v-if="resultsCount !== null"
        size="small"
        color="primary"
        variant="tonal"
      >
        {{ resultsCount }} resultado{{ resultsCount !== 1 ? 's' : '' }}
      </v-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearch, type SearchFilters } from '@/composables'

interface Props {
  placeholder?: string
  modelValue?: string
  resultsCount?: number | null
}

interface Emits {
  (event: 'search', query: string): void
  (event: 'update:modelValue', value: string): void
  (event: 'filter-change', filters: SearchFilters): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar usuarios por nombre, email o usuario...',
  modelValue: '',
  resultsCount: null
})

const emit = defineEmits<Emits>()

// 🔍 Usar composable de búsqueda con debounce
const { searchQuery, debouncedQuery, isSearching, filters, setSearchQuery, clearSearch } = useSearch()

// 📱 Estado local
const localSearchQuery = ref(props.modelValue)
const showAdvancedFilters = ref(false)

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
watch(() => props.modelValue, (newValue) => {
  localSearchQuery.value = newValue
  setSearchQuery(newValue)
})

// 🔄 Emitir cuando cambie la búsqueda con debounce
watch(debouncedQuery, (newQuery) => {
  emit('search', newQuery)
  emit('update:modelValue', newQuery)
})

// 🔄 Emitir cuando cambien los filtros
watch(filters, (newFilters) => {
  emit('filter-change', newFilters)
}, { deep: true })

// 📝 Manejar cambios en el input
const handleSearch = () => {
  setSearchQuery(localSearchQuery.value)
}

// 🧹 Manejar limpieza del campo
const handleClear = () => {
  localSearchQuery.value = ''
  clearSearch()
  emit('search', '')
  emit('update:modelValue', '')
}

// 🎛️ Manejar cambios en filtros
const handleFilterChange = () => {
  emit('filter-change', filters.value)
}

// 🔧 Toggle filtros avanzados
const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
}

// 🧹 Resetear filtros
const resetFilters = () => {
  filters.value = {
    searchType: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  }
  emit('filter-change', filters.value)
}
</script>

<style scoped>
.search-container {
  width: 100%;
}

.search-bar {
  transition: all 0.3s ease;
}

.search-bar:focus-within {
  transform: scale(1.02);
}

.advanced-filters {
  background: rgba(var(--v-theme-surface-variant), 0.5);
  border-radius: 8px;
  padding: 16px;
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
}

/* Animaciones para los filtros */
.advanced-filters {
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
  .search-bar :deep(.v-field__input) {
    font-size: 16px; /* Evita zoom en iOS */
  }
  
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