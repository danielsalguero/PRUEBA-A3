export interface Fiscalia {
    ID_FISCALIA: number;
    NOMBRE: string;
  }
  
  export async function fetchFiscalias(): Promise<Fiscalia[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/fiscalias`);
    if (!response.ok) {
      throw new Error('Error al obtener fiscalías');
    }
    return await response.json();
  }
  