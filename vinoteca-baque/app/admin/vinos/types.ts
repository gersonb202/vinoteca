// app/admin/productos/types.ts
export type Vino = {
  id: number;
  nombre: string;
  precio?: number;
  anio?: number;
  grado?: number;
  bodega?: string;
  tipo?: string;
  descripcion?: string;
};