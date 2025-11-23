export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fotoPerfil: string;
  estado: 'ACTIVO' | 'INACTIVO' | 'SUSPENDIDO';
  createdAt: string;
  updatedAt: string;
}

export interface UsuarioRequest {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  fotoPerfil: string;
}

export interface UsuarioUpdate {
  nombre?: string;
  apellido?: string;
  telefono?: string;
  fotoPerfil?: string;
  estado?: 'ACTIVO' | 'INACTIVO' | 'SUSPENDIDO';
}
