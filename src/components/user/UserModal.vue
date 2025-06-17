<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="700"
    transition="dialog-bottom-transition"
    scrollable
    @click:outside="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card v-if="user" class="user-modal">
      <!-- Header del modal -->
      <v-card-title class="d-flex justify-space-between align-center pa-4 bg-primary">
        <div class="d-flex align-center">
          <v-avatar
            :image="avatarUrl"
            size="48"
            class="mr-3"
          >
            <v-icon v-if="!avatarUrl" icon="mdi-account" />
          </v-avatar>
          <div>
            <h2 class="text-h6 text-white">{{ user.name }}</h2>
            <p class="text-body-2 text-white opacity-80">
              @{{ user.username }}
            </p>
          </div>
        </div>
        
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          @click="closeModal"
        />
      </v-card-title>

      <!-- Contenido del modal -->
      <v-card-text class="pa-0">
        <v-container class="pa-4">
          <!-- Avatar principal centrado -->
          <v-row class="mb-4">
            <v-col cols="12" class="text-center">
              <v-avatar
                :image="avatarUrl"
                size="120"
                class="mb-3 user-modal-avatar"
              >
                <v-icon v-if="!avatarUrl" icon="mdi-account" size="60" />
              </v-avatar>
              <h2 class="text-h5 mb-1">{{ user.name }}</h2>
              <p class="text-body-1 text-medium-emphasis">{{ user.email }}</p>
            </v-col>
          </v-row>

          <!-- Información detallada -->
          <v-row>
            <!-- Columna izquierda: Contacto -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 d-flex align-center">
                <v-icon icon="mdi-account-details" class="mr-2" />
                Información de Contacto
              </h3>
              
              <v-list density="compact" class="pa-0">
                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-phone" color="primary" />
                  </template>
                  <v-list-item-title>Teléfono</v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="`tel:${user.phone}`" class="text-decoration-none">
                      {{ user.phone }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-web" color="primary" />
                  </template>
                  <v-list-item-title>Sitio Web</v-list-item-title>
                  <v-list-item-subtitle>
                    <a 
                      :href="`https://${user.website}`" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-decoration-none"
                    >
                      {{ user.website }}
                      <v-icon icon="mdi-open-in-new" size="small" class="ml-1" />
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item>
                  <template #prepend>
                    <v-icon icon="mdi-email" color="primary" />
                  </template>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="`mailto:${user.email}`" class="text-decoration-none">
                      {{ user.email }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <!-- Columna derecha: Empresa y Dirección -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 d-flex align-center">
                <v-icon icon="mdi-office-building" class="mr-2" />
                Empresa y Ubicación
              </h3>
              
              <v-list density="compact" class="pa-0">
                <v-list-item v-if="user.company?.name">
                  <template #prepend>
                    <v-icon icon="mdi-domain" color="secondary" />
                  </template>
                  <v-list-item-title>Compañía</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.company.name }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="user.company?.catchPhrase">
                  <template #prepend>
                    <v-icon icon="mdi-lightbulb" color="secondary" />
                  </template>
                  <v-list-item-title>Eslogan</v-list-item-title>
                  <v-list-item-subtitle>
                    "{{ user.company.catchPhrase }}"
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="formattedAddress">
                  <template #prepend>
                    <v-icon icon="mdi-map-marker" color="secondary" />
                  </template>
                  <v-list-item-title>Dirección</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ formattedAddress }}
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>

          <!-- Información adicional -->
          <v-row v-if="user.company?.bs" class="mt-2">
            <v-col cols="12">
              <v-card variant="tonal" color="info">
                <v-card-text>
                  <h4 class="text-subtitle-1 mb-2 d-flex align-center">
                    <v-icon icon="mdi-briefcase" class="mr-2" />
                    Actividad Empresarial
                  </h4>
                  <p class="text-body-2 mb-0">{{ user.company.bs }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <!-- Footer del modal -->
      <v-card-actions class="pa-4 bg-surface-variant">
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          @click="closeModal"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { userService } from '@/services'
import type { User } from '@/types/user'

interface Props {
  modelValue: boolean
  user: User | null
}

interface Emits {
  (event: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// 🔄 Computed para el v-model del dialog
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value)
})

// 🖼️ Avatar URL generada
const avatarUrl = computed(() => {
  return props.user ? userService.generateAvatarUrl(props.user) : ''
})

// 📍 Dirección formateada
const formattedAddress = computed(() => {
  return props.user ? userService.formatAddress(props.user) : ''
})

// 🚪 Cerrar modal
const closeModal = () => {
  dialogVisible.value = false
}

// 🔄 Watcher para logging cuando se abre/cierra el modal
watch(dialogVisible, (isOpen) => {
  if (isOpen && props.user) {
    console.log(`📖 Modal abierto para usuario: ${props.user.name}`)
  } else if (!isOpen) {
    console.log('📖 Modal cerrado')
  }
})
</script>

<style scoped>
.user-modal {
  animation: modalEnter 0.3s ease-out;
}

.user-modal-avatar {
  border: 4px solid rgba(var(--v-theme-primary), 0.1);
  transition: border-color 0.3s ease;
}

.user-modal-avatar:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Links con hover */
a {
  color: rgb(var(--v-theme-primary));
  transition: color 0.2s ease;
}

a:hover {
  color: rgb(var(--v-theme-primary-darken-1));
}

/* Responsive */
@media (max-width: 960px) {
  .user-modal {
    margin: 16px;
    max-height: calc(100vh - 32px);
  }
}

@media (max-width: 600px) {
  .user-modal {
    margin: 8px;
    max-height: calc(100vh - 16px);
  }
  
  .user-modal-avatar {
    width: 100px !important;
    height: 100px !important;
  }
}

/* Accesibilidad */
.user-modal:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

/* Scrollbar personalizado */
:deep(.v-card-text) {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-primary), 0.3) transparent;
}

:deep(.v-card-text::-webkit-scrollbar) {
  width: 6px;
}

:deep(.v-card-text::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.v-card-text::-webkit-scrollbar-thumb) {
  background-color: rgba(var(--v-theme-primary), 0.3);
  border-radius: 3px;
}
</style> 