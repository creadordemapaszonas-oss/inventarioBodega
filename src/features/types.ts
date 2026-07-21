export interface Item {
    modelo: string;
    marca: string;
    tipo: string;
    tecnologia: string;
}

export interface CatalogItem {
    exito: boolean; 
    item: Item;
}

export type CreateCatalogItemDTO = CatalogItem;
export type EstadoBodega = 'Disponible' | 'Instalado' | 'En tránsito' | 'Baja';

export interface InventoryAsset {
  numeroSerie: string;
  modelo: string; // Relación con CatalogItem.modelo
  estadoBodega: EstadoBodega;
  fechaRecepcion: string;
  ubicacionBodega: string;
  fechaInstalacion?: string;
  fechaBaja?: string;
  motivoBaja?: string;
  observaciones?: string;
  puntoAtencion?: string;
  ubicacion?: string;
}

// Tipo combinado para formularios de registro que pueden crear el modelo sobre la marcha
export interface RegisterAssetFormData extends InventoryAsset {
  // Datos adicionales si se registra un modelo nuevo simultáneamente
  marca?: string;
  tipo?: string;
  tecnologia?: string;
  esNuevo?: boolean;
}

