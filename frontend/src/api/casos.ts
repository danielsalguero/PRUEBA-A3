export type Caso = {
    ID_CASO: number;
    CORRELATIVO: string;
    FECHA_INICIO: string;
    NOMBRE_FISCALIA: string;
    NOMBRE_FISCAL: string;
    NOMBRE_ESTADO: string;
  };
  
  export async function fetchCasos(): Promise<Caso[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/casos`);
    if (!response.ok) {
      throw new Error('Error al obtener casos');
    }
    return response.json();
  }
  