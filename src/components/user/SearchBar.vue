<template>
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSearch } from '@/composables'

interface Props {
  placeholder?: string
  modelValue?: string
}

interface Emits {
  (event: 'search', query: string): void
  (event: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar usuarios por nombre, email o usuario...',
  modelValue: ''
})

const emit = defineEmits<Emits>()

// 🔍 Usar composable de búsqueda con debounce
const { searchQuery, debouncedQuery, isSearching, setSearchQuery, clearSearch } = useSearch()

// 📱 Estado local para el v-model
const localSearchQuery = ref(props.modelValue)

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
</script>

<style scoped>
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