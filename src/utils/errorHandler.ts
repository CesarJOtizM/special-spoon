import { type App } from "vue";

export class ErrorHandler {
  static handle(error: Error, context?: string): void {
    console.error(`[${context || "Error"}]:`, error);
    // Aquí podríamos agregar integración con servicios de monitoreo
    // como Sentry, LogRocket, etc.
  }

  static handleApiError(error: unknown, context?: string): Error {
    if (error instanceof Error) {
      ErrorHandler.handle(error, `API Error - ${context}`);
      return new Error(
        "Ha ocurrido un error en la comunicación con el servidor"
      );
    }
    return new Error("Error desconocido");
  }
}

export const installErrorHandler = (app: App): void => {
  app.config.errorHandler = (err, vm, info) => {
    ErrorHandler.handle(err as Error, `Vue Error Handler - ${info}`);
  };
};

export default ErrorHandler;
