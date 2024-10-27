'use client'

import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import { fetchEstudiantes } from "./api/actions";

export default function Home() {

  const [sugeridos, setSugeridos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [handleError, setHandleError] = useState(null);

  useEffect(() => {
    const getSugeridos = async () => {
      const { data, message } = await fetchEstudiantes(false);
      setSugeridos(data);
      setLoading(false);
      message && setHandleError(message);
    };
    getSugeridos();
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">Cargando...</div>
      ) : (
        <Dashboard
          title={"Sugerencias de estudiantes"}
          placeholder={"Buscar estudiante seleccionado..."}
          btnTitle={"Anadir sugerido/s"}
          tableTitle={handleError ? 'Ocurrio un error al obtener los estudiantes sugeridos.' : "Sugerencias por el sistema."}
          estudiantes={sugeridos || []}
          onMove={setSugeridos}
          onHandleError={setHandleError}
        />
      )}
    </div>
  );
}
