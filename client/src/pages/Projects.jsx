import {PanelLeft} from 'lucide-react';
import Sidebar from "../components/sidebar.jsx"
import Header from "../components/Header.jsx";

export default function Projects() {


    return (
        <div className={"grid grid-cols-4 grid-rows-1 gap-4 min-h-screen p-5 bg-neutral-800 grid-flow-col"}>
            {/*sidebar*/}
            <div
                id="sidebar"
                className={`
                    md:min-w-full
                    hidden md:block
                    md:static md:col-span-1 
                    absolute top-0 left-0 z-50 w-3/4 h-full bg-white
                `}
            >
                <Sidebar/>
            </div>

            {/*main*/}
            <div
                id="main"
                className={"col-span-4 md:col-span-3 bg-black rounded-lg min-h-full overflow-y-scroll grid grid-cols-1 grid-rows-[7%_93%]"}
            >
                {/*header*/}
                <Header title={"Projects"}/>
                <hr/>
                <div>
                    {/* main content */}
                </div>
            </div>
        </div>
    )
}
