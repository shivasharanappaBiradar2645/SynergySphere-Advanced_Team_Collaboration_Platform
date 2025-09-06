import {Badge} from "@/components/ui/badge.jsx";
import {ClockAlert} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Button from "@/components/Button.jsx";
import {Ellipsis} from "lucide-react";

export default function ProjectCards(props) {
    return (
        <div
            className="bg-neutral-900 text-white rounded-xl shadow-md border border-neutral-600 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
            {/* Top: tags + name */}
            <div className="p-4 flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                    {props.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className={"bg-white text-black"}>{tag}</Badge>
                    ))}
                </div>
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">{props.name}</h2>
                    <DropdownMenu className="bg-white text-black">
                        <DropdownMenuTrigger>
                            <div>
                                <Ellipsis color={'white'}/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-white text-black">
                            <DropdownMenuLabel>Edit</DropdownMenuLabel>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>

            {/* Image */}
            <div className="w-full h-40 overflow-hidden">
                <img
                    src={props.image ? props.image : "/office.jpg"}
                    alt="project image"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Footer: deadline + tasks */}
            <div className="p-4 flex items-center justify-between text-sm text-neutral-300">
                <div className="flex items-center gap-2">
                    <ClockAlert className="w-4 h-4"/>
                    <span>{props.deadline}</span>
                </div>
                <div>{props.tasks.length} tasks</div>
            </div>
        </div>
    );
}
