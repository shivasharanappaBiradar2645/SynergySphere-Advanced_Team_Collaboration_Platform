import {PanelLeft} from 'lucide-react';

export default function Projects() {

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const main = document.getElementById('main');

        if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
            main.classList.remove('col-span-4');
            main.classList.add('col-span-3');
        } else {
            sidebar.classList.add('hidden');
            main.classList.remove('col-span-3');
            main.classList.add('col-span-4');
        }
    }

    return (
        <div className={"grid grid-cols-4 grid-rows-1 gap-4 min-h-screen p-5 bg-neutral-800 grid-flow-col"}>
            {/*sidebar*/}
            <div
                id="sidebar"
                className={"col-span-1 bg-white min-h-full hidden md:block"}
            >

            </div>

            {/*main*/}
            <div
                id="main"
                className={"col-span-4 md:col-span-3 bg-black rounded-lg min-h-full overflow-y-scroll grid grid-cols-1 grid-rows-[7%_93%]"}
            >
                {/*header*/}
                <div className={"flex flex-row items-center text-white px-2.5 py-2"}>
                    <PanelLeft size={30} onClick={toggleSidebar}/>
                    <h1 className={"px-5 text-xl"}>Projects</h1>
                </div>
                <hr/>


                <div>
                    {/* main content */}
                </div>
            </div>
        </div>
    )
}
