// 🔍 Composable para manejo de búsqueda con debounce
import { ref, watch, type Ref } from "vue";
import { UI_CONSTANTS } from "@/utils/constants";

export interface UseSearchReturn {
  searchQuery: Ref<string>;
  debouncedQuery: Ref<string>;
  isSearching: Ref<boolean>;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

export function useSearch(
  delay: number = UI_CONSTANTS.SEARCH_DEBOUNCE_DELAY
): UseSearchReturn {
  const searchQuery = ref<string>("");
  const debouncedQuery = ref<string>("");
  const isSearching = ref<boolean>(false);

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

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    setSearchQuery,
    clearSearch,
  };
}
