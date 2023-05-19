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

export async function putEventoReporte(id, datos){
  try {
    const url = `${API_HOST}/eventos/notaApp/${id}`;
    
    console.log(datos);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {'Content-Type':'application/json',},
      body: JSON.stringify(datos)
    });
    const result = await response.json()
    return result;
  } catch (error) {
    throw error;
  }

}