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
                            <TableHead className="w-[100px] text-gray-500 font-bold">ID</TableHead>
                            <TableHead className="w-full text-gray-500 font-bold">Nombre y Apellidos</TableHead>
                            {/* <TableHead className="w-full text-gray-800">Email</TableHead> */}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {estudiantes.length > 1
                            ? estudiantes.map((estudiante) => (
                                <TableRow
                                    key={estudiante.id}
                                    className={cn(
                                        "text-gray-700",
                                        search.length > 0 && !(estudiante.first_name.toLowerCase().includes(search.toLowerCase()) || estudiante.last_name.toLowerCase().includes(search.toLowerCase())) ? "hidden" : ""
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
                                    <TableCell className="w-[100px]">{estudiante.id_student}</TableCell>
                                    <TableCell className="w-full">{estudiante.first_name} {estudiante.last_name}</TableCell>
                                    {/* <TableCell className="w-full">{estudiante.email || "-"}</TableCell> */}
                                </TableRow>
                            )) : null}
                    </TableBody>
                </Table>
            </div>
        </div>

    );
}