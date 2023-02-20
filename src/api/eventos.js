import { API_HOST } from "../utils/constants";

export async function getEventos() {
    try {
        const url = `${API_HOST}/eventos/`
        const response = await fetch(url);
        const result = await response.json();
        
        return result;
    } catch (error) {
        throw error;
    }
}

export async function getEventoDetails(id){
  try {
    const url = `${API_HOST}/eventos/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}