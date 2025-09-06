import Sidebar from "../components/sidebar.jsx"
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProjectCards from "@/components/ProjectCards.jsx";


const projectsList = [
    {
        name: "Website Redesign",
        tags: ["UI/UX", "Frontend", "High Priority"],
        image: "/office.jpg",
        deadline: "2025-09-30",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
        name: "Mobile App",
        tags: ["React Native", "Backend"],
        image: "/office.jpg",
        deadline: "2025-10-15",
        tasks: [{ id: 1 }, { id: 2 }]
    },
    {
        name: "E-commerce Platform",
        tags: ["Fullstack", "Payments", "Cloud"],
        image: "/office.jpg",
        deadline: "2025-11-05",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    },
    {
        name: "Portfolio Website",
        tags: ["Personal", "Frontend"],
        image: "/office.jpg",
        deadline: "2025-08-22",
        tasks: [{ id: 1 }]
    },
    {
        name: "AI Chatbot",
        tags: ["Machine Learning", "NLP"],
        image: "/office.jpg",
        deadline: "2025-12-01",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
        name: "Marketing Dashboard",
        tags: ["Analytics", "Charts", "Data"],
        image: "/office.jpg",
        deadline: "2025-09-12",
        tasks: [{ id: 1 }, { id: 2 }]
    },
    {
        name: "CRM System",
        tags: ["Enterprise", "Backend", "Database"],
        image: "/office.jpg",
        deadline: "2026-01-20",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    },
    {
        name: "Learning Platform",
        tags: ["EdTech", "Video", "Frontend"],
        image: "/office.jpg",
        deadline: "2025-11-10",
        tasks: [{ id: 1 }, { id: 2 }]
    },
    {
        name: "Fitness Tracker",
        tags: ["Mobile", "Health", "IoT"],
        image: "/office.jpg",
        deadline: "2025-10-25",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
        name: "Finance Manager",
        tags: ["FinTech", "Charts", "Security"],
        image: "/office.jpg",
        deadline: "2025-09-18",
        tasks: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
    }
];


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
