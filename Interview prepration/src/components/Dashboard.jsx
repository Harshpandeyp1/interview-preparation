import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";
import { 
  Search, 
  Bell, 
  Plus, 
  ChevronRight,
  MoreHorizontal,
  Clock,
  User as UserIcon,
  X,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Globe,
  Sparkles
} from "lucide-react";

/**
 * 🔹 UI COMPONENTS FOR THE DASHBOARD
 */

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? 'bg-rose-50 text-rose-600 shadow-sm border border-rose-100' : 'text-slate-400 hover:bg-white hover:text-slate-600'}`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm font-bold tracking-tight ${active ? 'text-rose-600' : 'text-slate-500'}`}>{label}</span>
  </div>
);

const SummaryCard = ({ title, value, subtext, children }) => (
  <div className="bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-between h-44 hover:shadow-lg transition-all group">
    <div>
      <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-[0.2em]">{title}</p>
      <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">{value}</h3>
    </div>
    <div className="flex items-end justify-between">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtext}</p>
      {children}
    </div>
  </div>
);

const DonutChart = ({ percentage, color = "#f43f5e" }) => {
  const radius = 30;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform">
      <svg height={radius * 2} width={radius * 2}>
        <circle stroke="#f1f5f9" fill="transparent" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-slate-700">{percentage}%</span>
    </div>
  );
};

