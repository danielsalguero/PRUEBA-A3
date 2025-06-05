export async function asignarFiscalACaso(id_caso: number, id_fiscal_nuevo: number): Promise<string> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/casos/asignar-fiscal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_caso,
        id_fiscal_nuevo   
      })
    });
  
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Error al asignar fiscal');
    }
  
    return 'Fiscal asignado correctamente';
  }
  