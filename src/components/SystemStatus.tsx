import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Zap, 
  Server, 
  RefreshCw, 
  ShieldCheck, 
  Terminal,
  Layers
} from 'lucide-react';

interface Metric {
  name: string;
  value: number; // percentage
  detail: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

export const SystemStatus: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(28);
  const [ramUsage, setRamUsage] = useState<number>(44);
  const [gpuUsage, setGpuUsage] = useState<number>(18);
  const [diskUsage] = useState<number>(58);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [powerMode] = useState<string>('Alto Rendimiento');

  // Simulate dynamic pulse telemetry updates for Pop!_OS metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => Math.min(95, Math.max(12, prev + (Math.floor(Math.random() * 9) - 4))));
      setRamUsage(prev => Math.min(85, Math.max(35, prev + (Math.floor(Math.random() * 5) - 2))));
      setGpuUsage(prev => Math.min(90, Math.max(8, prev + (Math.floor(Math.random() * 7) - 3))));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setCpuUsage(Math.floor(Math.random() * 30) + 15);
    setRamUsage(Math.floor(Math.random() * 20) + 40);
    setGpuUsage(Math.floor(Math.random() * 25) + 10);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const metrics: Metric[] = [
    {
      name: 'CPU (Intel Core i9)',
      value: cpuUsage,
      detail: `${cpuUsage}% · 16 Núcleos @ 4.8 GHz`,
      icon: Cpu,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Memoria RAM',
      value: ramUsage,
      detail: `${(ramUsage * 0.32).toFixed(1)} GB / 32.0 GB Usados`,
      icon: Layers,
      color: 'text-indigo-400',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      name: 'VRAM GPU (NVIDIA)',
      value: gpuUsage,
      detail: `${(gpuUsage * 0.16).toFixed(1)} GB / 16.0 GB VRAM`,
      icon: Zap,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      name: 'Almacenamiento NVMe',
      value: diskUsage,
      detail: '580 GB Usados / 1 TB Total (/home)',
      icon: HardDrive,
      color: 'text-amber-400',
      gradient: 'from-amber-500 to-orange-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-panel rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full border border-slate-800/80 hover:border-sky-500/30 transition-colors"
    >
      <div>
        {/* Widget Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 leading-none">Estado del Sistema</h2>
              <p className="text-xs text-slate-400 mt-1">Pop!_OS 22.04 LTS · COSMIC</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pop Shell Activo
            </span>
            <button
              onClick={handleManualRefresh}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
              title="Actualizar métricas"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Pop!_OS System Specs Banner */}
        <div className="bg-slate-900/80 rounded-xl p-3 mb-4 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Kernel: <span className="font-mono text-cyan-300">6.11.0-generic</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Modo: <strong className="text-slate-200">{powerMode}</strong></span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="space-y-3">
          {metrics.map((m) => {
            const IconComponent = m.icon;
            return (
              <div key={m.name} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`w-4 h-4 ${m.color}`} />
                    <span className="text-xs font-semibold text-slate-200">{m.name}</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-slate-100">{m.value}%</span>
                </div>

                {/* Meter bar */}
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800/80">
                  <motion.div
                    className={`bg-gradient-to-r ${m.gradient} h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>

                <div className="text-[10px] text-slate-400 font-mono mt-1 text-right">
                  {m.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Engine Status Footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-indigo-400" />
          <span className="text-slate-300 font-medium">Servicio IA Local</span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          Ollama / Llama 3.2 (Listo)
        </div>
      </div>
    </motion.div>
  );
};
