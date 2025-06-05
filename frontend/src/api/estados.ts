export interface Estado {
    ID_ESTADO: number;
    NOMBRE_ESTADO: string;
  }
  
  export async function fetchEstados(): Promise<Estado[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/estadosFiscalias`);
    if (!response.ok) {
      throw new Error('Error al obtener estados');
    }
    return await response.json();
  }
  