/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Error Handler
import { installErrorHandler } from "@/utils/errorHandler";

// Styles
import "unfonts.css";
import "@/assets/styles/main.scss";

const app = createApp(App);

// Instalar manejador de errores
installErrorHandler(app);

// Registrar plugins
registerPlugins(app);

app.mount("#app");
