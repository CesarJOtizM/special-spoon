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

    <!-- ��️ Filtros avanzados -->
    <AdvancedFilters
      :show="showAdvancedFilters"
      :model-value="filters"
      @update:model-value="handleFiltersUpdate"
      @filter-change="handleFilterChange"
    />

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
import AdvancedFilters from './AdvancedFilters.vue'

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

// 🎛️ Manejar actualización de filtros
const handleFiltersUpdate = (newFilters: SearchFilters) => {
  filters.value = newFilters
}

// 🎛️ Manejar cambios en filtros
const handleFilterChange = (newFilters: SearchFilters) => {
  emit('filter-change', newFilters)
}

// 🔧 Toggle filtros avanzados
const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
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

/* Mejoras responsive */
@media (max-width: 600px) {
  .search-bar :deep(.v-field__input) {
    font-size: 16px; /* Evita zoom en iOS */
  }
}
</style> 