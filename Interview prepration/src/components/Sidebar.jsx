import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Briefcase, 
  CalendarDays, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  Sparkles,
  User
} from "lucide-react";

const SidebarItem = ({ icon: Icon, label, to, activePath }) => {
  const navigate = useNavigate();
  const isActive = activePath === to;
  
  return (
    <div 
      onClick={() => navigate(to)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all group ${
        isActive 
          ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100' 
          : 'text-slate-400 hover:bg-white hover:text-slate-600'
      }`}
    >
      <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
      <span className={`text-sm font-bold tracking-tight ${
        isActive ? 'text-rose-600' : 'text-slate-500'
      }`}>
        {label}
      </span>
    </div>
  );
};

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <aside className="w-72 bg-white/70 backdrop-blur-3xl border-r border-slate-100 flex flex-col p-10 shrink-0 z-10 relative">
      {/* Logo */}
      <div 
        className="flex items-center gap-4 mb-14 px-2 group cursor-pointer" 
        onClick={() => navigate('/dashboard')}
      >
        <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:rotate-12 transition-transform">
          <Sparkles size={24} fill="currentColor" className="text-rose-500" />
        </div>
        <h1 className="text-xs font-black leading-none text-slate-900 uppercase tracking-tighter italic">
          Interview Prep<br/><span className="text-rose-500 text-lg">Tracker.</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" activePath={activePath} />
        <SidebarItem icon={Briefcase} label="My Applications" to="/application" activePath={activePath} />
        <SidebarItem icon={CalendarDays} label="Calendar" to="/interview" activePath={activePath} />
        <SidebarItem icon={BookOpen} label="Resources" to="/resources" activePath={activePath} />
        <SidebarItem icon={TrendingUp} label="Progress" to="/progress" activePath={activePath} />
        <SidebarItem icon={Settings} label="Settings" to="/settings" activePath={activePath} />
      </nav>

      {/* User Profile */}
      <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4 group cursor-pointer">
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
          <img src={user?.avatar || "https://i.pravatar.cc/150?u=default"} alt="User" className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-black text-slate-900 leading-none mb-1 uppercase italic">
            {user?.name || "User"}
          </p>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            {user?.role || "Prep Mode"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

