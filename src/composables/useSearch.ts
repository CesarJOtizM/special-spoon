// 🔍 Composable para manejo de búsqueda con debounce y filtros avanzados
import { ref, watch, computed, type Ref } from "vue";
import { UI_CONSTANTS } from "@/utils/constants";
import type { User } from "@/types/user";

export interface SearchFilters {
  searchType: "name" | "email" | "company" | "all";
  sortBy: "name" | "email" | "company";
  sortOrder: "asc" | "desc";
}

export interface UseSearchReturn {
  searchQuery: Ref<string>;
  debouncedQuery: Ref<string>;
  isSearching: Ref<boolean>;
  filters: Ref<SearchFilters>;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
  filterUsers: (users: User[]) => User[];
  sortUsers: (users: User[]) => User[];
  searchAndFilter: (users: User[]) => User[];
}

export function useSearch(
  delay: number = UI_CONSTANTS.SEARCH_DEBOUNCE_DELAY
): UseSearchReturn {
  const searchQuery = ref<string>("");
  const debouncedQuery = ref<string>("");
  const isSearching = ref<boolean>(false);

  const filters = ref<SearchFilters>({
    searchType: "all",
    sortBy: "name",
    sortOrder: "asc",
  });

  let timeoutId: number | null = null;

  // 🔄 Watcher para aplicar debounce a la búsqueda
  watch(searchQuery, (newQuery) => {
    isSearching.value = true;

    // Limpiar timeout anterior si existe
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Configurar nuevo timeout
    timeoutId = setTimeout(() => {
      debouncedQuery.value = newQuery;
      isSearching.value = false;
      console.log(`🔍 Búsqueda con debounce aplicada: "${newQuery}"`);
    }, delay);
  });

  // 📝 Método para establecer la query de búsqueda
  const setSearchQuery = (query: string): void => {
    searchQuery.value = query;
  };

  // 🧹 Método para limpiar la búsqueda
  const clearSearch = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    searchQuery.value = "";
    debouncedQuery.value = "";
    isSearching.value = false;

    console.log("🧹 Búsqueda limpiada");
  };

  // 🔍 Filtrar usuarios basado en el query y tipo de búsqueda
  const filterUsers = (users: User[]): User[] => {
    const query = debouncedQuery.value.toLowerCase().trim();

    if (!query) return users;

    return users.filter((user) => {
      switch (filters.value.searchType) {
        case "name":
          return user.name.toLowerCase().includes(query);
        case "email":
          return user.email.toLowerCase().includes(query);
        case "company":
          return user.company?.name.toLowerCase().includes(query) || false;
        case "all":
        default:
          return (
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query) ||
            user.company?.name.toLowerCase().includes(query) ||
            user.username.toLowerCase().includes(query) ||
            user.phone.toLowerCase().includes(query)
          );
      }
    });
  };

  // 📊 Ordenar usuarios
  const sortUsers = (users: User[]): User[] => {
    return [...users].sort((a, b) => {
      let aValue = "";
      let bValue = "";

      switch (filters.value.sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "email":
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
          break;
        case "company":
          aValue = a.company?.name.toLowerCase() || "";
          bValue = b.company?.name.toLowerCase() || "";
          break;
      }

      if (filters.value.sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  };

  // 🎯 Búsqueda y filtrado combinados
  const searchAndFilter = (users: User[]): User[] => {
    const filtered = filterUsers(users);
    return sortUsers(filtered);
  };

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    filters,
    setSearchQuery,
    clearSearch,
    filterUsers,
    sortUsers,
    searchAndFilter,
  };
}
