import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import TableArea from "./TableArea";
import { useState } from "react";
import { ButtonAddSelected, ButtonDeletedSelected } from "./ButtonAction";
import { moverEstudiantes } from "@/app/api/actions";

export default function Dashboard({ title, placeholder, btnTitle, tableTitle, estudiantes }) {

    const [estudiantesSelected, setEstudiantesSelected] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [search, setSearch] = useState('')
    const pathCurrent = usePathname()

    const checkSelected = (id) => {
        return estudiantesSelected.includes(id) 
            ? setEstudiantesSelected(estudiantesSelected.filter((estudiante) => estudiante !== id)) 
            : setEstudiantesSelected([...estudiantesSelected, id])
    }

    const selectAll = (event) => {
        setSelectedAll(event.target.checked)
        return event.target.checked 
            ? setEstudiantesSelected(estudiantes.map((estudiante) => estudiante.id)) 
            : setEstudiantesSelected([])
    }

    const handleDeleteSelected = async () => {
        if (estudiantesSelected.length > 0) {
            try {
                const { status } = await moverEstudiantes(estudiantesSelected, true);
                
                if (status === 'success') {
                    // Recargar la página
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error al eliminar estudiantes:', error);
            }
        }
    };

    const handleAddSelected = async () => {
        if (estudiantesSelected.length > 0) {
            try {
                const { status } = await moverEstudiantes(estudiantesSelected, false);
                
                if (status === 'success') {
                    // Recargar la página
                    window.location.reload();
                }
            } catch (error) {
                console.error('Error al add estudiantes:', error);
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 h-full">
            <span className="text-3xl font-normal text-gray-700">{title}</span>

            <div className="w-full flex gap-4 p-1 rounded-md">
                <Searchbar title={placeholder} onSearch={setSearch} />
                {pathCurrent === "/seleccionados" 
                    ? <ButtonAddSelected title={btnTitle} onAdd={handleAddSelected} isDisabled={estudiantesSelected.length < 1} /> 
                    : pathCurrent === "/" && <ButtonDeletedSelected title={btnTitle} onDelete={handleDeleteSelected} isDisabled={estudiantesSelected.length < 1} />}
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