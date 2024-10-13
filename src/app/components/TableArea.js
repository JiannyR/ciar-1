import { Checkbox } from "../ui/checkbox";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import estudiantes from "../../lib/estudiantes.json"
  
export default function TableArea({ tableTitle }) {
    return (
        <div className="w-full flex-grow h-full overflow-hidden">
            <div className="flex flex-col h-full bg-[#e1dcc6] p-1 rounded-t-md">
                <Table className="w-full flex-1 overflow-y-auto">
                    <TableCaption>{tableTitle}</TableCaption>
                    <TableHeader className="sticky top-0 bg-[#c2bb9f]">
                        <TableRow>
                            <TableHead>
                                <Checkbox id="terms" />
                            </TableHead>
                            <TableHead className="w-[100px] text-gray-800">ID</TableHead>
                            <TableHead className="w-full text-gray-800">Nombre y Apellidos</TableHead>
                            <TableHead className="w-full text-gray-800">Promedio</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {estudiantes.map((estudiante) => (
                            <TableRow key={estudiante.id} className="text-gray-700">
                                <TableCell>
                                    <Checkbox id={estudiante.id} />
                                </TableCell>
                                <TableCell className="w-[100px]">{estudiante.id}</TableCell>
                                <TableCell className="w-full">{estudiante.nombre} {estudiante.apellido}</TableCell>
                                <TableCell className="w-full">{estudiante.promedio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>

    );
}