const ApplicationColumn = ({ title, apps, active = false }) => (
  <div className="flex-1 min-w-[200px] space-y-4">
    <div className={`text-[10px] font-black uppercase tracking-[0.3em] text-center py-2.5 rounded-xl border backdrop-blur-sm ${active ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
      {title}
    </div>
    <div className="space-y-3">
      {apps.map((app, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm group hover:border-rose-200 transition-all cursor-pointer hover:-translate-y-1">
          <div className="flex items-center gap-3 mb-2">
             <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                <img src={app.logo} alt="" className="w-full h-full object-contain p-1" />
             </div>
             <p className="text-sm font-black text-slate-900 leading-none">{app.company}</p>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{app.role}</p>
        </div>
      ))}
      {apps.length === 0 && (
          <div className="h-20 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-slate-200">
             <Plus size={20} />
          </div>
      )}
    </div>
  </div>
);

/**
 * 🔹 MAIN DASHBOARD VIEW
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [showAddModal, setShowAddModal] = useState(false);

  const [applications, setApplications] = useState([
    { company: "Apple", role: "Product Manager", status: "Applied", logo: "https://www.apple.com/favicon.ico" },
    { company: "Netflix", role: "Product Designer", status: "Phone Screen", logo: "https://www.netflix.com/favicon.ico" },
    { company: "Spotify", role: "PM Intern", status: "Tech/Onsite", logo: "https://www.spotify.com/favicon.ico" },
    { company: "Microsoft", role: "Product Lead", status: "Offer", logo: "https://www.microsoft.com/favicon.ico" },
  ]);

  const [newApp, setNewApp] = useState({ company: '', role: '', status: 'Applied', logo: '' });

  const handleAddApplication = (e) => {
    e.preventDefault();
    const logoUrl = `https://logo.clearbit.com/${newApp.company.toLowerCase().replace(/\s/g, '')}.com`;
    setApplications([...applications, { ...newApp, logo: logoUrl }]);
    setNewApp({ company: '', role: '', status: 'Applied', logo: '' });
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans relative selection:bg-rose-100">
      
      {/* 🚀 GLOWING BACKGROUND WITH RED DIAGONAL RAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(225,29,72,0.01)_40%,rgba(225,29,72,0.06)_50%,rgba(225,29,72,0.01)_60%,transparent_70%)] animate-pulse-slow"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-50 rounded-full blur-[140px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-[100px]"></div>
      </div>

      {/* SHARED SIDEBAR */}
      <Sidebar user={user} />


      {/* MAIN CONTENT Area */}
      <main className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar z-10">
        {/* HEADER BAR */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                Prep <span className="text-rose-500">Journey.</span>
            </h2>
            <p className="text-xs text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-12 h-[1px] bg-rose-500"></span> Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search candidates..." 
                className="bg-white/60 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-6 text-sm w-72 outline-none focus:border-rose-200 focus:bg-white transition-all shadow-sm"
              />
            </div>
            <button className="p-3.5 bg-white border border-slate-100 rounded-2xl text-slate-400 relative hover:text-rose-500 hover:border-rose-100 transition-all shadow-sm active:scale-95">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm" />
            </button>
            <div className="flex gap-3">
              <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-slate-950 hover:bg-black text-white px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-slate-200 active:scale-95 border-b-4 border-slate-700 active:border-b-0 flex items-center gap-3"
              >
                <PlusCircle size={18} /> New Application
              </button>
              <button 
                  onClick={logout}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-rose-200 active:scale-95 flex items-center gap-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <SummaryCard title="Next Interview" value="Google" subtext="PM Node // Jan 15" />
          <SummaryCard title="Active Leads" value={applications.length} subtext="Tracked Protocol" />
          <SummaryCard title="Prep Health" value="78%" subtext="AI Readiness Score">
            <DonutChart percentage={78} />
          </SummaryCard>
          <SummaryCard title="Mock Metric" value="4.2 / 5" subtext="Target Zone: 4.5">
             <div className="relative w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full border border-emerald-100 group-hover:scale-110 transition-transform">
                <TrendingUp size={24} className="text-emerald-500" />
             </div>
          </SummaryCard>
        </div>

        {/* MIDDLE SECTION: CHARTS & UPCOMING */}
        <div className="grid grid-cols-12 gap-10">
          {/* Preparation Progress Bar Chart */}
          <div className="col-span-12 lg:col-span-7 bg-white/70 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] flex items-center gap-3 italic">
                   <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
                   Preparation Core
               </h3>
               <MoreHorizontal className="text-slate-200 cursor-pointer hover:text-slate-400 transition-colors" size={20} />
            </div>
            <div className="flex items-end justify-between h-56 gap-6 px-4">
              {[
                { label: "Technical", val: 75, color: "bg-rose-100" },
                { label: "Behavioral", val: 90, color: "bg-rose-500 shadow-xl shadow-rose-100" },
                { label: "Design", val: 60, color: "bg-rose-200" },
                { label: "Strategy", val: 80, color: "bg-rose-300" },
                { label: "Research", val: 85, color: "bg-rose-400" },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group h-full justify-end">
                  <div className="w-full relative bg-slate-50/50 rounded-2xl overflow-hidden flex flex-col justify-end h-full border border-slate-50 shadow-inner">
                    <div className={`w-full ${bar.color} transition-all duration-1000 rounded-t-xl group-hover:brightness-105`} style={{ height: `${bar.val}%` }}></div>
                  </div>
                  <span className="text-[9px] font-black text-slate-400 mt-4 text-center uppercase tracking-widest leading-tight">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Interviews List */}
          <div className="col-span-12 lg:col-span-5 bg-white/70 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-8 italic">Interview Radar</h3>
            <div className="space-y-4 flex-1">
              {[
                { date: "Jan 15", company: "Google", role: "PM - Technical", logo: "https://www.google.com/favicon.ico" },
                { date: "Jan 18", company: "Meta", role: "System Design", logo: "https://www.meta.com/favicon.ico" },
                { date: "Jan 22", company: "Amazon", role: "Behavioral", logo: "https://www.amazon.com/favicon.ico" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/40 border border-slate-100 rounded-3xl hover:border-rose-100 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="flex items-center gap-5">
                    <div className="text-center w-12 py-1 bg-rose-50 rounded-2xl border border-rose-100">
                      <p className="text-[9px] font-black uppercase text-rose-500 leading-none">{item.date.split(" ")[0]}</p>
                      <p className="text-xl font-black text-slate-900 leading-none mt-1 italic">{item.date.split(" ")[1]}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white p-2 border border-slate-100 shadow-sm transition-transform group-hover:scale-110">
                       <img src={item.logo} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 italic uppercase">{item.company}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.role}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-200 group-hover:text-rose-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: TASKS & APP STATUS */}
        <div className="grid grid-cols-12 gap-10">
          {/* Today's Prep Tasks */}
          <div className="col-span-12 lg:col-span-4 bg-white/70 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] italic leading-none">Task Registry</h3>
              <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">JAN 12</span>
            </div>
            <div className="space-y-6">
              {[
                { title: "System Design", sub: "Database Sharding", icon: Calendar, color: "text-rose-500 bg-rose-50" },
                { title: "Behavioral Prep", sub: "STAR protocol", icon: UserIcon, color: "text-indigo-500 bg-indigo-50" },
                { title: "Mock Session", sub: "4 PM - Senior PM", icon: Clock, color: "text-emerald-500 bg-emerald-50" },
              ].map((task, i) => (
                <div key={i} className="flex items-center gap-5 group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${task.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <task.icon size={20} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-900 italic uppercase leading-none mb-1.5">{task.title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{task.sub}</p>
                  </div>
                  <MoreHorizontal className="text-slate-200" size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Application Status Tracker */}
          <div className="col-span-12 lg:col-span-8 bg-white/70 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.4em] mb-10 italic">Pipeline Tracking</h3>
             <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                {["Applied", "Phone Screen", "Tech/Onsite", "Offer", "Rejected"].map(status => (
                    <ApplicationColumn 
                        key={status}
                        title={status} 
                        apps={applications.filter(app => app.status === status)} 
                        active={status === 'Applied'} 
                    />
                ))}
             </div>
          </div>
        </div>
      </main>

      {/* 🔹 NEW APPLICATION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white border border-white rounded-[4rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-500">
              <div className="p-16 space-y-10">
                 <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none mb-3">Add Node</h2>
                        <p className="text-rose-500 font-black text-[10px] uppercase tracking-[0.4em] opacity-60">Registering New Pipeline Lead</p>
                    </div>
                    <button onClick={() => setShowAddModal(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-300 transition-colors"><X size={28} /></button>
                 </div>

                 <form onSubmit={handleAddApplication} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Company Identity</label>
                        <div className="relative group">
                            <Globe size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
                            <input 
                                required
                                value={newApp.company}
                                onChange={e => setNewApp({...newApp, company: e.target.value})}
                                placeholder="Google, Meta, etc."
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2.2rem] text-sm font-bold outline-none focus:ring-8 focus:ring-rose-500/5 focus:bg-white focus:border-rose-200 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Position Role</label>
                        <div className="relative group">
                            <Briefcase size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-rose-500 transition-colors" />
                            <input 
                                required
                                value={newApp.role}
                                onChange={e => setNewApp({...newApp, role: e.target.value})}
                                placeholder="Sr. Product Designer"
                                className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[2.2rem] text-sm font-bold outline-none focus:ring-8 focus:ring-rose-500/5 focus:bg-white focus:border-rose-200 transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Status Node</label>
                            <select 
                                value={newApp.status}
                                onChange={e => setNewApp({...newApp, status: e.target.value})}
                                className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-[2.2rem] text-sm font-bold outline-none focus:bg-white appearance-none cursor-pointer shadow-inner"
                            >
                                <option>Applied</option>
                                <option>Phone Screen</option>
                                <option>Tech/Onsite</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button type="submit" className="w-full py-5 rounded-[2.2rem] bg-slate-950 hover:bg-black text-white font-black uppercase text-[11px] tracking-[0.3em] shadow-xl shadow-slate-100 active:scale-95 border-b-4 border-slate-700 active:border-b-0 transition-all">
                                Authorize Entry
                            </button>
                        </div>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fee2e2; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
