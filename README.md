# 📋 Directorio de Usuarios - Prueba Técnica Frontend

SPA desarrollada en Vue 3 + Vuetify 3 que consume la API de JSONPlaceholder para mostrar un directorio interactivo de usuarios con funcionalidades de búsqueda y visualización detallada.

## ✨ Funcionalidades Principales

- ✅ Listado de usuarios con avatar, nombre y email
- ✅ Búsqueda en tiempo real por nombre
- ✅ Modal con información detallada del usuario
- ✅ Diseño responsive (móvil y escritorio)
- ✅ Indicadores de carga y manejo de errores
- ✅ Animaciones y transiciones

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/special-spoon.git
cd special-spoon

# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev

# Build para producción
bun run build
```

## 🛠️ Stack Tecnológico

- **Vue 3** - Framework principal (Composition API + TypeScript)
- **Vuetify 3** - Componentes UI y sistema de grid
- **SCSS** - Preprocesador CSS para estilos
- **Vite** - Build tool y servidor de desarrollo
- **Bun** - Package manager y runtime

## 📂 Estructura del Proyecto

```
src/
├── components/           # Componentes Vue
│   ├── user/            # Específicos de usuario
│   └── common/          # Componentes reutilizables
├── composables/         # Lógica reutilizable
├── services/           # APIs y servicios
├── assets/            # Estilos y recursos
└── types/             # TypeScript types
```

## 🎯 Decisiones Técnicas

### Composition API + TypeScript
Elegido por su mejor reutilización de lógica y tipado fuerte para un desarrollo más robusto.

### Vuetify 3
Framework UI que proporciona componentes Material Design y sistema de grid responsive.

### Arquitectura de Servicios
Separación de la lógica de API en servicios dedicados para mejor mantenibilidad.

### SCSS
Utilizado para una mejor organización de estilos y variables centralizadas.

## 📱 Responsive Design

- Mobile First Approach (320px+)
- Grid System de Vuetify
- Adaptaciones específicas para móvil:
  - Cards a full width
  - Modal fullscreen
  - Elementos touch-friendly

## 🔄 API Integration

- Endpoint: `https://jsonplaceholder.typicode.com/users`
- Estados de carga y error
- Búsqueda en tiempo real
- Caché básico de respuestas

## 🎨 Características UX

- Loading spinners durante carga
- Mensajes de error amigables
- Animaciones suaves en transiciones
- Avatares generados con DiceBear API

## 🚀 Deploy

El proyecto está desplegado en Vercel: [Ver Demo](https://special-spoon-haik77fig-cesar-ortizs-projects.vercel.app/)

## 👨‍💻 Desarrollador

Proyecto realizado como prueba técnica para posición Frontend Jr.

---

## 📄 Licencia

MIT License

---

⭐ Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue.
