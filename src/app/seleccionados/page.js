'use client';

import Dashboard from "../../components/Dashboard";
import { useEffect, useState } from "react";
import { fetchSeleccionados } from "../api/actions";

export default function Seleccionados() {

    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSeleccionados = async () => {
            const data = await fetchSeleccionados();
            setSeleccionados(data);
            setLoading(false);
        };
        getSeleccionados();
    }, []);

    return (
        <div className="w-full h-full overflow-hidden">
            {loading ? (
                <div className="w-full h-full flex justify-center items-center">Cargando...</div>
            ) : (
                <Dashboard 
                    title={"Estudiantes seleccionados"} 
                    placeholder={"Buscar estudiante seleccionado..."} 
                    btnTitle={"Eliminar seleccionado/s"} 
                    tableTitle={"Estudiantes seleccionados."} 
                    estudiantes={seleccionados || []}
                />
            )}
        </div>
    );
}