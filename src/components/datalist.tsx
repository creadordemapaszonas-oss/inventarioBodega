import {useState} from 'react'

export function Datalist({
  modelos,
  modeloSeleccionado,
  setModeloSeleccionado,
  onBuscar,
}: {
  modelos: string[];
  modeloSeleccionado: string;
  setModeloSeleccionado: (val: string) => void;
  onBuscar: (modelo: string) => void;
}) {
  const [mostrarDropdown, setMostrarDropdown] = useState(false);

  // Filtrar lista según lo que escribe el usuario
  const modelosFiltrados = modelos.filter((m) =>
    m.toLowerCase().includes(modeloSeleccionado.toLowerCase())
  );

  return (
    <div className="flex-1 relative">
      <input
        type="text"
        value={modeloSeleccionado}
        onFocus={() => setMostrarDropdown(true)}
        onBlur={() => setTimeout(() => setMostrarDropdown(false), 200)} // Delay para permitir clic en la lista
        onChange={(e) => {
          setModeloSeleccionado(e.target.value);
          setMostrarDropdown(true);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setMostrarDropdown(false);
            onBuscar(modeloSeleccionado);
          }
        }}
        placeholder="Escribe o busca un modelo..."
        className="w-full p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 text-slate-700 text-sm outline-none"
      />

      {/* Dropdown flotante filtrado */}
      {mostrarDropdown && modelosFiltrados.length > 0 && (
        <ul className="absolute z-10 left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-md shadow-lg py-1 text-sm">
          {modelosFiltrados.map((m, idx) => (
            <li
              key={idx}
              onMouseDown={() => {
                setModeloSeleccionado(m);
                setMostrarDropdown(false);
                onBuscar(m);
              }}
              className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-slate-700 transition-colors"
            >
              {m}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}