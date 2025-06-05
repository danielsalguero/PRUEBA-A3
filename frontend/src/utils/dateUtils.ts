export function parseDateString(dateString: string): Date | null {
    if (!dateString) return null;
  
    if (dateString.includes('T')) {
      return new Date(dateString);
    }
  
    if (dateString.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
      const isoString = dateString.replace(' ', 'T');
      return new Date(isoString);
    }
  
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(`${dateString}T00:00:00`);
    }
  
    return null;
  }
  