// Boton para agregar estudiante/s a los seleccionados
export function ButtonAddSelected({ title, isDisabled, onAdd = () => { } }) {
    const handleAdd = () => onAdd(false);

    return (
        <button
            className="flex-shrink-0 h-full px-3 py-2 bg-[#cf9f00] text-white font-normal rounded-md hover:bg-[#e9b100] hover:shadow-md disabled:shadow-none disabled:hover:bg-[#cf9f00] disabled:opacity-50"
            onClick={handleAdd}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
}


// Boton para eliminar estudiante/s seleccionado/s
export function ButtonDeletedSelected({ title, isDisabled, onDelete = () => { } }) {
    const handleDelete = () => onDelete(true);

    return (
        <button
            className="flex-shrink-0 h-full px-3 py-2 bg-[#cf9f00] text-white font-normal rounded-md hover:bg-[#e9b100] hover:shadow-md disabled:shadow-none disabled:hover:bg-[#cf9f00] disabled:opacity-50"
            onClick={handleDelete}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
}

