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
          <v-avatar
            :image="avatarUrl"
            size="48"
            class="mr-3 modal-avatar-header"
          >
            <v-icon v-if="!avatarUrl" icon="mdi-account" />
          </v-avatar>
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
              <v-avatar
                :image="avatarUrl"
                size="120"
                class="mb-3 user-modal-avatar main-avatar"
              >
                <v-icon v-if="!avatarUrl" icon="mdi-account" size="60" />
              </v-avatar>
              <h2 class="text-h5 mb-1 user-name">{{ user.name }}</h2>
              <p class="text-body-1 text-medium-emphasis user-email">{{ user.email }}</p>
            </v-col>
          </v-row>

          <!-- Información detallada con animación staggered -->
          <v-row>
            <!-- Columna izquierda: Contacto -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 d-flex align-center section-title contact-section">
                <v-icon icon="mdi-account-details" class="mr-2" />
                Información de Contacto
              </h3>
              
              <v-list density="compact" class="pa-0">
                <v-list-item class="contact-item" :style="{ animationDelay: '0.1s' }">
                  <template #prepend>
                    <v-icon icon="mdi-phone" color="primary" />
                  </template>
                  <v-list-item-title>Teléfono</v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="`tel:${user.phone}`" class="contact-link">
                      {{ user.phone }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="contact-item" :style="{ animationDelay: '0.2s' }">
                  <template #prepend>
                    <v-icon icon="mdi-web" color="primary" />
                  </template>
                  <v-list-item-title>Sitio Web</v-list-item-title>
                  <v-list-item-subtitle>
                    <a 
                      :href="`https://${user.website}`" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="contact-link"
                    >
                      {{ user.website }}
                      <v-icon icon="mdi-open-in-new" size="small" class="ml-1" />
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item class="contact-item" :style="{ animationDelay: '0.3s' }">
                  <template #prepend>
                    <v-icon icon="mdi-email" color="primary" />
                  </template>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>
                    <a :href="`mailto:${user.email}`" class="contact-link">
                      {{ user.email }}
                    </a>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-col>

            <!-- Columna derecha: Empresa y Dirección -->
            <v-col cols="12" md="6">
              <h3 class="text-h6 mb-3 d-flex align-center section-title company-section">
                <v-icon icon="mdi-office-building" class="mr-2" />
                Empresa y Ubicación
              </h3>
              
              <v-list density="compact" class="pa-0">
                <v-list-item v-if="user.company?.name" class="company-item" :style="{ animationDelay: '0.4s' }">
                  <template #prepend>
                    <v-icon icon="mdi-domain" color="secondary" />
                  </template>
                  <v-list-item-title>Compañía</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ user.company.name }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="user.company?.catchPhrase" class="company-item" :style="{ animationDelay: '0.5s' }">
                  <template #prepend>
                    <v-icon icon="mdi-lightbulb" color="secondary" />
                  </template>
                  <v-list-item-title>Eslogan</v-list-item-title>
                  <v-list-item-subtitle>
                    "{{ user.company.catchPhrase }}"
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item v-if="formattedAddress" class="company-item" :style="{ animationDelay: '0.6s' }">
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
.section-title {
  animation: fadeInLeft 0.4s ease-out 0.2s both;
}

.contact-section {
  animation-delay: 0.5s;
}

.company-section {
  animation-delay: 0.6s;
}

/* 📋 Animaciones de elementos de lista */
.contact-item,
.company-item {
  animation: slideInRight 0.4s ease-out both;
  opacity: 0;
}

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

/* 🔗 Estilos de enlaces mejorados */
.contact-link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
}

.contact-link:hover {
  color: rgb(var(--v-theme-primary-darken-1));
  transform: translateX(4px);
}

.contact-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: rgb(var(--v-theme-primary));
  transition: width 0.3s ease;
}

.contact-link:hover::after {
  width: 100%;
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
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
  
  /* Reducir duración de animaciones en móvil */
  .contact-item,
  .company-item {
    animation-duration: 0.3s;
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
  .section-title,
  .contact-item,
  .company-item,
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
.contact-link,
.close-btn,
.close-footer-btn {
  will-change: transform, opacity;
}
</style> 