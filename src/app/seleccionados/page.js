import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";

export default function Seleccionados() {
    return (
        <div className="w-full grid grid-rows-[20fr_1fr] grid-cols-1 overflow-hidden">
            <Dashboard title={"Estudiantes seleccionados"} placeholder={"Buscar estudiante seleccionado..."} btnTitle={"Eliminar seleccionado/s"} tableTitle={"Estudiantes seleccionados."} />
            <Footer />
    </div>
    );
}