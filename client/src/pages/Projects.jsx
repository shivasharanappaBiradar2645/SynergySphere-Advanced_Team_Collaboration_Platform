import {PanelLeft} from 'lucide-react';

export default function Projects() {

    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const main = document.getElementById('main');

        const isDesktop = window.matchMedia('(min-width: 768px)').matches;

        if (!isDesktop) {
            if (sidebar.classList.contains('hidden')) {
                sidebar.classList.remove('hidden');
                const onMainClick = (e) => {
                    if (!sidebar.contains(e.target)) {
                        sidebar.classList.add('hidden');
                    }
                };
                main.addEventListener('click', onMainClick, {once: true});
            } else {
                sidebar.classList.add('hidden');
            }
        } else {
            if (sidebar.style.display === 'none') {
                sidebar.style.display = '';
                main.style.gridColumn = '';
            } else {
                sidebar.style.display = 'none';
                main.style.gridColumn = '1 / -1';
            }
        }
    }

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
                {/* sidebar content */}
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
