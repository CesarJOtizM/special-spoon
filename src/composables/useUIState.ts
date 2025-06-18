// 🎨 Composable para manejo de estados de UI comunes
import { ref, computed, type Ref } from "vue";

export interface UseUIStateReturn {
  // Estados
  isLoading: Ref<boolean>;
  showModal: Ref<boolean>;
  selectedItem: Ref<any | null>;

  // Estados computados
  hasSelectedItem: Ref<boolean>;

  // Métodos
  setLoading: (loading: boolean) => void;
  openModal: (item?: any) => void;
  closeModal: () => void;
  selectItem: (item: any) => void;
  clearSelection: () => void;
}

export function useUIState<T = any>(): UseUIStateReturn {
  // 🔄 Estados reactivos
  const isLoading = ref<boolean>(false);
  const showModal = ref<boolean>(false);
  const selectedItem = ref<T | null>(null);

  // 📊 Estados computados
  const hasSelectedItem = computed<boolean>(() => selectedItem.value !== null);

  // 🎯 Métodos
  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const openModal = (item?: T): void => {
    if (item) {
      selectedItem.value = item;
    }
    showModal.value = true;
  };

  const closeModal = (): void => {
    showModal.value = false;
    // Pequeño delay para permitir que la animación termine
    setTimeout(() => {
      selectedItem.value = null;
    }, 300);
  };

  const selectItem = (item: T): void => {
    selectedItem.value = item;
  };

  const clearSelection = (): void => {
    selectedItem.value = null;
  };

  return {
    // Estados
    isLoading,
    showModal,
    selectedItem,

    // Estados computados
    hasSelectedItem,

    // Métodos
    setLoading,
    openModal,
    closeModal,
    selectItem,
    clearSelection,
  };
}
