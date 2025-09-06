import Sidebar from "../components/sidebar.jsx";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProjectCards from "@/components/ProjectCards.jsx";
import { useEffect, useState } from "react";

export default function Projects() {
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch("http://localhost:3000/api/v1/project/list", {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProjectsList(data.data);
                } else {
                    console.error("Failed to fetch projects");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

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
                className={"col-span-4 md:col-span-3 bg-black rounded-lg min-h-full overflow-y-scroll grid grid-cols-1 grid-rows-[7%_93%]"}>

                {/*header*/}
                <Header title={"Projects"}/>

                <div className={"grid grid-cols-1 grid-rows-[10%_90%] py-3 px-3.5"}>
                    {/* main content */}

                    {/*top*/}
                    <div className={"grid grid-cols-1 grid-rows-2"}>
                        {/*bread crumbs*/}
                        <div className={"text-white"}>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Projects</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>

                        {/*new project*/}
                        <div className={"flex flex-row items-center justify-start"}>
                            <Button title={"New Project"} />
                        </div>
                    </div>

                    {/*projects listing*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {projectsList.map((project, idx) => (
                            <ProjectCards key={idx} {...project} />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}
