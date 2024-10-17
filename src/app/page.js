'use client'

import Dashboard from "../components/Dashboard";
import { useEffect, useState } from "react";
import { fetchSugeridos } from "./api/actions";

export default function Home() {

  const [sugeridos, setSugeridos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSugeridos = async () => {
      const data = await fetchSugeridos();
      setSugeridos(data);
      setLoading(false);
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
              tableTitle={"Sugerencias."}
              estudiantes={sugeridos || []}
            />
        )}
    </div>
  );
}
