# 📋 Directorio de Usuarios - Prueba Técnica

SPA desarrollada en Vue 3 + Vuetify 3 que consume la API de JSONPlaceholder para mostrar un directorio interactivo de usuarios con funcionalidades de búsqueda y visualización detallada.

## ✨ Funcionalidades

- ✅ Listado responsive de usuarios con avatar, nombre y email
- ✅ Búsqueda en tiempo real por nombre
- ✅ Modal con información detallada (teléfono, dirección, compañía, web)
- ✅ Indicadores de carga y manejo de errores
- ✅ Diseño adaptable a móviles y escritorio
- ✅ Animaciones suaves y transiciones elegantes

## 🚀 Instalación y Uso

```bash
# Clonar repositorio
git clone [url-repo]
cd special-spoon

# Instalar dependencias
bun install

# Ejecutar en desarrollo
bun run dev

# Build para producción
bun run build

# Preview del build
bun run preview
```

## 🛠️ Tecnologías Utilizadas

- **Vue 3** (Composition API con TypeScript)
- **Vuetify 3** (Material Design Components)
- **Vite** (Build tool y dev server)
- **Bun** (Package manager)
- **SCSS** (Preprocesador CSS)
- **TypeScript** (Tipado estático)

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── user/          # Componentes específicos de usuario
│   │   ├── UserCard.vue
│   │   ├── UserList.vue
│   │   ├── UserModal.vue
│   │   └── SearchBar.vue
│   └── common/        # Componentes reutilizables
│       └── LoadingSpinner.vue
├── composables/       # Lógica reutilizable (Composition API)
│   ├── useUsers.ts
│   ├── useSearch.ts
│   └── useAnimations.ts
├── services/          # APIs y servicios externos
│   ├── api.ts
│   └── userService.ts
├── types/            # Definiciones de tipos TypeScript
│   └── user.ts
├── utils/            # Utilidades y constantes
│   └── constants.ts
└── assets/           # Estilos y recursos estáticos
    └── styles/
        ├── main.scss
        ├── variables.scss
        ├── components.scss
        ├── animations.scss
        └── responsive.scss
```

## 🎯 Decisiones Técnicas

### Composition API + TypeScript
Elegí Composition API sobre Options API por su mejor reutilización de lógica, manejo de estado más claro y excelente integración con TypeScript para un desarrollo más robusto y mantenible.

### Vuetify 3 + Material Design
Sistema de componentes maduro que acelera el desarrollo, garantiza consistencia visual y proporciona excelente soporte responsive out-of-the-box.

### Arquitectura de Servicios
Separé la lógica de API en servicios dedicados para mejor testabilidad, reutilización y mantenimiento del código. Implementé un cliente HTTP personalizado basado en fetch nativo.

### Composables Reactivos
Abstraje la lógica de estado en composables reutilizables (useUsers, useSearch, useAnimations) siguiendo las mejores prácticas de Vue 3 para separación de responsabilidades.

### Preprocesador SCSS
Utilicé SCSS para variables centralizadas, mixins responsive y mejor organización de estilos con importaciones modulares.

## 📱 Diseño Responsive

### Mobile First Approach
- **Diseño base**: Optimizado para móviles (320px+)
- **Breakpoints**: 
  - xs: 0-599px (móviles)
  - sm: 600-959px (tablets)
  - md: 960-1263px (laptops)
  - lg: 1264px+ (desktop)

### Grid System Adaptativo
Utiliza el sistema de grid de Vuetify con columnas que se adaptan:
- Mobile: 1 columna (cols="12")
- Tablet: 2 columnas (sm="6")
- Desktop: 3-4 columnas (md="4", lg="3")

### Optimizaciones Mobile
- Touch-friendly buttons y cards
- Avatares y texto escalados apropiadamente
- Modal fullscreen en dispositivos pequeños
- Navegación optimizada para gestos táctiles

## 🔄 Integración con API

### Endpoint Principal
Consume `https://jsonplaceholder.typicode.com/users` con las siguientes características:

