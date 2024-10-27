import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../app/ui/table"
import { cn } from "@/lib/utils";

export default function TableArea({ tableTitle, estudiantes, search, isCheckedAll, estudiantesSelected, onSelected = () => { }, onSelectedAll = () => { } }) {

    return (
        <div className="w-full flex-grow h-full overflow-hidden">
            <div className="flex flex-col h-full bg-[#dddbd3] rounded-t-lg border-2 border-[#bdb181]">
                <Table className="w-full flex-1 overflow-y-auto">
                    <TableCaption>{tableTitle}</TableCaption>
                    <TableHeader className="sticky top-0 bg-[#bdb181]">
                        <TableRow>
                            <TableHead>
                                <input
                                    type="checkbox"
                                    className="flex justify-center h-4 w-4 disabled:cursor-not-allowed"
                                    checked={isCheckedAll}
                                    onChange={onSelectedAll}
                                />
                            </TableHead>
                            <TableHead className="w-[100px] text-gray-800">Grupo</TableHead>
                            <TableHead className="w-full text-gray-800">Nombre y Apellidos</TableHead>
                            <TableHead className="w-full text-gray-800">Promedio General</TableHead>
                            <TableHead className="w-full text-gray-800">indice General</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {estudiantes.length > 1
                            ? estudiantes.map((estudiante) => (
                                <TableRow
                                    key={estudiante.id}
                                    className={cn(
                                        "text-gray-700",
                                        search.length > 0 && !(estudiante.full_name.toLowerCase().includes(search.toLowerCase()) ) ? "hidden" : ""
                                    )}
                                >
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            id={estudiante.id}
                                            className="flex justify-center h-4 w-4 disabled:cursor-not-allowed"
                                            checked={estudiantesSelected.includes(estudiante.id)} onChange={() => onSelected(estudiante.id)}
                                        />
                                    </TableCell>
                                    <TableCell className="w-[100px]">{estudiante.grupo}</TableCell>
                                    <TableCell className="w-full">{estudiante.full_name}</TableCell>
                                    <TableCell className="w-full">{estudiante.avg_gen}</TableCell>
                                    <TableCell className="w-full">{estudiante.indice_gen}</TableCell>

                                </TableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </div>
        </div>

    );
}