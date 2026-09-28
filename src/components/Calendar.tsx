import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  CalendarX 
} from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  time: string;
  category: string;
}

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('10:00');

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get first day of month (0 = Sun, 1 = Mon, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDay(today.getDate());
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;
    const newEv: EventItem = {
      id: Date.now().toString(),
      title: newEventTitle,
      time: newEventTime,
      category: 'Personal'
    };
    setEvents([...events, newEv]);
    setNewEventTitle('');
    setShowAddEvent(false);
  };

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-2xl p-5 shadow-xl flex flex-col justify-between h-full border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
    >
      {/* Header Widget */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 leading-none">Calendario</h2>
              <p className="text-xs text-slate-400 mt-1">Agenda & Planificación</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
              title="Mes anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-2 py-0.5 text-xs font-medium text-cyan-400 hover:bg-cyan-500/10 rounded-md transition-colors"
            >
              Hoy
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
              title="Mes siguiente"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current Month & Year Display */}
        <div className="text-center font-medium text-sm text-slate-200 mb-3 tracking-wide">
          {monthNames[month]} <span className="text-cyan-400 font-semibold">{year}</span>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-[11px] font-semibold text-slate-400 py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Month Days Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty slots before day 1 */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-7" />
          ))}

          {/* Days numbers */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const dayNum = index + 1;
            const isTodayDay = isCurrentMonth && today.getDate() === dayNum;
            const isSelected = selectedDay === dayNum;

            return (
              <button
                key={dayNum}
                onClick={() => setSelectedDay(dayNum)}
                className={`h-7 rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                  isTodayDay
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                    : isSelected
                    ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Events / Agenda Section */}
      <div className="mt-5 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Eventos ({selectedDay} {monthNames[month].slice(0, 3)})
          </span>
          <button
            onClick={() => setShowAddEvent(!showAddEvent)}
            className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            Añadir
          </button>
        </div>

        {showAddEvent && (
          <form onSubmit={handleAddEvent} className="mb-3 space-y-2 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
            <input
              type="text"
              placeholder="Nombre del evento..."
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="w-full bg-slate-800 text-xs text-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="bg-slate-800 text-xs text-slate-200 px-2 py-1 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs py-1 rounded-lg transition-colors"
              >
                Guardar
              </button>
            </div>
          </form>
        )}

        {/* Empty State / Events list */}
        {events.length === 0 ? (
          <div className="bg-slate-900/50 rounded-xl p-3 border border-dashed border-slate-800/80 text-center flex flex-col items-center justify-center py-4">
            <CalendarX className="w-6 h-6 text-slate-600 mb-1" />
            <p className="text-xs font-medium text-slate-400">Sin eventos en la agenda</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Widget preparado para tus reuniones</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
            {events.map((ev) => (
              <div key={ev.id} className="bg-slate-900/80 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div className="truncate font-medium text-slate-200">{ev.title}</div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                  <Clock className="w-3 h-3" />
                  {ev.time}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