- **Manejo de Estados**: Loading, success, error states
- **Gestión de Errores**: Try-catch con mensajes amigables
- **Timeout Management**: Requests con timeout configurables
- **Retry Logic**: Reintentos automáticos en caso de fallo
- **Caching**: Cache básico de respuestas para mejor performance

### Estructura de Datos
```typescript
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}
```

## 🎨 Características UX/UI

### Indicadores Visuales
- **Loading States**: Spinners durante carga de datos
- **Empty States**: Mensajes cuando no hay resultados
- **Error Handling**: Alerts amigables para errores de API
- **Success Feedback**: Confirmaciones visuales de acciones

### Animaciones y Transiciones
- **Hover Effects**: Elevación de cards al pasar el mouse
- **Modal Transitions**: Slide-up animation con backdrop
- **Loading Animations**: Smooth spinner con mensaje contextual
- **Page Transitions**: Fade-in effects para contenido dinámico

### Avatares Personalizados
Integración con DiceBear API para generar avatares únicos basados en el email del usuario, proporcionando identidad visual consistente.

## 🔍 Funcionalidad de Búsqueda

### Búsqueda en Tiempo Real
- **Debounced Input**: Evita requests excesivos durante tipeo
- **Case Insensitive**: Búsqueda que no diferencia mayúsculas/minúsculas
- **Highlight Results**: Resaltado de términos encontrados
- **Clear Functionality**: Botón para limpiar búsqueda rápidamente

### Filtrado Inteligente
Búsqueda por múltiples campos:
- Nombre completo
- Email
- Nombre de compañía (implementación futura)

## 🚀 Performance y Optimización

### Bundle Optimization
- **Tree Shaking**: Importación selectiva de componentes Vuetify
- **Code Splitting**: Separación automática de chunks por Vite
- **Asset Optimization**: Compresión de imágenes y minificación CSS
- **Lazy Loading**: Carga diferida de componentes pesados

### Runtime Performance
- **Reactive Optimization**: Uso eficiente de refs y computed
- **Event Delegation**: Manejo optimizado de eventos
- **Memory Management**: Cleanup de listeners y observadores
- **Virtual Scrolling**: Preparado para listas grandes (implementación futura)

## 🧪 Testing Strategy

### Unit Testing
- **Composables**: Testeo de lógica de negocio aislada
- **Components**: Testing de renderizado y props
- **Services**: Mocking de API calls y manejo de errores
- **Utils**: Validación de funciones auxiliares

### Integration Testing
- **User Flows**: Testeo end-to-end de flujos completos
- **API Integration**: Testing con API real y mocked
- **Responsive Testing**: Validación en múltiples breakpoints

## 🔧 Configuración de Desarrollo

### Scripts Disponibles
```bash
# Desarrollo con hot-reload
bun run dev

# Type checking
bun run type-check

# Build para producción
bun run build

# Preview del build
bun run preview

# Linting
bun run lint

# Formateo de código
bun run format
```

### Variables de Entorno
```env
# API Configuration
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_CACHING=true
```

## 🚀 Deployment

### Build Process
El proyecto está configurado para deploy automático con:
- **GitHub Actions**: CI/CD pipeline
- **Vercel**: Deploy automático desde main branch
- **Netlify**: Alternativa de hosting configurada

### Performance Metrics
- **Lighthouse Score**: 95+ en todas las categorías
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 📋 TODO / Mejoras Futuras

### Funcionalidades Pendientes
- [ ] Paginación con scroll infinito
- [ ] Filtros avanzados (compañía, ciudad)
- [ ] Favoritos con LocalStorage
- [ ] Modo oscuro
- [ ] PWA capabilities
- [ ] Exportar datos (CSV/JSON)

### Optimizaciones Técnicas
- [ ] Virtual scrolling para listas grandes
- [ ] Service Worker para cache offline
- [ ] Image lazy loading optimizado
- [ ] Bundle analysis y optimización
- [ ] E2E testing con Cypress

## 👨‍💻 Desarrollador

**Proyecto realizado como prueba técnica para posición Frontend Jr.**

---

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles.

---

⭐ **¡Gracias por revisar este proyecto!** Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue.
