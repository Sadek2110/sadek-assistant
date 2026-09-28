import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  Plus, 
  ExternalLink, 
  Code2, 
  CheckCircle2, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'en_desarrollo' | 'planificado' | 'completado';
  progress: number;
  tech: string[];
  tasksCount: number;
}

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Sadek Assistant Desktop',
      description: 'Asistente inteligente nativo integrando Tauri, React y modelos de IA en Pop!_OS.',
      status: 'en_desarrollo',
      progress: 65,
      tech: ['Tauri', 'React', 'TS', 'Tailwind'],
      tasksCount: 8
    },
    {
      id: '2',
      name: 'Pop!_OS System Optimizer',
      description: 'Herramientas de optimización de kernel, batería y memoria para COSMIC Desktop.',
      status: 'en_desarrollo',
      progress: 40,
      tech: ['Rust', 'Bash', 'COSMIC'],
      tasksCount: 5
    },
    {
      id: '3',
      name: 'Local LLM Orchestrator',
      description: 'Módulo de inferencia offline usando Ollama / Llama 3 con aceleración GPU.',
      status: 'planificado',
      progress: 20,
      tech: ['Python', 'Ollama', 'PyTorch'],
      tasksCount: 12
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newProj: Project = {
      id: Date.now().toString(),
      name: newProjectName.trim(),
      description: newProjectDesc.trim() || 'Proyecto de desarrollo para Sadek Assistant.',
      status: 'planificado',
      progress: 5,
      tech: newProjectTech.split(',').map(t => t.trim()).filter(Boolean),
      tasksCount: 1
    };

    setProjects([...projects, newProj]);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setShowAddModal(false);
  };

  const statusBadge = (status: Project['status']) => {
    switch (status) {
      case 'en_desarrollo':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Clock className="w-2.5 h-2.5" />
            En desarrollo
          </span>
        );
      case 'planificado':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Sparkles className="w-2.5 h-2.5" />
            Planificado
          </span>
        );
      case 'completado':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle2 className="w-2.5 h-2.5" />
            Completado
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full border border-slate-800/80 hover:border-emerald-500/30 transition-colors"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FolderKanban className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 leading-none">Proyectos</h2>
              <p className="text-xs text-slate-400 mt-1">{projects.length} proyectos activos</p>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(!showAddModal)}
            className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuevo Proyecto
          </button>
        </div>

        {/* Add Project Form */}
        <AnimatePresence>
          {showAddModal && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddProject}
              className="mb-4 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2"
            >
              <input
                type="text"
                placeholder="Nombre del proyecto..."
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="w-full bg-slate-800 text-xs text-slate-100 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
                autoFocus
              />
              <input
                type="text"
                placeholder="Descripción..."
                value={newProjectDesc}
                onChange={(e) => setNewProjectDesc(e.target.value)}
                className="w-full bg-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Tecnologías (ej. Rust, React)"
                  value={newProjectTech}
                  onChange={(e) => setNewProjectTech(e.target.value)}
                  className="flex-1 bg-slate-800 text-xs text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  Guardar
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Projects List Grid */}
        <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="glass-card p-3.5 rounded-xl border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between gap-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-slate-100">{proj.name}</h3>
                    {statusBadge(proj.status)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <button 
                  className="text-slate-500 hover:text-cyan-400 transition-colors p-1" 
                  title="Detalles"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium mb-1">
                  <span>Progreso</span>
                  <span className="text-emerald-400 font-mono">{proj.progress}%</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              {/* Technologies tags & tasks count */}
              <div className="flex items-center justify-between text-[10px] pt-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Code2 className="w-3 h-3 text-slate-500" />
                  {proj.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300 font-mono text-[9px] border border-slate-700/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-slate-400 font-medium">{proj.tasksCount} tareas</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
