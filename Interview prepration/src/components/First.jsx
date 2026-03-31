import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Github, 
  CheckCircle2, 
  AlertCircle, 
  X,
  Loader2,
  Heart,
  Star,
  Smile,
  Rocket
} from "lucide-react";

/**
 * 🔹 Friendly Toast Notification
 */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-500">
      <div className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border backdrop-blur-xl shadow-xl ${
        type === 'error' 
        ? 'bg-rose-50 border-rose-100 text-rose-600' 
        : 'bg-emerald-50 border-emerald-100 text-emerald-600'
      }`}>
        {type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
        <span className="text-sm font-semibold">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-50 transition-opacity"><X size={14} /></button>
      </div>
    </div>
  );
};

export default function First() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.password || (!isLogin && !form.email)) {
      setNotification({ type: 'error', text: 'Please fill in all fields' });
      return;
    }

    setIsLoading(true);

    // Simulated API Call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const adminCredentials = {
      username: "admin123",
      password: "admin@123",
    };

    if (isLogin) {
      if (form.username === adminCredentials.username && form.password === adminCredentials.password) {
        setNotification({ type: 'success', text: 'Welcome back! Redirecting...' });
      } else {
        setNotification({ type: 'error', text: 'Oops! That login didn’t work.' });
        setIsLoading(false);
      }
    } else {
      setNotification({ type: 'success', text: 'Account created! Now try logging in.' });
      setTimeout(() => {
        setIsLogin(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-rose-100 overflow-hidden relative">
      
      {/* 🚀 GLOWING BRIGHT BACKGROUND WITH RED DIAGONAL RAY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle base texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        
        {/* The Red Diagonal Ray - Refined for more vibrancy */}
        <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(225,29,72,0.02)_35%,rgba(225,29,72,0.08)_50%,rgba(225,29,72,0.02)_65%,transparent_70%)] animate-pulse-slow"></div>
        
        {/* Glowing Beam Accent */}
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[30%] bg-rose-500/10 blur-[140px] -rotate-[25deg] transform translate-y-1/2"></div>
        
        {/* Soft Ambient Globs */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-rose-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[5%] left-[-5%] w-[35%] h-[35%] bg-slate-50 rounded-full blur-[100px]" />
      </div>

      {notification && (
        <Toast 
          message={notification.text} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      {/* 🔹 LEFT SIDE (BRANDING) */}
      <div className="hidden lg:flex w-5/12 items-center justify-center relative p-12 z-10">
        <div className="max-w-md space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 border border-slate-100 rounded-2xl text-slate-600 shadow-sm backdrop-blur-sm animate-in slide-in-from-top-4 duration-700">
            <Sparkles size={16} className="text-rose-500" />
            <span className="text-xs font-bold tracking-tight uppercase tracking-widest">Prep Companion v2.0</span>
          </div>
          
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] animate-in slide-in-from-left-8 duration-700">
            Elevate your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-rose-600 to-rose-500">career path.</span>
          </h1>
          
          <p className="text-lg text-slate-500 font-medium leading-relaxed animate-in slide-in-from-left-12 duration-1000">
            Track your progress, unlock insights, and land your dream role with our structured interview frameworks.
          </p>

          <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-1000 delay-500">
             <div className="p-6 bg-white/40 border border-white/60 rounded-[2.5rem] shadow-sm backdrop-blur-md group hover:bg-white/80 hover:shadow-md transition-all duration-300">
                <Heart className="text-rose-500 mb-3 group-hover:scale-110 transition-transform" size={24} fill="none" />
                <p className="text-slate-800 font-bold text-lg leading-none">Top Choice</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Daily_Users</p>
             </div>
             <div className="p-6 bg-white/40 border border-white/60 rounded-[2.5rem] shadow-sm backdrop-blur-md group hover:bg-white/80 hover:shadow-md transition-all duration-300">
                <Star className="text-rose-400 mb-3 group-hover:scale-110 transition-transform" size={24} fill="none" />
                <p className="text-slate-800 font-bold text-lg leading-none">Verified</p>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Expert_Advice</p>
             </div>
          </div>
        </div>
      </div>

      {/* 🔹 RIGHT SIDE (IMPROVED PREMIUM CARD) */}
      <div className="flex w-full lg:w-7/12 justify-center items-center p-6 z-10">
        <div className="w-full max-w-lg animate-in slide-in-from-bottom-12 duration-1000">
          
          <div className="relative group">
            {/* Multi-layered glow behind the card */}
            <div className="absolute -inset-4 bg-rose-500/5 rounded-[4.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute -inset-1 bg-gradient-to-br from-rose-100/50 via-transparent to-slate-200/50 rounded-[4.1rem] blur-sm" />
            
            {/* The Main Card Container */}
            <div className="relative bg-white/70 backdrop-blur-3xl p-1 lg:p-1 rounded-[4rem] border border-white/80 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="bg-white/40 rounded-[3.9rem] p-10 lg:p-14 relative overflow-hidden">
                    
                    {/* Visual Accent Rim */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-rose-500/20 rounded-full" />

                    {/* Header Section */}
                    <div className="flex justify-center mb-10">
                      <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group/icon relative overflow-hidden transition-transform duration-500 hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity" />
                        {isLogin ? (
                          <Smile size={48} strokeWidth={1.5} className="relative z-10 group-hover/icon:rotate-12 transition-transform" />
                        ) : (
                          <Rocket size={48} strokeWidth={1.5} className="relative z-10 group-hover/icon:-translate-y-1 transition-transform" />
                        )}
                      </div>
                    </div>

                    <div className="text-center mb-12">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none mb-4 italic uppercase">
                        {isLogin ? "Welcome" : "Get Started"}
                      </h2>
                      <div className="h-1 w-12 bg-rose-500 mx-auto rounded-full mb-4" />
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                        {isLogin ? "Neural Handshake Required" : "Initialize New Prep Node"}
                      </p>
                    </div>

                    {/* Mode Toggle Switch - Refined pill design */}
                    <div className="flex mb-12 bg-slate-100/40 rounded-[2rem] p-1.5 border border-slate-200/40 relative">
                      <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 py-3.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 ${
                          isLogin ? "bg-white text-rose-600 shadow-md" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Login
                      </button>
                      <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 py-3.5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative z-10 ${
                          !isLogin ? "bg-white text-rose-600 shadow-md" : "text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        Sign Up
                      </button>
                    </div>

                    {/* Form Layout */}
                    <form className="space-y-6" onSubmit={handleSubmit}>

                      {!isLogin && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
                            <label className="text-[10px] font-black text-slate-400 ml-6 uppercase tracking-widest">Global Registry Email</label>
                            <div className="relative group/field">
                              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-rose-500 transition-colors" size={20} />
                              <input
                                type="email"
                                name="email"
                                placeholder="name@domain.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-16 pr-8 py-4.5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-900 outline-none focus:ring-8 focus:ring-rose-500/5 focus:border-rose-200 transition-all shadow-sm placeholder:text-slate-200"
                              />
                            </div>
                        </div>
                      )}

                      <div className="space-y-2">
                          <label className="text-[10px] font-black text-slate-400 ml-6 uppercase tracking-widest">Identity Identifier</label>
                          <div className="relative group/field">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-rose-500 transition-colors" size={20} />
                            <input
                              type="text"
                              name="username"
                              placeholder="admin123"
                              value={form.username}
                              onChange={handleChange}
                              className="w-full pl-16 pr-8 py-4.5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-900 outline-none focus:ring-8 focus:ring-rose-500/5 focus:border-rose-200 transition-all shadow-sm placeholder:text-slate-200"
                            />
                          </div>
                      </div>

                      <div className="space-y-2">
                          <div className="flex justify-between items-center px-6">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                            {isLogin && <button type="button" className="text-[10px] font-black text-rose-500 hover:underline uppercase tracking-widest opacity-70">Forgot?</button>}
                          </div>
                          <div className="relative group/field">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-rose-500 transition-colors" size={20} />
                            <input
                              type="password"
                              name="password"
                              placeholder="••••••••"
                              value={form.password}
                              onChange={handleChange}
                              className="w-full pl-16 pr-8 py-4.5 bg-white border border-slate-100 rounded-[2rem] text-sm font-bold text-slate-900 outline-none focus:ring-8 focus:ring-rose-500/5 focus:border-rose-200 transition-all shadow-sm placeholder:text-slate-200"
                            />
                          </div>
                      </div>

                      <div className="pt-8">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-5 rounded-[2.2rem] bg-slate-950 hover:bg-black text-white font-black uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-4 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <><Loader2 className="animate-spin" size={18} /> Syncing_Node...</>
                            ) : (
                                <>
                                    {isLogin ? "Authorize Access" : "Initialize Node"}
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </>
                            )}
                        </button>
                      </div>
                    </form>

                    {/* External Auth Divider */}
                    <div className="mt-12 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-slate-100"></div>
                        <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em]">Third_Party_Node</span>
                        <div className="h-[1px] flex-1 bg-slate-100"></div>
                    </div>

    <div className="mt-8">
                        <button className="w-full flex items-center justify-center gap-4 py-5 rounded-[1.8rem] bg-white border border-slate-100 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-all text-xs font-black uppercase tracking-widest active:scale-95 shadow-sm">
                            <Github size={20} /> GitHub registry
                        </button>
                    </div>

                    {/* Get Started CTA */}
                    <div className="mt-12">
                      <button
                        onClick={() => navigate('/login')}
                        className="w-full py-6 rounded-[2.5rem] bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-black uppercase text-[12px] tracking-[0.3em] shadow-2xl shadow-rose-200/50 active:scale-[0.97] border-0 transition-all flex items-center justify-center gap-3"
                      >
                        <Sparkles size={20} />
                        Get Started - Track Your Prep Journey
                      </button>
                    </div>
                </div>
            </div>
          </div>

          <p className="mt-12 text-center text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-40">
             Protocol Secure: RSA_4096_GCM
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}