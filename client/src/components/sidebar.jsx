import { Home, Folder, CheckSquare, Bell, Settings, Moon } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-neutral-900 text-neutral-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-4 text-lg font-semibold tracking-wide">
        <span className="text-blue-400">SynergySphere</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 space-y-2">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <Home className="h-5 w-5" /> Home
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <Folder className="h-5 w-5" /> Projects
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <CheckSquare className="h-5 w-5" /> Tasks
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <Bell className="h-5 w-5" /> Notifications
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-neutral-800 transition">
          <Settings className="h-5 w-5" /> Settings
        </button>
      </nav>

      {/* Dark Mode Toggle */}
      <div className="px-3 mb-4">
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
          <Moon className="h-5 w-5" /> Dark Mode
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
