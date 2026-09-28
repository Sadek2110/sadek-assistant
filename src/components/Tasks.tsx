import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckSquare, 
  Square, 
  Plus, 
  Trash2, 
  ListTodo, 
  Tag
} from 'lucide-react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'alta' | 'media' | 'baja';
  tag: string;
}

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Configurar integración con Ollama / Local LLM',
      completed: false,
      priority: 'alta',
      tag: 'IA'
    },
    {
      id: '2',
      title: 'Personalizar atajos de teclado Pop Shell',
      completed: true,
      priority: 'media',
      tag: 'Pop!_OS'
    },
    {
      id: '3',
      title: 'Crear widgets de métricas del sistema en tiempo real',
      completed: false,
      priority: 'alta',
      tag: 'Dev'
    },
    {
      id: '4',
      title: 'Revisar logs de arranque de Pop!_OS 22.04',
      completed: false,
      priority: 'baja',
      tag: 'Sistema'
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'alta' | 'media' | 'baja'>('media');
  const [newTaskTag, setNewTaskTag] = useState('General');
  const [filter, setFilter] = useState<'todas' | 'pendientes' | 'completadas'>('todas');
  const [showForm, setShowForm] = useState(false);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      priority: newTaskPriority,
      tag: newTaskTag.trim() || 'General'
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pendientes') return !task.completed;
    if (filter === 'completadas') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const priorityColors = {
    alta: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    media: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    baja: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full border border-slate-800/80 hover:border-indigo-500/30 transition-colors"
    >
      <div>
        {/* Header & Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ListTodo className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 leading-none">Tareas Pendientes</h2>
              <p className="text-xs text-slate-400 mt-1">
                {completedCount} de {tasks.length} completadas ({progressPercent}%)
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="px-3 py-1.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nueva Tarea
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4 overflow-hidden border border-slate-800">
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Add Task Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddTask}
              className="mb-4 overflow-hidden bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2.5"
            >
              <input
                type="text"
                placeholder="¿Qué necesitas hacer en Pop!_OS?"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full bg-slate-800 text-xs text-slate-100 px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                autoFocus
              />
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value="alta">Prioridad Alta</option>
                  <option value="media">Prioridad Media</option>
                  <option value="baja">Prioridad Baja</option>
                </select>

                <input
                  type="text"
                  placeholder="Etiqueta (ej. IA, Dev)"
                  value={newTaskTag}
                  onChange={(e) => setNewTaskTag(e.target.value)}
                  className="bg-slate-800 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 w-32"
                />

                <button
                  type="submit"
                  className="ml-auto bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  Agregar
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 mb-3">
          {(['todas', 'pendientes', 'completadas'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize transition-colors ${
                filter === f
                  ? 'bg-slate-800 text-indigo-400 border border-indigo-500/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-6 text-slate-500 text-xs">
                No hay tareas en esta sección.
              </div>
            ) : (
              filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className={`group flex items-center justify-between p-3 rounded-xl border transition-all ${
                    task.completed
                      ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="text-slate-400 hover:text-indigo-400 transition-colors flex-shrink-0"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                    <span
                      className={`text-xs font-medium truncate ${
                        task.completed ? 'line-through text-slate-500' : 'text-slate-200'
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5" />
                      {task.tag}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-md border font-semibold capitalize ${
                        priorityColors[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-opacity p-1"
                      title="Eliminar tarea"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
