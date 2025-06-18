// 📦 Archivo barril para composables
// Facilita las importaciones centralizando todas las exportaciones

export { useAnimations } from "./useAnimations";
export { useSearch } from "./useSearch";
export { useUsers } from "./useUsers";
export { useUIState } from "./useUIState";

// 📝 Tipos relacionados con composables
export type { User } from "@/types/user";
export type { SearchFilters, UseSearchReturn } from "./useSearch";
export type { AnimationConfig } from "./useAnimations";
export type { UseUsersReturn } from "./useUsers";
export type { UseUIStateReturn } from "./useUIState";
