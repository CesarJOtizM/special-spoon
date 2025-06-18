<template>
  <v-container fluid class="user-list-container">
    <!-- Barra de búsqueda -->
    <v-row class="mb-6">
      <v-col cols="12" md="8" lg="6" offset-md="2" offset-lg="3">
        <SearchBar
          v-model="searchQuery"
          @search="handleSearch"
        />
      </v-col>
    </v-row>

    <!-- Estadísticas y estado de la lista -->
    <v-row class="mb-4">
      <v-col cols="12">
        <div class="d-flex justify-space-between align-center flex-wrap">
          <div class="d-flex align-center">
            <h2 class="text-h5 mr-4">
              {{ hasUsers ? 'Usuarios' : 'Sin usuarios' }}
            </h2>
            <v-chip
              v-if="userCount > 0"
              color="primary"
              variant="tonal"
              size="small"
            >
              {{ userCount }} {{ userCount === 1 ? 'usuario' : 'usuarios' }}
            </v-chip>
          </div>
          
          <div class="d-flex align-center">
            <!-- Botón de recarga -->
            <v-btn
              v-if="hasUsers"
              icon="mdi-refresh"
              variant="text"
              :loading="loading"
              @click="refreshUsers"
            />
            
            <!-- Indicador de búsqueda activa -->
            <v-chip
              v-if="isSearchActive"
              color="secondary"
              variant="outlined"
              size="small"
              class="ml-2"
              closable
              @click:close="clearSearch"
            >
              <v-icon start icon="mdi-magnify" />
              "{{ searchQuery }}"
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Estado de carga inicial -->
    <v-row v-if="loading && !hasUsers" class="justify-center">
      <v-col cols="12" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          width="4"
          class="mb-4"
        />
        <h3 class="text-h6 text-medium-emphasis">
          Cargando usuarios...
        </h3>
        <p class="text-body-2 text-medium-emphasis">
          Por favor espera un momento
        </p>
      </v-col>
    </v-row>

    <!-- Mensaje de error -->
    <v-row v-else-if="hasError" class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <v-alert
          type="error"
          variant="tonal"
          prominent
          border="start"
          class="mb-4"
        >
          <template #title>
            <div class="d-flex align-center">
              <v-icon icon="mdi-alert-circle" class="mr-2" />
              Error al cargar usuarios
            </div>
          </template>
          
          <p class="mb-3">{{ error }}</p>
          
          <div class="mt-3">
            <v-btn
              variant="outlined"
              color="error"
              class="mr-2"
              @click="loadUsers"
            >
              Intentar nuevamente
            </v-btn>
            <v-btn
              variant="text"
              color="error"
              @click="clearError"
            >
              Ocultar
            </v-btn>
          </div>
        </v-alert>
      </v-col>
    </v-row>

    <!-- Mensaje cuando no hay resultados de búsqueda -->
    <v-row v-else-if="isSearchActive && userCount === 0" class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <EmptyState
          icon="mdi-account-search"
          title="No se encontraron usuarios"
          :description="`No hay usuarios que coincidan con '${searchQuery}'`"
          action-text="Limpiar búsqueda"
          action-icon="mdi-close"
          @action="clearSearch"
        />
      </v-col>
    </v-row>

    <!-- Grid de usuarios -->
    <v-row v-else-if="userCount > 0" class="user-grid justify-center">
      <v-col
        v-for="user in filteredUsers"
        :key="user.id"
   
      >
        <UserCard
          :user="user"
          :loading="loading"
          @open-modal="openUserModal"
          @click="handleUserClick"
        />
      </v-col>
    </v-row>

    <!-- Mensaje cuando no hay usuarios (estado inicial) -->
    <v-row v-else-if="!hasUsers && !loading && !hasError" class="justify-center">
      <v-col cols="12" md="8" lg="6">
        <EmptyState
          icon="mdi-account-group"
          title="No hay usuarios disponibles"
          description="No se pudieron cargar los usuarios del servidor"
          action-text="Cargar usuarios"
          action-icon="mdi-refresh"
          @action="loadUsers"
        />
      </v-col>
    </v-row>

    <!-- Modal de detalles del usuario -->
    <UserModal
      v-model="showModal"
      :user="selectedUser"
    />

    <!-- Indicador de carga flotante para actualizaciones -->
    <v-snackbar
      v-model="showRefreshMessage"
      timeout="2000"
      color="success"
      variant="tonal"
    >
      <v-icon start icon="mdi-check-circle" />
      Usuarios actualizados correctamente
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsers, useUIState } from '@/composables'
import { EmptyState } from '@/components/common'
import SearchBar from './SearchBar.vue'
import UserCard from './UserCard.vue'
import UserModal from './UserModal.vue'
import type { User } from '@/types/user'

