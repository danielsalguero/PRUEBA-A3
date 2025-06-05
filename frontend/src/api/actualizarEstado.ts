export async function actualizarEstadoCaso(id_caso: number, id_estado_nuevo: number): Promise<string> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/casos/cambiar-estado`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_caso,
        id_estado_nuevo
      })
    });
  
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Error al actualizar estado');
    }
  
    return 'Estado actualizado correctamente';
  }
  