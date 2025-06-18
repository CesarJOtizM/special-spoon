<template>
  <v-dialog
    v-model="dialogVisible"
    max-width="700"
    transition="dialog-transition"
    scrollable
    @click:outside="closeModal"
    @keydown.esc="closeModal"
  >
    <v-card v-if="user" class="user-modal">
      <!-- Header del modal con animación -->
      <v-card-title class="modal-header d-flex justify-space-between align-center pa-4 bg-primary">
        <div class="d-flex align-center">
          <UserAvatar
            :user="user"
            size="48"
            class="mr-3 modal-avatar-header"
          />
          <div class="header-text">
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
          class="close-btn"
          @click="closeModal"
        />
      </v-card-title>

      <!-- Contenido del modal con animaciones escalonadas -->
      <v-card-text class="pa-0">
        <v-container class="pa-4">
          <!-- Avatar principal centrado -->
          <v-row class="mb-4">
            <v-col cols="12" class="text-center">
              <UserAvatar
                :user="user"
                size="120"
                class="mb-3 user-modal-avatar main-avatar"
              />
              <h2 class="text-h5 mb-1 user-name">{{ user.name }}</h2>
              <p class="text-body-1 text-medium-emphasis user-email">{{ user.email }}</p>
            </v-col>
          </v-row>

          <!-- Información detallada con animación staggered -->
          <v-row>
            <!-- Columna izquierda: Contacto -->
            <v-col cols="12" md="6" class="text-dark">
              <UserContactInfo :user="user" />
            </v-col>

            <!-- Columna derecha: Empresa y Dirección -->
            <v-col cols="12" md="6" class="text-dark">
              <UserCompanyInfo :user="user" />
            </v-col>
          </v-row>

          <!-- Información adicional con animación -->
          <v-row v-if="user.company?.bs" class="mt-2">
            <v-col cols="12">
              <v-card variant="tonal" color="info" class="business-card">
                <v-card-text class="text-dark">
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
      <v-card-actions class="modal-footer pa-4 bg-surface-variant">
        <v-spacer />
        <v-btn
          color="primary"
          variant="text"
          class="close-footer-btn"
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
import UserAvatar from '@/components/common/UserAvatar.vue'
import UserContactInfo from './UserContactInfo.vue'
import UserCompanyInfo from './UserCompanyInfo.vue'
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