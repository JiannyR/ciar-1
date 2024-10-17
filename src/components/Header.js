import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/app/ui/sheet"

export default function Header() {
    const links = [
        {
            name: "Sugerencias",
            path: "/"
        },
        {
            name: "Seleccionados",
            path: "/seleccionados"
        }
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <button><FiMenu size={40} className="top-0 right-0 absolute pl-3 bg-slate-200" /></button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle><span className="w-full flex justify-center text-2xl font-bold bg-[#e7b100] rounded-md text-sky-800 p-1 mb-4">MENU</span></SheetTitle>
                </SheetHeader>
                <nav className="w-full flex flex-col items-center">
                    {links.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.path} 
                            className="w-full font-semibold text-gray-500 hover:text-gray-700 text-center py-2 text-xl"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}