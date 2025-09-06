import {PanelLeft} from "lucide-react";

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

export default function Header({title}) {
    return (
        <div>
            <div className={"flex flex-row items-center text-white px-2.5 py-2"}>
                <PanelLeft size={30} onClick={toggleSidebar}/>
                <h1 className={"px-5 text-xl"}>{title}</h1>
            </div>
            <hr/>
        </div>
    )
}