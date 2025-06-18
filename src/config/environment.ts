interface Environment {
  apiUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  apiTimeout: number;
}

export const environment: Environment = {
  apiUrl: import.meta.env.VITE_API_URL || "https://api.example.com",
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
};

export default environment;
