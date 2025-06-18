// 📊 Composable para el manejo del estado reactivo de usuarios
import { ref, computed, type Ref } from "vue";
import { userService } from "@/services/userService";
import type { User } from "@/types/user";

export interface UseUsersReturn {
  // Estado reactivo
  users: Ref<User[]>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
  searchQuery: Ref<string>;

  // Estados computados
  filteredUsers: Ref<User[]>;
  userCount: Ref<number>;
  hasUsers: Ref<boolean>;
  hasError: Ref<boolean>;

  // Métodos
  loadUsers: () => Promise<void>;
  refreshUsers: () => Promise<void>;
  searchUsers: (query: string) => void;
  clearSearch: () => void;
  getUserById: (id: number) => User | undefined;
  clearError: () => void;
}

export function useUsers(): UseUsersReturn {
  // 🔄 Estado reactivo
  const users = ref<User[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>("");

  // 📊 Estados computados
  const filteredUsers = computed<User[]>(() => {
    if (!searchQuery.value.trim()) {
      return users.value;
    }

    return userService.searchUsers(users.value, searchQuery.value);
  });

  const userCount = computed<number>(() => filteredUsers.value.length);

  const hasUsers = computed<boolean>(() => users.value.length > 0);

  const hasError = computed<boolean>(() => error.value !== null);

  // 🔄 Métodos para cargar usuarios
  const loadUsers = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      console.log("🔄 Cargando usuarios...");
      const fetchedUsers = await userService.getUsers();

      // Validar usuarios antes de asignar
      const validUsers = fetchedUsers.filter((user) =>
        userService.isValidUser(user)
      );

      if (validUsers.length !== fetchedUsers.length) {
        console.warn(
          `⚠️ Se filtraron ${
            fetchedUsers.length - validUsers.length
          } usuarios inválidos`
        );
      }

      users.value = validUsers;
      console.log(`✅ ${validUsers.length} usuarios cargados exitosamente`);
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
      error.value =
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar usuarios";
      users.value = [];
    } finally {
      loading.value = false;
    }
  };

  // 🔄 Método para refrescar usuarios (útil para botón de recarga)
  const refreshUsers = async (): Promise<void> => {
    console.log("🔄 Refrescando lista de usuarios...");
    await loadUsers();
  };

  // 🔍 Métodos para búsqueda
  const searchUsers = (query: string): void => {
    searchQuery.value = query;
    console.log(`🔍 Buscando usuarios con: "${query}"`);
    console.log(`📊 Usuarios encontrados: ${filteredUsers.value.length}`);
  };

  const clearSearch = (): void => {
    searchQuery.value = "";
    console.log("🔍 Búsqueda limpiada");
  };

  // 🔍 Método para obtener usuario específico
  const getUserById = (id: number): User | undefined => {
    return users.value.find((user) => user.id === id);
  };

  // 🧹 Método para limpiar errores
  const clearError = (): void => {
    error.value = null;
  };

  return {
    // Estado reactivo
    users,
    loading,
    error,
    searchQuery,

    // Estados computados
    filteredUsers,
    userCount,
    hasUsers,
    hasError,

    // Métodos
    loadUsers,
    refreshUsers,
    searchUsers,
    clearSearch,
    getUserById,
    clearError,
  };
}
