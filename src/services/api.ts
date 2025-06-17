// ⚡ Cliente HTTP reutilizable para toda la aplicación
import { API_BASE_URL } from "@/utils/constants";

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

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      throw {
        message: errorMessage,
        status: response.status,
        statusText: response.statusText,
      } as ApiError;
    }

    try {
      return await response.json();
    } catch (error) {
      throw {
        message: "Error al procesar la respuesta del servidor",
        status: response.status,
        statusText: response.statusText,
      } as ApiError;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log(`🔄 GET: ${url}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await this.handleResponse<T>(response);
      console.log(`✅ GET successful: ${url}`);
      return data;
    } catch (error) {
      console.error(`❌ GET failed: ${endpoint}`, error);
      throw error;
    }
  }

  async post<T, U>(endpoint: string, body: U): Promise<T> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log(`🔄 POST: ${url}`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await this.handleResponse<T>(response);
      console.log(`✅ POST successful: ${url}`);
      return data;
    } catch (error) {
      console.error(`❌ POST failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Métodos adicionales que podrían ser útiles en el futuro
  async put<T, U>(endpoint: string, body: U): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<T>(response);
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient();

export default apiClient;
