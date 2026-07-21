// src/components/InfoModelo.tsx
import React from 'react'
import type { Item } from '../features/types'

interface InfoModeloProps {
  infoModelo: Item
  esNuevo?: boolean
  onChange?: (field: keyof Item, value: string) => void
}

export function InfoModelo({ infoModelo, esNuevo = false, onChange }: InfoModeloProps) {
  // Manejador de cambios cuando los campos son editables
  const handleChange = (field: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(field, e.target.value)
    }
  }

  return (
    <section className={`p-5 rounded-lg shadow-sm border transition-colors ${
      esNuevo ? 'bg-amber-50 border-amber-300' : 'bg-blue-50 border-blue-200'
    }`}>
      {/* Encabezado dinámico */}
      <div className="flex items-center justify-between mb-3">
        <h2 className={`text-xs uppercase tracking-wider font-bold ${
          esNuevo ? 'text-amber-800' : 'text-blue-800'
        }`}>
          {esNuevo ? 'Crear Nuevo Modelo (No encontrado)' : 'Ficha Técnica del Modelo'}
        </h2>
        {esNuevo && (
          <span className="text-xs bg-amber-200 text-amber-800 font-semibold px-2 py-0.5 rounded">
            Nuevo registro
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        {/* MODELO (Siempre de solo lectura, ya que proviene de la búsqueda) */}
        <div>
          <label className="block text-slate-500 text-xs mb-1">Modelo</label>
          <span className="font-semibold text-slate-800 block pt-1">
            {infoModelo.modelo || '-'}
          </span>
        </div>

        {/* MARCA */}
        <div>
          <label className="block text-slate-500 text-xs mb-1">Marca</label>
          {esNuevo ? (
            <input
              type="text"
              value={infoModelo.marca || ''}
              onChange={handleChange('marca')}
              placeholder="Ej. HP, Dell, Zebra..."
              className="w-full px-3 py-1.5 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-800 text-sm"
              required
            />
          ) : (
            <span className="font-semibold text-slate-800 block pt-1">
              {infoModelo.marca || '-'}
            </span>
          )}
        </div>

        {/* TIPO */}
        <div>
          <label className="block text-slate-500 text-xs mb-1">Tipo</label>
          {esNuevo ? (
            <input
              type="text"
              value={infoModelo.tipo || ''}
              onChange={handleChange('tipo')}
              placeholder="Ej. Impresora, Laptop..."
              className="w-full px-3 py-1.5 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-800 text-sm"
              required
            />
          ) : (
            <span className="font-semibold text-slate-800 block pt-1">
              {infoModelo.tipo || '-'}
            </span>
          )}
        </div>

        {/* TECNOLOGÍA */}
        <div>
          <label className="block text-slate-500 text-xs mb-1">Tecnología</label>
          {esNuevo ? (
            <input
              type="text"
              value={infoModelo.tecnologia || ''}
              onChange={handleChange('tecnologia')}
              placeholder="Ej. Térmica, Láser..."
              className="w-full px-3 py-1.5 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-slate-800 text-sm"
            />
          ) : (
            <span className="font-semibold text-slate-800 block pt-1">
              {infoModelo.tecnologia || '-'}
            </span>
          )}
        </div>
      </div>
    </section>
  )
}