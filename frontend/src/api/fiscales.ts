export interface Fiscal {
  ID_FISCAL: number;
  NOMBRE: string;
  APELLIDO: string;
  CUI: string;
  EMAIL: string;
  TELEFONO: string;
}

  export async function fetchFiscalesByFiscalia(id_fiscalia: number): Promise<Fiscal[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/fiscales/fiscalia/${id_fiscalia}`);
    if (!response.ok) {
      throw new Error('Error al obtener fiscales');
    }
    return await response.json();
  }
  