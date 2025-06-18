// 👤 Tipos para la estructura de datos de usuarios

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

// Estados de la aplicación
export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

// Props de componentes
export interface UserCardProps {
  user: User;
}

export interface UserModalProps {
  modelValue: boolean;
  user: User | null;
}

export interface SearchBarProps {
  placeholder?: string;
}

// Eventos
export interface SearchEvent {
  query: string;
}

export interface UserModalEvent {
  user: User;
}
