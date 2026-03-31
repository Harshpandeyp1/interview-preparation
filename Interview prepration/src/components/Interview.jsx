import React, { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Briefcase, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  ChevronRight,
  MoreHorizontal,
  Clock,
  User as UserIcon,
  X,
  PlusCircle,
  Globe,
  Sparkles,
  MapPin,
  Filter,
  ArrowUpRight,
  IndianRupee,
  Building2,
  CalendarDays,
  ChevronLeft,
  Video,
  MapPinned
} from "lucide-react";

/**
 * 🔹 UI UTILITIES & SUB-COMPONENTS
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

const StatusBadge = ({ status }) => {
  const config = {
    "Applied": "bg-blue-50 text-blue-600 border-blue-100",
    "Phone Screen": "bg-purple-50 text-purple-600 border-purple-100",
    "Tech/Onsite": "bg-amber-50 text-amber-600 border-amber-100",
    "Offer": "bg-emerald-50 text-emerald-600 border-emerald-100",
    "Rejected": "bg-rose-50 text-rose-400 border-rose-100",
  };
  return (
    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${config[status] || config["Applied"]}`}>
      {status}
    </span>
  );
};

/**
 * 🔹 MAIN DASHBOARD & REGISTRY
 */
export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'apps' | 'cal'
  const [showAddModal, setShowAddModal] = useState(false);
  
  // 🔹 DATA STATE (Inherited/Ready for Spring Boot)
  const [user, setUser] = useState({
    name: "Alex R.",
    role: "Product Manager Prep",
    avatar: "https://i.pravatar.cc/150?u=alex"
  });

  const [applications, setApplications] = useState([
    { id: 1, company: "Google", role: "Sr. Product Manager", status: "Applied", date: "Jan 12, 2024", location: "Mountain View, CA", salary: "₹45L - ₹60L", logo: "https://www.google.com/favicon.ico" },
    { id: 2, company: "Netflix", role: "Product Designer", status: "Phone Screen", date: "Jan 08, 2024", location: "Los Gatos, CA", salary: "₹50L - ₹75L", logo: "https://www.netflix.com/favicon.ico" },
    { id: 3, company: "Spotify", role: "PM Intern", status: "Tech/Onsite", date: "Jan 02, 2024", location: "Stockholm, SE", salary: "₹15L - ₹20L", logo: "https://www.spotify.com/favicon.ico" },
    { id: 4, company: "Microsoft", role: "Product Lead", status: "Offer", date: "Dec 24, 2023", location: "Redmond, WA", salary: "₹65L+", logo: "https://www.microsoft.com/favicon.ico" },
  ]);

  const [interviews, setInterviews] = useState([
    { id: 1, company: "Google", type: "Technical Node", date: 15, time: "10:30 AM", method: "Google Meet" },
    { id: 2, company: "Meta", type: "System Design", date: 18, time: "04:00 PM", method: "BlueJeans" },
    { id: 3, company: "Amazon", type: "Behavioral Sync", date: 22, time: "11:00 AM", method: "Chime" },
  ]);

  const [newApp, setNewApp] = useState({ company: '', role: '', status: 'Applied', location: 'Remote', salary: '' });

  const handleAddApplication = (e) => {
    e.preventDefault();
    const logoUrl = `https://logo.clearbit.com/${newApp.company.toLowerCase().replace(/\s/g, '')}.com`;
    const entry = {
        ...newApp,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        logo: logoUrl
    };
    setApplications([entry, ...applications]);
    setNewApp({ company: '', role: '', status: 'Applied', location: 'Remote', salary: '' });
    setShowAddModal(false);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans relative selection:bg-rose-100">
      
      {/* 🚀 GLOWING BRIGHT BACKGROUND WITH RED DIAGONAL RAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent:30%,rgba(225,29,72,0.01)_40%,rgba(225,29,72,0.06)_50%,rgba(225,29,72,0.01)_60%,transparent:70%)] animate-pulse-slow"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-rose-50 rounded-full blur-[140px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-slate-50 rounded-full blur-[100px]"></div>
      </div>

      {/* SIDEBAR */}
      <aside className="w-72 bg-white/70 backdrop-blur-3xl border-r border-slate-100 flex flex-col p-10 shrink-0 z-10 relative">
        <div className="flex items-center gap-4 mb-14 px-2 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:rotate-12 transition-transform">
            <Sparkles size={24} fill="currentColor" className="text-rose-500" />
          </div>
          <h1 className="text-xs font-black leading-none text-slate-900 uppercase tracking-tighter italic">
            Interview Prep<br/><span className="text-rose-500 text-lg">Tracker.</span>
          </h1>
        </div>

        <nav className="flex-1 space-y-3">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={Briefcase} label="My Applications" active={activeTab === 'apps'} onClick={() => setActiveTab('apps')} />
          <SidebarItem icon={CalendarDays} label="Calendar" active={activeTab === 'cal'} onClick={() => setActiveTab('cal')} />
          <SidebarItem icon={BookOpen} label="Resources" active={activeTab === 'res'} />
          <SidebarItem icon={TrendingUp} label="Progress" active={activeTab === 'prog'} />
          <SidebarItem icon={Settings} label="Settings" active={activeTab === 'set'} />
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-100 flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm transition-transform group-hover:scale-105">
            <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-black text-slate-900 leading-none mb-1 uppercase italic">{user.name}</p>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">{user.role}</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT Area */}
      <main className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar z-10">
        
        {/* VIEW 1: DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                    Prep <span className="text-rose-500">Journey.</span>
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-3 uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="w-12 h-[1px] bg-rose-500"></span> Welcome back, {user.name.split(' ')[0]}
                </p>
              </div>
              <button onClick={() => setShowAddModal(true)} className="bg-slate-950 hover:bg-black text-white px-8 py-4 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all active:scale-95 border-b-4 border-slate-700 active:border-b-0 flex items-center gap-3">
                <PlusCircle size={18} /> New Application
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              <SummaryCard title="Next Interview" value="Google" subtext="PM Node // Jan 15" />
              <SummaryCard title="Active Leads" value={applications.length} subtext="Tracked Protocol" />
              <SummaryCard title="Prep Health" value="78%" subtext="AI Readiness Score" />
              <SummaryCard title="Mock Metric" value="4.2 / 5" subtext="Target Zone: 4.5" />
            </div>
          </div>
        )}

        {/* VIEW 2: MY APPLICATIONS VIEW */}
        {activeTab === 'apps' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                    Registry <span className="text-rose-500">Node.</span>
                </h2>
                <div className="flex items-center gap-4 mt-5">
                    <span className="px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-rose-100 shadow-sm">Historical Protocol</span>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest border-l border-slate-200 pl-4">Lead Count: {applications.length}</p>
                </div>
              </div>
              <div className="flex gap-4">
                  <button className="p-4.5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-400 hover:text-slate-900 transition-all shadow-sm active:scale-95">
                      <Filter size={20} />
                  </button>
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-slate-950 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-rose-100 active:scale-95 flex items-center gap-3 border-b-4 border-slate-700 active:border-b-0"
                  >
                    <Plus size={18} strokeWidth={3} /> Add Position
                  </button>
              </div>
            </header>

            <div className="bg-white/70 backdrop-blur-3xl rounded-[3.5rem] border border-white shadow-2xl shadow-rose-900/5 overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50/50 border-b border-slate-100 font-mono">
                    <tr>
                      <th className="p-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Organization</th>
                      <th className="p-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Registry Date</th>
                      <th className="p-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Protocol Status</th>
                      <th className="p-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Node Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/30 transition-all group">
                        <td className="p-10">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-[2rem] border border-slate-100 p-3.5 shadow-sm group-hover:rotate-6 group-hover:scale-110 transition-transform">
                              <img src={app.logo} alt="" className="w-full h-full object-contain" />
                            </div>
                            <div className="text-left">
                              <p className="font-black text-slate-900 text-xl tracking-tight leading-none italic uppercase">{app.company}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <MapPin size={12} className="text-rose-500" />
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{app.location}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-10">
                          <p className="font-black text-slate-900 text-sm leading-none">{app.date}</p>
                          <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-2 italic">{app.role}</p>
                        </td>
                        <td className="p-10">
                           <StatusBadge status={app.status} />
                        </td>
                        <td className="p-10 text-right">
                          <button className="p-4.5 bg-white text-slate-200 hover:text-rose-500 transition-all active:scale-90 shadow-sm border border-slate-100 rounded-2xl group-hover:border-rose-100 group-hover:shadow-rose-100">
                            <ArrowUpRight size={22} strokeWidth={2.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}

        {/* VIEW 3: INTERVIEW CALENDAR VIEW */}
        {activeTab === 'cal' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
            <header className="flex justify-between items-end">
              <div>
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
                    Protocol <span className="text-rose-500">Timeline.</span>
                </h2>
                <div className="flex items-center gap-4 mt-5">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-rose-50 text-rose-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-rose-100">
                        <Sparkles size={12}/> AI Schedule Optimization Active
                    </div>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/60 backdrop-blur-xl p-2 rounded-2xl border border-white shadow-sm">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-all"><ChevronLeft size={20}/></button>
                  <span className="text-xs font-black uppercase tracking-[0.2em] px-4">March 2026</span>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-all"><ChevronRight size={20}/></button>
              </div>
            </header>

            <div className="grid grid-cols-12 gap-10">
                {/* CALENDAR GRID */}
                <div className="col-span-12 xl:col-span-8 bg-white/70 backdrop-blur-3xl rounded-[3.5rem] border border-white shadow-2xl p-10">
                    <div className="grid grid-cols-7 gap-4 mb-8">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">{day}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-4">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                            const interview = interviews.find(int => int.date === day);
                            return (
                                <div key={day} className={`h-24 rounded-3xl border transition-all p-3 relative group ${interview ? 'bg-rose-50 border-rose-100 shadow-lg shadow-rose-100/50 -translate-y-1' : 'bg-white/40 border-slate-50 hover:border-rose-100'}`}>
                                    <span className={`text-xs font-black ${interview ? 'text-rose-600' : 'text-slate-300'}`}>{day}</span>
                                    {interview && (
                                        <div className="mt-2 space-y-1">
                                            <p className="text-[9px] font-black text-slate-900 leading-none truncate uppercase italic">{interview.company}</p>
                                            <p className="text-[8px] font-bold text-rose-400 truncate tracking-tighter">{interview.type}</p>
                                        </div>
                                    )}
                                    {day === 24 && (
                                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* STRATEGIC SCHEDULE SIDEBAR */}
                <div className="col-span-12 xl:col-span-4 space-y-6">
                    <div className="bg-slate-950 p-8 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                            <Calendar size={80} />
                        </div>
                        <h3 className="text-xl font-black italic uppercase tracking-tighter mb-6">Strategic Schedule</h3>
                        <div className="space-y-4">
                            {interviews.map(int => (
                                <div key={int.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-500 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[8px] font-black uppercase leading-none">Mar</span>
                                        <span className="text-lg font-black leading-none">{int.date}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-black uppercase tracking-widest truncate">{int.company}</p>
                                        <div className="flex items-center gap-2 text-[9px] text-white/50 mt-1 uppercase font-bold">
                                            <Clock size={10} /> {int.time} • <Video size={10}/> {int.method}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[3.5rem] border border-white shadow-xl">
                        <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] mb-6 italic">Preparation Sync</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm"><IndianRupee size={16}/></div>
                                    <span className="text-[10px] font-black uppercase text-slate-600">Mock Session</span>
                                </div>
                                <ArrowUpRight size={14} className="text-slate-300"/>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm"><MapPinned size={16}/></div>
                                    <span className="text-[10px] font-black uppercase text-slate-600">Review dossier</span>
                                </div>
                                <ArrowUpRight size={14} className="text-slate-300"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </main>

      {/* 🔹 NEW APPLICATION MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white border border-white rounded-[4rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in duration-500">
              <div className="p-16 space-y-10">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-8">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Register <br/> Position</h2>
                    <button onClick={() => setShowAddModal(false)} className="bg-slate-50 p-4 rounded-full text-slate-300 hover:text-slate-900 transition-all active:scale-90"><X size={24} /></button>
                 </div>

                 <form onSubmit={handleAddApplication} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Company</label>
                            <input 
                                required
                                value={newApp.company}
                                onChange={e => setNewApp({...newApp, company: e.target.value})}
                                placeholder="e.g. Google"
                                className="w-full bg-slate-50 border-none rounded-[1.8rem] p-5 text-sm font-bold outline-none focus:ring-8 focus:ring-rose-500/10 transition-all shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Role</label>
                            <input 
                                required
                                value={newApp.role}
                                onChange={e => setNewApp({...newApp, role: e.target.value})}
                                placeholder="Sr. Product Manager"
                                className="w-full bg-slate-50 border-none rounded-[1.8rem] p-5 text-sm font-bold outline-none shadow-inner"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Location</label>
                            <input 
                                value={newApp.location}
                                onChange={e => setNewApp({...newApp, location: i.target.value})}
                                placeholder="Mountain View / Remote"
                                className="w-full bg-slate-50 border-none rounded-[1.8rem] p-5 text-sm font-bold outline-none shadow-inner"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-5">Status Node</label>
                            <select 
                                value={newApp.status}
                                onChange={e => setNewApp({...newApp, status: e.target.value})}
                                className="w-full bg-slate-50 border-none rounded-[1.8rem] p-5 text-sm font-bold outline-none appearance-none cursor-pointer shadow-inner"
                            >
                                <option>Applied</option>
                                <option>Phone Screen</option>
                                <option>Tech/Onsite</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="w-full py-6 rounded-[2.5rem] bg-slate-950 hover:bg-black text-white font-black uppercase text-[11px] tracking-[0.3em] shadow-xl shadow-rose-100 active:scale-95 border-b-4 border-slate-700 active:border-b-0 transition-all">
                        Commit Entry to Registry
                    </button>
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
}