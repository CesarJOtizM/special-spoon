<template>
  <v-app>
    <!-- Header de la aplicación -->
    <v-app-bar
      color="primary"
      dark
      elevate-on-scroll
      height="64"
    >
      <v-app-bar-title class="d-flex align-center">
        <v-icon start icon="mdi-account-group" size="32" />
        <span class="text-h6 font-weight-bold">
          Directorio de Usuarios
        </span>
      </v-app-bar-title>
      
      <v-spacer />
      
      <!-- Información adicional en el header -->
      <div class="d-none d-sm-flex align-center text-body-2 opacity-80">
        <v-icon icon="mdi-web" size="small" class="mr-1" />
        Prueba Técnica Vue 3
      </div>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <UserList />
    </v-main>

    <!-- Footer opcional -->
    <v-footer
      color="surface-variant"
      class="text-center pa-4"
    >
      <div class="text-body-2 text-medium-emphasis">
        <v-icon icon="mdi-vuejs" size="small" class="mr-1" />
        Desarrollado con Vue 3 + Vuetify 3
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { UserList } from '@/components/user'

console.log('🚀 App.vue iniciado con UserList')
</script>

<style scoped>
/* Asegurar que el contenido principal use toda la altura disponible */
:deep(.v-main) {
  min-height: calc(100vh - 64px - 64px); /* Header + Footer */
}

/* Mejoras en el header */
.v-app-bar-title {
  user-select: none;
}

/* Animación sutil en el título */
.v-app-bar-title:hover {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}
</style>
