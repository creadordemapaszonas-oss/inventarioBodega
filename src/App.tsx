import './App.css';
import { buscarModelo, obtenerListaModelos } from './features/dataItems';
import { useEffect, useState } from 'react'
import type { Item, RegisterAssetFormData } from './features/types'
import {Datalist} from './components/datalist'
import { InfoModelo } from './components/infoModelo'
import {FormularioBodega} from './components/formulario'
import { guardarInventario } from './assets/services/api'

// Interfaz para la información del modelo
// Interfaz para el formulario de inventario

function App() {
  // Estados de carga inicial y lista de modelos
  const [modelos, setModelos] = useState<string[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [esModeloNuevo, setEsModeloNuevo] = useState<boolean>(false)

  // Estados para la búsqueda del modelo
  const [modeloSeleccionado, setModeloSeleccionado] = useState<string>('');
  const [buscandoModelo, setBuscandoModelo] = useState<boolean>(false);
  const [infoModelo, setInfoModelo] = useState<Item | null>(null);
  const [errorBusqueda, setErrorBusqueda] = useState<string | null>(null);

  // Estado del formulario de inventario
  const [formInventario, setFormInventario] = useState<RegisterAssetFormData>({
    esNuevo: false,
    numeroSerie: '',
    modelo: '',
    estadoBodega: 'Disponible',
    fechaRecepcion: new Date().toISOString().split('T')[0], // Fecha actual por defecto
    ubicacionBodega: '',
    fechaInstalacion: '',
    fechaBaja: '',
    motivoBaja: '',
    observaciones: '',
    puntoAtencion: '',
    ubicacion: '',
  });

  // 1. Cargar lista de modelos al inicio
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        setCargando(true);
        setError(null);

        const lista = await obtenerListaModelos();
        setModelos(lista);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido al cargar la lista de modelos');
        }
      } finally {
        setCargando(false);
      }
    };
    cargarDatosIniciales();
  }, []);

  // 2. Función para buscar la información técnica de un modelo
  const handleBuscarModelo = async (modeloABuscar: string) => {
    if (!modeloABuscar.trim()) return;

    try {
      setBuscandoModelo(true);
      setErrorBusqueda(null);
      setInfoModelo(null);

      const res = await buscarModelo(modeloABuscar);

      if (res.exito) {
        if (res.item)setInfoModelo(res.item) ;
        setEsModeloNuevo(false)
        // Pre-rellenamos el modelo en el formulario de inventario
        setFormInventario((prev) => ({
          ...prev,
          modelo: res.item?.modelo || modeloABuscar,
          marca: res.item?.marca,
          tipo: res.item?.tipo,
          tecnologia: res.item?.tecnologia,
          isNewModel: false
        }));
        console.log(res, modeloABuscar)
      } else {
        setFormInventario({
          ...formInventario,
          esNuevo: true,
          modelo: modeloABuscar
        })
        setEsModeloNuevo(true)
        setInfoModelo({
        modelo: modeloABuscar,
        marca: '',
        tipo: '',
        tecnologia: ''
      })
        setErrorBusqueda('El modelo no se encuentra en el catálogo.');
      }
    } catch (err: unknown) {
      console.warn(err)
      setErrorBusqueda('Error al conectar con el servidor.');
    } finally {
      setBuscandoModelo(false);
    }
  };

  // Manejador de cambios en los inputs del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInventario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envío del formulario
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log('Datos a guardar:', );
    guardarInventario(formInventario)
    alert('¡Formulario listo para enviarse a Google Apps Script!');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <header className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-800">
            Registro e Inventario de Activos
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Selecciona un modelo existente para cargar sus especificaciones y registrar un ítem.
          </p>
        </header>

        {/* 1. BÚSQUEDA / SELECCIÓN DE MODELO */}
        <section className="bg-white p-5 rounded-lg shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-3">
            1. Búsqueda de Modelo
          </h2>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* El campo siempre está visible y habilitado para que el usuario escriba desde el inicio */}
              <Datalist 
                modelos={modelos} 
                modeloSeleccionado={modeloSeleccionado} 
                setModeloSeleccionado={setModeloSeleccionado} 
                onBuscar={handleBuscarModelo}
              />

              {/* Botón de búsqueda accesible siempre que haya texto en el input */}
              <button
                type="button"
                onClick={() => handleBuscarModelo(modeloSeleccionado)}
                disabled={!modeloSeleccionado.trim() || buscandoModelo}
                className="px-5 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-md hover:bg-blue-700 disabled:bg-slate-300 transition-colors"
              >
                {buscandoModelo ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {/* Indicadores contextuales discretos debajo del campo */}
            {cargando && (
              <p className="text-xs text-blue-600 animate-pulse flex items-center gap-1">
                ⏳ Cargando lista de sugerencias...
              </p>
            )}

            {error && (
              <p className="text-xs text-amber-600 flex items-center gap-1">
                ⚠️ No se pudieron cargar las sugerencias automáticas ({error}). Puedes escribir el modelo manualmente.
              </p>
            )}
          </div>

          {errorBusqueda && (
            <p className="mt-3 text-sm text-amber-600 bg-amber-50 p-2 rounded border border-amber-200">
              ⚠️ {errorBusqueda}
            </p>
          )}
        </section>

        {/* 2. TARJETA DEL MODELO (INFORMACIÓN TÉCNICA) */}
        {infoModelo && <InfoModelo infoModelo = {infoModelo}/>}

        {/* 3. FORMULARIO DE REGISTRO EN INVENTARIO */}
          <FormularioBodega handleInputChange={handleInputChange} handleSubmit={handleSubmit} formInventario={formInventario} esNuevo={esModeloNuevo}/>

      </div>
    </div>
  );
}

export default App;