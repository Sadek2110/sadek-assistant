import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Search, 
  Bell, 
  Settings, 
  Sparkles, 
  Command, 
  Clock as ClockIcon,
  LayoutDashboard,
  Shield,
  Terminal,
  Cpu
} from 'lucide-react';
import { Calendar } from './components/Calendar';
import { Tasks } from './components/Tasks';
import { Projects } from './components/Projects';
import { SystemStatus } from './components/SystemStatus';

export const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tareas' | 'proyectos' | 'sistema'>('dashboard');

  // Live Clock setup
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date in Spanish: e.g. "Lunes, 28 de Septiembre, 2026"
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const formatted = date.toLocaleDateString('es-ES', options);
    // Capitalize first letter of weekday & month
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  // Format time: e.g. "12:05:47"
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Background ambient lighting effects for Pop!_OS theme */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header / Desktop Top Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Left: App Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-100 font-sans">
                Sadek <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Assistant</span>
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold border border-cyan-500/20 uppercase tracking-wider">
                Pop!_OS v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Asistente Personal con IA
            </p>
          </div>
        </div>

        {/* Center: Live Date & Clock Display */}
        <div className="hidden md:flex items-center gap-4 px-4 py-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
            <ClockIcon className="w-4 h-4 text-cyan-400" />
            <span>{formatDate(currentTime)}</span>
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="text-sm font-bold font-mono text-cyan-400 tracking-wider">
            {formatTime(currentTime)}
          </div>
        </div>

        {/* Right: Search / Command Bar & Profile */}
        <div className="flex items-center gap-3">
          {/* Quick Command Launcher */}
          <div className="relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar comando o atajo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900/90 text-xs text-slate-200 placeholder-slate-500 pl-9 pr-9 py-2 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 w-60 transition-all focus:w-72"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-500 font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
              <Command className="w-2.5 h-2.5" /> K
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-cyan-400 absolute top-1.5 right-1.5" />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-slate-950 shadow-md">
              S
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-200 leading-none">Sadek</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Usuario Principal</div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sub-header / View Tabs */}
      <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard Principal
          </button>
          <button
            onClick={() => setActiveTab('tareas')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'tareas'
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Tareas
          </button>
          <button
            onClick={() => setActiveTab('proyectos')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'proyectos'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Proyectos
          </button>
          <button
            onClick={() => setActiveTab('sistema')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'sistema'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Métricas Sistema
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Pop!_OS COSMIC Shell Ready</span>
        </div>
      </div>

      {/* Main Content Area - Dashboard Grid Layout */}
      <main className="flex-1 p-6 max-w-[1600px] w-full mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {/* Widget 1: System Status (High priority metric component for Pop!_OS) */}
          <div className="lg:col-span-1 min-h-[380px]">
            <SystemStatus />
          </div>

          {/* Widget 2: Tasks (Interactive task list) */}
          <div className="lg:col-span-1 min-h-[380px]">
            <Tasks />
          </div>

          {/* Widget 3: Calendar (Month view + Agenda state) */}
          <div className="lg:col-span-1 min-h-[380px]">
            <Calendar />
          </div>

          {/* Widget 4: Projects (Spans full row or 2 cols depending on screen size) */}
          <div className="md:col-span-2 lg:col-span-3 min-h-[320px]">
            <Projects />
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-900 px-6 py-3 text-center text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <span>Sadek Assistant © 2026 · Diseñado para Pop!_OS Desktop</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400 font-mono">Tauri v2 + React + TypeScript + Tailwind</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
