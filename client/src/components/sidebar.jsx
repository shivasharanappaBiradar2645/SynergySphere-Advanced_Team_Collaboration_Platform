import { useNavigate } from "react-router-dom";
import {
  Home,
  Folder,
  CheckSquare,
  Bell,
  Settings,
  Moon,
  Users,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate(); // ← define navigate inside the component

  return (
    <aside className="h-screen col-span-2 bg-neutral-900 text-neutral-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 p-4 text-lg font-semibold tracking-wide">
        <Users className="h-6 w-6 text-blue-400" />
        <span className="text-blue-400">SynergySphere</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-2">
       
        <button
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
          onClick={() => navigate("/")}
        >
          <Folder className="h-5 w-5" /> Projects
        </button>
        <button
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
          onClick={() => navigate("/mytask")}
        >
          <CheckSquare className="h-5 w-5" /> MyTasks
        </button>
        <button
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition"
          
        >
          <Bell className="h-5 w-5" /> Notifications
        </button>
      </nav>

      {/* Bottom Section */}
      <div className="px-2 mb-4 space-y-2">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
          <Moon className="h-5 w-5" /> Dark Mode
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <Settings className="h-5 w-5" /> Settings
        </button>
      </div>

      {/* User Info */}
      <div className="border-t border-neutral-800 p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
          JD
        </div>
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs text-neutral-400">johndoe@gmail.com</p>
        </div>
      </div>
    </aside>
  );
}
