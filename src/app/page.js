import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-full grid grid-rows-[20fr_1fr] grid-cols-1 overflow-hidden">
        <Dashboard title={"Sugerencias de estudiantes"} placeholder={"Buscar estudiante seleccionado..."} btnTitle={"Anadir sugerido/s"} tableTitle={"Sugerencias."} />
        <Footer />
    </div>
  );
}