// 🎯 Estado principal usando el composable
const {
  users,
  loading,
  error,
  searchQuery,
  filteredUsers,
  userCount,
  hasUsers,
  hasError,
  loadUsers,
  refreshUsers: composableRefreshUsers,
  searchUsers,
  clearSearch: composableClearSearch,
  clearError,
} = useUsers()

// 🎨 Estado de UI usando el nuevo composable
const {
  showModal,
  selectedItem: selectedUser,
  openModal,
  closeModal,
} = useUIState<User>()

// 🔄 Estado local del componente
const showRefreshMessage = ref(false)

// 📊 Estados computados
const isSearchActive = computed(() => {
  return searchQuery.value.trim().length > 0
})

// 🔍 Manejar búsqueda
const handleSearch = (query: string) => {
  console.log(`🔍 UserList: Búsqueda actualizada a "${query}"`)
  searchUsers(query)
}

// 🧹 Limpiar búsqueda
const clearSearch = () => {
  console.log('🧹 UserList: Limpiando búsqueda')
  composableClearSearch()
}

// 🔄 Refrescar usuarios con feedback
const refreshUsers = async () => {
  try {
    console.log('🔄 UserList: Refrescando usuarios')
    await composableRefreshUsers()
    showRefreshMessage.value = true
  } catch (err) {
    console.error('❌ Error al refrescar usuarios:', err)
  }
}

// 👤 Manejar click en usuario
const handleUserClick = (user: User) => {
  console.log(`👤 Usuario clickeado: ${user.name}`)
}

// 📖 Abrir modal de usuario
const openUserModal = (user: User) => {
  console.log(`📖 Abriendo modal para: ${user.name}`)
  openModal(user)
}

// 🚀 Cargar usuarios al montar el componente
onMounted(async () => {
  console.log('🚀 UserList montado, cargando usuarios...')
  await loadUsers()
})
</script>

<style scoped>
.user-list-container {
  min-height: 60vh;
}

/* Grid de usuarios mejorado */
.user-grid {
  display: flex;
  justify-content: center;
  gap: var(--spacing-lg);
}

.user-grid .v-col {
  display: flex;
  justify-content: center;
  align-items: stretch;
  max-width: 300px;
}

/* Animaciones de entrada escalonadas */
.user-card {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Espaciado responsive */
@media (max-width: 600px) {
  .user-list-container {
    padding: 8px 16px;
  }
  
  .user-grid {
    gap: var(--spacing-md);
  }
  
  .user-grid .v-col {
    max-width: 100%;
  }
}

@media (min-width: 1920px) {
  .user-list-container {
    max-width: 1600px;
    margin: 0 auto;
  }
  
  .user-grid .v-col {
    max-width: 280px;
  }
}

/* Estados vacíos más atractivos */
.empty-state {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Smooth transitions */
.v-row {
  transition: all 0.3s ease;
}

/* Loading overlay mejorado */
.loading-overlay {
  backdrop-filter: blur(2px);
}

/* Mejor centrado para pantallas grandes */
@media (min-width: 1400px) {
  .user-grid {
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style> 