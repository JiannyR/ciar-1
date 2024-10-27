import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import TableArea from "./TableArea";
import { useState } from "react";
import { ButtonAddSelected, ButtonDeletedSelected } from "./ButtonAction";
import { fetchEstudiantes, moverEstudiantes } from "@/app/api/actions";

export default function Dashboard({ title, placeholder, btnTitle, tableTitle, estudiantes, onMove = () => { }, onHandleError = () => { } }) {

    const [estudiantesSelected, setEstudiantesSelected] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [search, setSearch] = useState('')
    const pathCurrent = usePathname()

    // Función para seleccionar un estudiante
    const checkSelected = (id) => {
        return estudiantesSelected.includes(id)
            ? setEstudiantesSelected(estudiantesSelected.filter((estudiante) => estudiante !== id))
            : setEstudiantesSelected([...estudiantesSelected, id])
    }

    // Función para seleccionar todos los estudiantes
    const selectAll = (event) => {
        setSelectedAll(event.target.checked)
        return event.target.checked
            ? setEstudiantesSelected(estudiantes.map((estudiante) => estudiante.id))
            : setEstudiantesSelected([])
    }

    // Función para mover los estudiantes seleccionados
    const handleMoveSelected = async (flag) => {
        if (estudiantesSelected.length > 0) {
            const { status, message } = await moverEstudiantes(estudiantesSelected, flag);
            if (status === 'success') {
                const { data, message } = await fetchEstudiantes((pathCurrent === "/seleccionados") ? true : false);
                onMove(data);
                setSelectedAll(false);
                setEstudiantesSelected([]);
                message && onHandleError(message);
            } else {
                console.error('[Error al mover estudiante/s]:', message);
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 h-full">
            <span className="text-3xl font-bold text-gray-600">{title}</span>

            <div className="w-full flex gap-4 p-1 rounded-md">
                <Searchbar title={placeholder} onSearch={setSearch} />
                {pathCurrent === "/seleccionados"
                    ? <ButtonAddSelected title={btnTitle} onAdd={handleMoveSelected} isDisabled={estudiantesSelected.length < 1} />
                    : pathCurrent === "/" && <ButtonDeletedSelected title={btnTitle} onDelete={handleMoveSelected} isDisabled={estudiantesSelected.length < 1} />}
            </div>

            <div className="w-full flex-grow overflow-hidden">
                <div className="flex justify-end items-center py-2">
                    <span className="text-md font-normal text-yellow-800">
                        {estudiantesSelected.length} - {estudiantes.length} seleccionados
                    </span>
                </div>
                <div className="h-full overflow-y-auto">
                    <TableArea
                        tableTitle={tableTitle}
                        estudiantes={estudiantes}
                        search={search}
                        isCheckedAll={selectedAll}
                        estudiantesSelected={estudiantesSelected}
                        onSelected={checkSelected}
                        onSelectedAll={selectAll}
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}