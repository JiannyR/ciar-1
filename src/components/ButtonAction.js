// ButtonAddSelected.js
export function ButtonAddSelected({ title, onAdd, isDisabled }) {
    return (
        <button 
            className="flex-shrink-0 h-full px-2 py-1 bg-[#cf9f00] text-white font-normal rounded-md hover:bg-[#e9b100] hover:shadow-md disabled:shadow-none disabled:hover:bg-[#cf9f00] disabled:opacity-50"
            onClick={onAdd}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
}

// ButtonDeletedSelected.js
export function ButtonDeletedSelected({ title, onDelete, isDisabled }) {
    return (
        <button 
            className="flex-shrink-0 h-full px-2 py-1 bg-[#cf9f00] text-white font-normal rounded-md hover:bg-[#e9b100] hover:shadow-md disabled:hover:shadow-none disabled:hover:bg-[#cf9f00] disabled:opacity-50"
            onClick={onDelete}
            disabled={isDisabled}
        >
            {title}
        </button>
    );
}
