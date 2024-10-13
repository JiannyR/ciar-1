import ButtonAddSelected from "./ButtonAddSelected";
import Searchbar from "./Searchbar";
import TableArea from "./TableArea";

export default function Dashboard({ title, placeholder, btnTitle, tableTitle }) {
    return (
        <div className="w-full flex flex-col gap-6 py-2">
            <span className="text-3xl font-normal text-gray-700">{title}</span>
            <div className="w-full flex gap-4 p-1 rounded-md">
                <Searchbar title={placeholder} />
                <ButtonAddSelected title={btnTitle} />
            </div>
            
            <div className="w-full h-[75vh] flex flex-col overflow-hidden">
                <span className="text-end text-md py-2 font-normal text-yellow-800 border-b">0 - 255 seleccionados</span>
                <TableArea tableTitle={tableTitle} />
            </div>
        </div>
    );
}