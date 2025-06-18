// ⚡ Cliente HTTP reutilizable para toda la aplicación
import { environment } from "@/config/environment";
import { ErrorHandler } from "@/utils/errorHandler";

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
}

type RequestInterceptor = (config: RequestInit) => RequestInit;
type ResponseInterceptor = (response: Response) => Promise<Response>;

class ApiClient {
  private baseURL: string;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(baseURL: string = environment.apiUrl) {
    this.baseURL = baseURL;
    this.setupDefaultInterceptors();
  }

  private setupDefaultInterceptors(): void {
    // Interceptor para agregar headers por defecto
    this.addRequestInterceptor((config) => ({
      ...config,
      headers: {
        ...config.headers,
        "Content-Type": "application/json",
      },
    }));

    // Interceptor para timeout
    this.addRequestInterceptor((config) => {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), environment.apiTimeout);
      return {
        ...config,
        signal: controller.signal,
      };
    });

    // Interceptor para logging
    this.addResponseInterceptor(async (response) => {
      const method = response.type;
      const url = response.url;
      console.log(`🔄 ${method}: ${url} - Status: ${response.status}`);
      return response;
    });
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  private async applyRequestInterceptors(
    config: RequestInit
  ): Promise<RequestInit> {
    return this.requestInterceptors.reduce(
      (promise, interceptor) => promise.then(interceptor),
      Promise.resolve(config)
    );
  }

  private async applyResponseInterceptors(
    response: Response
  ): Promise<Response> {
    return this.responseInterceptors.reduce(
      (promise, interceptor) => promise.then(interceptor),
      Promise.resolve(response)
    );
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      throw ErrorHandler.handleApiError({
        message: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        statusText: response.statusText,
      } as ApiError);
    }

    try {
      return await response.json();
    } catch (error) {
      throw ErrorHandler.handleApiError({
        message: "Error al procesar la respuesta del servidor",
        status: response.status,
        statusText: response.statusText,
      } as ApiError);
    }
  }

  async request<T>(endpoint: string, config: RequestInit): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const finalConfig = await this.applyRequestInterceptors(config);

      const response = await fetch(url, finalConfig);
      const interceptedResponse = await this.applyResponseInterceptors(
        response
      );

      return await this.handleResponse<T>(interceptedResponse);
    } catch (error) {
      throw ErrorHandler.handleApiError(error, `Request failed: ${endpoint}`);
    }
  }

  async get<T>(endpoint: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    config: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put<T>(
    endpoint: string,
    body: unknown,
    config: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string, config: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();

export default apiClient;
