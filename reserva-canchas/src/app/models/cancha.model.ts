export type TipoDeporte = 'FUTBOL' | 'BASQUET' | 'TENIS' | 'VOLEY' | 'PADEL';
export type EstadoCancha = 'DISPONIBLE' | 'MANTENIMIENTO' | 'INACTIVA';

export interface Cancha {
  id?: number;
  propietarioId: string;          // UUID como string
  nombre: string;
  descripcion?: string;
  tipoDeporte: TipoDeporte;
  tipoSuperficie?: string;
  techada: boolean;
  capacidadJugadores?: number;
  estado: EstadoCancha;
  createdAt?: string;
  updatedAt?: string;
}

export interface CanchaRequest {
  propietarioId: string;
  nombre: string;
  descripcion?: string;
  tipoDeporte: TipoDeporte;
  tipoSuperficie?: string;
  techada?: boolean;
  capacidadJugadores?: number;
}

export interface CanchaUpdate {
  nombre?: string;
  descripcion?: string;
  tipoDeporte?: TipoDeporte;
  tipoSuperficie?: string;
  techada?: boolean;
  capacidadJugadores?: number;
  estado?: EstadoCancha;
}
