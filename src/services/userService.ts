// 👥 Servicio especializado para operaciones con usuarios
import { apiClient } from "./api";
import { ENDPOINTS } from "@/utils/constants";
import type { User } from "@/types/user";

export class UserService {
  /**
   * Obtiene la lista completa de usuarios
   * @returns Promise<User[]> - Lista de usuarios
   */
  async getUsers(): Promise<User[]> {
    try {
      const users = await apiClient.get<User[]>(ENDPOINTS.USERS);
      console.log(`📥 Usuarios obtenidos: ${users.length}`);
      return users;
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw new Error(
        "No se pudieron cargar los usuarios. Inténtalo de nuevo."
      );
    }
  }

  /**
   * Obtiene un usuario específico por ID
   * @param id - ID del usuario a obtener
   * @returns Promise<User> - Usuario específico
   */
  async getUserById(id: number): Promise<User> {
    try {
      const user = await apiClient.get<User>(ENDPOINTS.USER_BY_ID(id));
      console.log(`📥 Usuario obtenido: ${user.name} (ID: ${id})`);
      return user;
    } catch (error) {
      console.error(`Error al obtener usuario con ID ${id}:`, error);
      throw new Error(
        `No se pudo cargar el usuario con ID ${id}. Inténtalo de nuevo.`
      );
    }
  }

  /**
   * Busca usuarios por nombre (simulado localmente)
   * En una API real, esto sería un endpoint de búsqueda
   * @param users - Lista de usuarios donde buscar
   * @param query - Término de búsqueda
   * @returns User[] - Usuarios filtrados
   */
  searchUsers(users: User[], query: string): User[] {
    if (!query.trim()) return users;

    const searchTerm = query.toLowerCase().trim();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.username.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Genera URL de avatar para un usuario
   * @param user - Usuario para generar avatar
   * @returns string - URL del avatar
   */
  generateAvatarUrl(user: User): string {
    // Usando DiceBear API para generar avatares consistentes
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  }

  /**
   * Formatea la dirección de un usuario en una cadena legible
   * @param user - Usuario con información de dirección
   * @returns string - Dirección formateada
   */
  formatAddress(user: User): string {
    const { address } = user;
    if (!address) return "Dirección no disponible";

    const parts = [
      address.street,
      address.suite,
      address.city,
      address.zipcode,
    ].filter(Boolean);

    return parts.join(", ");
  }

  /**
   * Valida si un usuario tiene toda la información requerida
   * @param user - Usuario a validar
   * @returns boolean - true si el usuario es válido
   */
  isValidUser(user: User): boolean {
    return !!(user.id && user.name && user.email && user.username);
  }
}

// Instancia singleton del servicio de usuarios
export const userService = new UserService();

export default userService;
