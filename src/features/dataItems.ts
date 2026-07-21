// src/features/items/services/itemService.ts
import { apiClient } from '../assets/services/api';
import type {  Item } from './types';

// 1. Petición para obtener todos los nombres de modelos (para autocompletado/selects)
export const obtenerListaModelos = async (): Promise<string[]> => {
  const response = await apiClient.get('', {
    params: { action: 'obtenerModelos' },
  });
  
  if (response.data.exito) {
    return response.data.modelos;
  }
  
  throw new Error(response.data.error || 'Error al obtener la lista de modelos');
};

// 2. Petición para buscar la información técnica de un modelo específico
export const buscarModelo = async (modelo: string): Promise<{ exito: boolean; item?: Item }> => {
  const response = await apiClient.get('', {
    params: { 
      action: 'buscarModelo',
      modelo: modelo
    },
  });
  console.log(response.data)
  return response.data;
};


// src/services/inventarioService.ts

export interface DatosFormularioGuardar {
  esNuevo?: boolean;
  modelo: string;
  marca?: string;
  tipo?: string;
  tecnologia?: string;
  numeroSerie: string;
  estadoBodega: string;
  fechaRecepcion: string;
  ubicacionBodega: string;
  fechaInstalacion?: string;
  fechaBaja?: string;
  motivoBaja?: string;
  observaciones?: string;
  puntoAtencion?: string;
  ubicacionFinal?: string;
}
