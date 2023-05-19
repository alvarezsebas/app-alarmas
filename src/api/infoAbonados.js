import { API_HOST } from "../utils/constants";

export async function getAbonados() {
    try {
        const url = `${API_HOST}/abonadoMonitoreo/`
        const response = await fetch(url);
        const result = await response.json();
        
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getAbonado(id) {
    try {
      const url = `${API_HOST}/abonadoMonitoreo/${id}`
          const response = await fetch(url);
          const result = await response.json();
          return result;
    } catch (error) {
      
    }
  }