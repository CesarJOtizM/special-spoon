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
            <v-col cols="12" md="6">
              <UserContactInfo :user="user" />
            </v-col>

            <!-- Columna derecha: Empresa y Dirección -->
            <v-col cols="12" md="6">
              <UserCompanyInfo :user="user" />
            </v-col>
          </v-row>

          <!-- Información adicional con animación -->
          <v-row v-if="user.company?.bs" class="mt-2">
            <v-col cols="12">
              <v-card variant="tonal" color="info" class="business-card">
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

<style scoped>
/* 🎬 Animaciones principales del modal */
.user-modal {
  animation: modalEnter 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.modal-header {
  animation: slideInFromTop 0.4s ease-out;
}

.modal-footer {
  animation: slideInFromBottom 0.4s ease-out;
}

/* 🖼️ Animaciones de avatares */
.modal-avatar-header {
  animation: scaleIn 0.3s ease-out 0.2s both;
}

.main-avatar {
  animation: avatarBounce 0.6s ease-out 0.1s both;
  border: 4px solid rgba(var(--v-theme-primary), 0.1);
  transition: all 0.3s ease;
}

.main-avatar:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  transform: scale(1.05);
}

/* 📝 Animaciones de texto */
.user-name {
  animation: fadeInUp 0.4s ease-out 0.3s both;
}

.user-email {
  animation: fadeInUp 0.4s ease-out 0.4s both;
}

.header-text h2 {
  animation: slideInLeft 0.3s ease-out 0.3s both;
}

.header-text p {
  animation: slideInLeft 0.3s ease-out 0.4s both;
}

/* 🏷️ Animaciones de secciones */
.business-card {
  animation: slideInUp 0.4s ease-out 0.7s both;
}

/* 🔘 Animaciones de botones */
.close-btn {
  animation: rotateIn 0.3s ease-out 0.5s both;
  transition: all 0.2s ease;
}

.close-btn:hover {
  transform: rotate(90deg) scale(1.1);
}

.close-footer-btn {
  animation: bounceIn 0.4s ease-out 0.8s both;
  transition: all 0.2s ease;
}

.close-footer-btn:hover {
  transform: translateY(-2px);
}

/* 🎯 Keyframes para animaciones */
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInFromBottom {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes avatarBounce {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  60% {
    opacity: 1;
    transform: scale(1.1) rotate(10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-180deg) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 📱 Responsive optimizado */
@media (max-width: 960px) {
  .user-modal {
    margin: 16px;
    max-height: calc(100vh - 32px);
  }
  
  .main-avatar {
    animation-duration: 0.4s;
  }
}

@media (max-width: 600px) {
  .user-modal {
    margin: 8px;
    max-height: calc(100vh - 16px);
  }
  
  .main-avatar {
    width: 100px !important;
    height: 100px !important;
  }
}

/* ♿ Respeto por preferencias de movimiento */
@media (prefers-reduced-motion: reduce) {
  .user-modal,
  .modal-header,
  .modal-footer,
  .modal-avatar-header,
  .main-avatar,
  .user-name,
  .user-email,
  .header-text h2,
  .header-text p,
  .business-card,
  .close-btn,
  .close-footer-btn {
    animation: none;
    transition: none;
  }
}

/* 🎯 Accesibilidad mejorada */
.user-modal:focus-visible {
  outline: 3px solid rgb(var(--v-theme-primary));
  outline-offset: 2px;
}

/* 📜 Scrollbar personalizado mejorado */
:deep(.v-card-text) {
  scrollbar-width: thin;
  scrollbar-color: rgba(var(--v-theme-primary), 0.3) transparent;
}

:deep(.v-card-text::-webkit-scrollbar) {
  width: 8px;
}

:deep(.v-card-text::-webkit-scrollbar-track) {
  background: rgba(var(--v-theme-surface-variant), 0.1);
  border-radius: 4px;
}

:deep(.v-card-text::-webkit-scrollbar-thumb) {
  background-color: rgba(var(--v-theme-primary), 0.3);
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

:deep(.v-card-text::-webkit-scrollbar-thumb:hover) {
  background-color: rgba(var(--v-theme-primary), 0.5);
}

/* 🚀 Performance optimizations */
.user-modal,
.main-avatar,
.close-btn,
.close-footer-btn {
  will-change: transform, opacity;
}
</style> 