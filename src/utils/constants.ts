// 🔧 Constantes de la aplicación

// API Configuration
export const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// Endpoints
export const ENDPOINTS = {
  USERS: "/users",
  USER_BY_ID: (id: number) => `/users/${id}`,
};

// UI Constants
export const UI_CONSTANTS = {
  SEARCH_DEBOUNCE_DELAY: 300,
  LOADING_TIMEOUT: 5000,
  AVATAR_SIZE: {
    SMALL: 48,
    MEDIUM: 64,
    LARGE: 120,
  },
};

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 960,
  DESKTOP: 1264,
};

// App metadata
export const APP_INFO = {
  TITLE: "Directorio de Usuarios",
  VERSION: "1.0.0",
  DESCRIPTION: "SPA desarrollada en Vue 3 + Vuetify 3 para gestión de usuarios",
};
