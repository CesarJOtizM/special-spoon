<template>
  <v-app class="app-container">
    <!-- Header de la aplicación -->
    <v-app-bar
      :elevation="2"
      color="primary"
      dark
      app
      class="app-header-enhanced"
    >
      <div class="header-content w-100">
        <div class="header-brand">
          <v-icon size="32" class="brand-icon">
            mdi-account-group
          </v-icon>
          <span class="brand-text">
            Directorio de Usuarios
          </span>
        </div>
        
        <div class="header-info d-none d-md-flex">
          <v-icon size="20" class="info-icon">
            mdi-api
          </v-icon>
          <span>JSONPlaceholder API</span>
        </div>
      </div>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main class="main-content">
      <v-container class="container-responsive" fluid>
        <!-- Hero Section Responsive -->
        <section class="hero-responsive py-4 py-md-8">
          <v-row justify="center">
            <v-col cols="12" md="10" lg="8" class="text-center">
              <h1 class="hero-title mb-3 mb-md-4">
                Explora Nuestro Directorio
              </h1>
              <p class="hero-subtitle text-body-1 text-md-h6 mb-6 mb-md-8">
                Conoce a nuestro increíble equipo de usuarios de todo el mundo.
                Busca, filtra y descubre información detallada de cada persona.
              </p>
            </v-col>
          </v-row>
        </section>

        <!-- Componente principal de usuarios -->
        <UserList class="user-list-section" />

        <!-- Sección de estadísticas (opcional) -->
        <section class="stats-section py-8 py-md-12 d-none d-lg-block">
          <v-row justify="center">
            <v-col cols="12" lg="8">
              <v-card class="stats-card pa-6" elevation="3">
                <v-row align="center">
                  <v-col cols="12" md="4" class="text-center">
                    <div class="stat-item">
                      <v-icon size="40" color="primary" class="mb-2">
                        mdi-account-multiple
                      </v-icon>
                      <div class="stat-number text-h4 font-weight-bold primary--text">
                        10+
                      </div>
                      <div class="stat-label text-body-2 text--secondary">
                        Usuarios Registrados
                      </div>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="4" class="text-center">
                    <div class="stat-item">
                      <v-icon size="40" color="success" class="mb-2">
                        mdi-earth
                      </v-icon>
                      <div class="stat-number text-h4 font-weight-bold success--text">
                        5+
                      </div>
                      <div class="stat-label text-body-2 text--secondary">
                        Países Representados
                      </div>
                    </div>
                  </v-col>
                  
                  <v-col cols="12" md="4" class="text-center">
                    <div class="stat-item">
                      <v-icon size="40" color="info" class="mb-2">
                        mdi-office-building
                      </v-icon>
                      <div class="stat-number text-h4 font-weight-bold info--text">
                        10+
                      </div>
                      <div class="stat-label text-body-2 text--secondary">
                        Empresas Diferentes
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-container>
    </v-main>

    <!-- Footer de la aplicación -->
    <v-footer
      color="grey-lighten-4"
      class="app-footer"
    >
      <v-container class="container-responsive">
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <div class="footer-brand d-flex align-center justify-center justify-md-start">
              <v-icon size="20" class="mr-2" color="primary">
                mdi-account-group
              </v-icon>
              <span class="font-weight-medium">
                Directorio de Usuarios
              </span>
            </div>
            <p class="text-body-2 text--secondary mt-1 mb-0">
              Una aplicación Vue 3 + Vuetify 3 moderna y responsive
            </p>
          </v-col>
          
          <v-col cols="12" md="6" class="text-center text-md-right">
            <div class="footer-info">
              <p class="text-body-2 text--secondary mb-1">
                Desarrollado con ❤️ usando:
              </p>
              <v-chip-group class="justify-center justify-md-end">
                <v-chip size="small" color="success" variant="outlined">
                  <v-icon start size="16">mdi-vuejs</v-icon>
                  Vue 3
                </v-chip>
                <v-chip size="small" color="primary" variant="outlined">
                  <v-icon start size="16">mdi-material-design</v-icon>
                  Vuetify 3
                </v-chip>
                <v-chip size="small" color="info" variant="outlined">
                  <v-icon start size="16">mdi-language-typescript</v-icon>
                  TypeScript
                </v-chip>
              </v-chip-group>
            </div>
          </v-col>
        </v-row>
        
        <!-- Línea divisoria -->
        <v-divider class="my-4"></v-divider>
        
        <!-- Copyright y links -->
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" class="text-center text-md-left">
            <p class="text-body-2 text--secondary mb-0">
              © {{ new Date().getFullYear() }} Directorio de Usuarios. 
              Datos proporcionados por 
              <a 
                href="https://jsonplaceholder.typicode.com" 
                target="_blank" 
                class="text-decoration-none primary--text"
              >
                JSONPlaceholder
              </a>
            </p>
          </v-col>
          
          <v-col cols="12" md="6" class="text-center text-md-right">
            <div class="footer-social">
              <v-btn
                icon
                size="small"
                variant="text"
                color="primary"
                href="https://github.com"
                target="_blank"
                class="mx-1"
              >
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="primary"
                href="https://vuejs.org"
                target="_blank"
                class="mx-1"
              >
                <v-icon>mdi-vuejs</v-icon>
              </v-btn>
              <v-btn
                icon
                size="small"
                variant="text"
                color="primary"
                href="https://vuetifyjs.com"
                target="_blank"
                class="mx-1"
              >
                <v-icon>mdi-material-design</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>

    <!-- Snackbar global para notificaciones -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="4000"
      :color="snackbarColor"
      location="bottom right"
      variant="elevated"
    >
      <div class="d-flex align-center">
        <v-icon :icon="snackbarIcon" class="mr-3" />
        {{ snackbarMessage }}
      </div>
      <template #actions>
        <v-btn
          variant="text"
          @click="showSnackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UserList from '@/components/user/UserList.vue'

// Estado para snackbar global
const showSnackbar = ref(false)
const snackbarMessage = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle')

// Función para mostrar notificaciones globales
const showNotification = (message: string, color: string = 'success') => {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbarIcon.value = color === 'error' ? 'mdi-alert-circle' : 
                      color === 'warning' ? 'mdi-alert' : 
                      'mdi-check-circle'
  showSnackbar.value = true
}

// Mensaje de bienvenida al cargar la app
onMounted(() => {
  setTimeout(() => {
    showNotification('¡Bienvenido al Directorio de Usuarios!', 'info')
  }, 1500)
})

// Exponer función para uso desde otros componentes si es necesario
defineExpose({
  showNotification
})
</script>

