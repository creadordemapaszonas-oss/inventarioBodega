import axios from 'axios';
import type {RegisterAssetFormData} from '../../features/types'
// Tu URL de Google Apps Script Web App
const GOOGLE_SHEETS_API_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export const apiClient = axios.create({
  baseURL: GOOGLE_SHEETS_API_URL,
  headers: {
    'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script prefiere redirecciones limpias
  },
});


export const guardarInventario = async (datos: RegisterAssetFormData) => {
  // Nota: Google Apps Script redirecciona las peticiones POST, 
  // por lo que se envía la petición con 'text/plain' o usando JSON estándar.
  const response = await axios.post(GOOGLE_SHEETS_API_URL, JSON.stringify(datos), {
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  });
  console.log(datos)
  return response.data; // Devuelve { status: 'success', message: '...', idActivo: '...' }
};