'use client';

import Dashboard from "../../components/Dashboard";
import { useEffect, useState } from "react";
import { fetchEstudiantes } from "../api/actions";

export default function Seleccionados() {

    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [handleError, setHandleError] = useState(null);

    useEffect(() => {
        const getSeleccionados = async () => {
            const { data, message } = await fetchEstudiantes(true);
            setSeleccionados(data);
            setLoading(false);
            message && setHandleError(message);
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
                    tableTitle={handleError ? 'Ocurrio un error al obtener los estudiantes seleccionados.' : "Estudiantes seleccionados."}
                    estudiantes={seleccionados || []}
                    onMove={setSeleccionados}
                    onHandleError={setHandleError}
                />
            )}
        </div>
    );
}