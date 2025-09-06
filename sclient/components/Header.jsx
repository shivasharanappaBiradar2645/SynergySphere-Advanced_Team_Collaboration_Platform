"use client"

import { PanelLeft } from "lucide-react"

export default function Header({ title, toggleSidebar }) {
  return (
    <div>
      <div className={"flex flex-row items-center text-white px-2.5 py-2"}>
        <PanelLeft size={30} onClick={toggleSidebar} />
        <h1 className={"px-5 text-xl"}>{title}</h1>
      </div>
      <hr />
    </div>
  )
}
