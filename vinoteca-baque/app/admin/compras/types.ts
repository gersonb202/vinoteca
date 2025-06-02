export type Compra = {
    idcompra: number
    cliente: ClienteInfo | null
    vino: VinoInfo | null
    fecha: Date
}
export type ClienteInfo = {
  nombre: string;
};

export type VinoInfo = {
  nombre: string;
};
export type CompraNuevaForm = {
  clienteId: string; // Los inputs del formulario suelen ser strings inicialmente
  vinoId: string;
};