import React from 'react';
import type { RegisterAssetFormData } from '../features/types';

type HandleInputChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => void;

type HandleSubmit = (e: React.SubmitEvent<Element>) => void;

interface FormularioBodegaProps {
  handleSubmit: HandleSubmit;
  handleInputChange: HandleInputChange;
  formInventario: RegisterAssetFormData;
  esNuevo?: boolean; // Prop condicional para saber si el modelo es nuevo
}

export function FormularioBodega({
  handleSubmit,
  handleInputChange,
  formInventario,
  esNuevo = false,
}: FormularioBodegaProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 space-y-4"
    >
      <h2 className="text-lg font-semibold text-slate-700 border-b pb-2">
        2. Datos del Activo Físico
      </h2>

      {/* SECCIÓN CONDICIONAL: Solo si el modelo es nuevo */}
      {esNuevo && (
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200 space-y-3">
          <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
            ⚠️ Nuevo Modelo Detectado: Complete las especificaciones básicas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            {/* Marca */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Marca *
              </label>
              <input
                type="text"
                name="marca"
                required={esNuevo}
                value={formInventario.marca || ''}
                onChange={handleInputChange}
                placeholder="Ej. HP, Dell, Cisco"
                className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Tipo *
              </label>
              <input
                type="text"
                name="tipo"
                required={esNuevo}
                value={formInventario.tipo || ''}
                onChange={handleInputChange}
                placeholder="Ej. Laptop, Router, Monitor"
                className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            {/* Tecnología */}
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Tecnología
              </label>
              <input
                type="text"
                name="tecnologia"
                value={formInventario.tecnologia || ''}
                onChange={handleInputChange}
                placeholder="Ej. Core i7, WiFi 6, fibra"
                className="w-full p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* CAMPOS ESTÁNDAR DEL INVENTARIO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        {/* Número de Serie */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Número de Serie *
          </label>
          <input
            type="text"
            name="numeroSerie"
            required
            value={formInventario.numeroSerie}
            onChange={handleInputChange}
            placeholder="Ej. SN-987654321"
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Modelo (Pre-rellenado) */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Modelo
          </label>
          <input
            type="text"
            name="modelo"
            disabled
            value={formInventario.modelo}
            className="w-full p-2 border border-slate-200 bg-slate-100 text-slate-600 rounded cursor-not-allowed font-medium"
          />
        </div>

        {/* Estado en Bodega */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Estado en Bodega
          </label>
          <select
            name="estadoBodega"
            value={formInventario.estadoBodega}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="BODEGA_DISPONIBLE">Disponible en Bodega</option>
            <option value="INSTALADO">Instalado / En Uso</option>
            <option value="EN_REPARACION">En Reparación</option>
            <option value="BAJA">Dado de Baja</option>
          </select>
        </div>

        {/* Fecha Recepción */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Fecha Recepción
          </label>
          <input
            type="date"
            name="fechaRecepcion"
            value={formInventario.fechaRecepcion}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ubicación Bodega */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Ubicación en Bodega
          </label>
          <input
            type="text"
            name="ubicacionBodega"
            placeholder="Ej. Estante A3, Percha 2"
            value={formInventario.ubicacionBodega}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Punto de Atención */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Punto de Atención
          </label>
          <input
            type="text"
            name="puntoAtencion"
            placeholder="Ej. Agencia Principal"
            value={formInventario.puntoAtencion}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ubicación Final / Cliente */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Ubicación Final
          </label>
          <input
            type="text"
            name="ubicacion"
            placeholder="Ej. Oficina 301 - Piso 3"
            value={formInventario.ubicacion}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fecha Instalación */}
        <div>
          <label className="block font-medium text-slate-700 mb-1">
            Fecha Instalación
          </label>
          <input
            type="date"
            name="fechaInstalacion"
            value={formInventario.fechaInstalacion}
            onChange={handleInputChange}
            className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Observaciones */}
      <div>
        <label className="block font-medium text-slate-700 mb-1 text-sm">
          Observaciones
        </label>
        <textarea
          name="observaciones"
          rows={2}
          placeholder="Detalles adicionales sobre el estado del equipo..."
          value={formInventario.observaciones}
          onChange={handleInputChange}
          className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      {/* Botón de Guardar */}
      <div className="pt-3 border-t flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 shadow-sm transition-colors"
        >
          💾 Guardar Registro en Inventario
        </button>
      </div>
    </form>
  );
}