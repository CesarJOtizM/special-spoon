# Prueba Técnica – Desarrollador Jr. Frontend

## Objetivo

Desarrollar una pequeña SPA en **Vue 3** que consuma una API pública para mostrar un listado de usuarios, permitiendo consultar información más detallada en un modal.

Se evaluará:

- Uso de componentes
- Diseño responsive
- Integración de Vuetify
- Estructura del código
- Consumo de APIs
- Presentación visual

---

## 1. Requerimientos técnicos

### 1.1 Tecnologías

- Vue 3 (Composition API o Options API)
- Vuetify 3
- CSS o preprocesadores (SASS o LESS)

---

## 2. Funcionalidad mínima

### 2.1 Listado de usuarios con:

- Avatar
- Nombre completo
- Correo electrónico
- Botón “Ver más” (abre modal)

### 2.2 Modal de detalles:

- Dirección
- Teléfono
- Compañía
- Sitio web

### 2.3 Búsqueda filtrada por nombre (en tiempo real)

### 2.4 Consumo de API

- `https://jsonplaceholder.typicode.com/users` (o similar)

### 2.5 Uso de Vuetify para la interfaz

Componentes sugeridos:

- `v-card`
- `v-dialog`
- `v-text-field`
- `v-container`, `v-row`, `v-col`

---

## 3. Estructura de componentes sugerida

- `App.vue`
- `UserList.vue`
- `UserCard.vue`
- `UserModal.vue`
- `SearchBar.vue`

---

## 4. Responsividad y presentación

- Layout que se adapte bien a móviles y escritorio
- Buen uso del sistema de grid de Vuetify

---

## 5. Entrega esperada

### 5.1 Repositorio público en GitHub con:

- Código bien organizado

### 5.2 README.md con:

- Pasos de instalación
- Breve explicación de decisiones técnicas
- Captura o link al deploy (si lo hay)

---

## 6. Puntos extra

- Indicador de carga (`v-progress-circular`) mientras se obtiene la información
- Manejo de errores con mensajes amigables
- Pequeña animación al abrir el modal
- Separación de servicios (`api.js` o `services/UserService.js` para el `fetch`)
- Deploy en **Vercel**, **Netlify** o **GitHub Pages**

---
