export interface Log {
    ID_LOG: number;
    ID_CASO: number;
    ID_FISCAL_ACTUAL: number;
    ID_FISCAL_PROPUESTO: number;
    FECHA_INTENTO: string;
    OBSERVACION: string;
  }
  
  export async function fetchLogs(): Promise<Log[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/logs`);
    if (!response.ok) {
      throw new Error('Error al obtener logs');
    }
    return await response.json();
  }
  
  export async function eliminarLog(id_log: number): Promise<string> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/casos/eliminarLog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_log })
    });
  
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Error al eliminar log');
    }
  
    return 'Log eliminado correctamente';
  }
  