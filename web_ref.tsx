import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  BarChart2, 
  Home, 
  ChevronRight, 
  Play, 
  FileText,
  X,
  Target,
  User,
  ChevronLeft,
  Bell,
  Zap,
  Filter,
  Briefcase,
  AlertCircle,
  Crown,
  Lock,
  Star,
  Check,
  TrendingUp,
  AlertTriangle,
  GraduationCap,
  Settings,
  Calendar,
  FileQuestion,
  Sliders,
  Megaphone // Nuevo icono para novedades
} from 'lucide-react';

// --- MOCK DATA ---
const MOCK_TOPICS = [
  {
    id: 'common',
    title: 'Parte Común',
    color: 'bg-emerald-100 text-emerald-700',
    subtopics: [
      { id: 'c1', name: 'Constitución Española 1978', questions: 150, progress: 45, score: 8.2 },
      { id: 'c2', name: 'Estatuto Autonomía Andalucía', questions: 120, progress: 10, score: 6.5 },
      { id: 'c3', name: 'Ley 39/2015 Proc. Admin.', questions: 200, progress: 5, score: 3.4 },
      { id: 'c4', name: 'Igualdad y Violencia Género', questions: 90, progress: 75, score: 9.0 },
    ]
  },
  {
    id: 'specific',
    title: 'Parte Específica',
    color: 'bg-blue-100 text-blue-700',
    subtopics: [
      { id: 's1', name: 'Ley 9/2016 Serv. Sociales', questions: 180, progress: 30, score: 7.1 },
      { id: 's2', name: 'Ética y Deontología TS', questions: 60, progress: 100, score: 9.5 },
      { id: 's3', name: 'Historia, Ficha, Informe', questions: 110, progress: 0, score: 0 },
      { id: 's4', name: 'TS Comunitario', questions: 85, progress: 0, score: 0 },
    ]
  }
];

const MOCK_CASES_LIST = [
  { id: 'case1', title: 'Supuesto 1: Familia Monoparental', tags: ['Infancia', 'Económico'], difficulty: 'Media', status: 'new', premium: false },
  { id: 'case2', title: 'Supuesto 2: Personas Mayores en Riesgo', tags: ['Dependencia', 'Soledad'], difficulty: 'Fácil', status: 'done', premium: false },
  { id: 'case3', title: 'Supuesto 3: Absentismo Escolar', tags: ['Menores', 'Educación'], difficulty: 'Difícil', status: 'new', premium: true },
  { id: 'case4', title: 'Supuesto 4: Violencia de Género', tags: ['Mujer', 'Urgencia'], difficulty: 'Media', status: 'new', premium: true },
];

const MOCK_OFFICIAL_EXAMS = [
  { id: 'ex1', title: 'Junta de Andalucía 2022', type: 'Libre', questions: 105, done: false },
  { id: 'ex2', title: 'Ayuntamiento de Sevilla 2021', type: 'Estabilización', questions: 100, done: true, score: 7.8 },
  { id: 'ex3', title: 'Diputación de Málaga 2019', type: 'Libre', questions: 90, done: false },
  { id: 'ex4', title: 'Junta de Andalucía 2017', type: 'Libre', questions: 105, done: false },
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    text: "¿Cuál es el objeto de la Ley 9/2016 de Servicios Sociales de Andalucía?",
    options: ["Regular el sistema de salud.", "Garantizar el derecho universal y regular el Sistema Público.", "Privatizar servicios.", "Regular ayudas dependencia."],
    correct: 1,
    explanation: "Art 1: El objeto es garantizar el derecho universal a los servicios sociales y ordenar el Sistema Público."
  }
];

// --- COMPONENTES UI ---

const MobileButton = ({ children, onClick, variant = 'primary', className = '', disabled = false, fullWidth = false, size = 'normal' }) => {
  const heightClass = size === 'small' ? 'h-10 text-xs' : 'h-12 text-sm';
  const baseStyle = `${heightClass} px-6 rounded-xl font-bold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm`;
  
  const variants = {
    primary: "bg-emerald-600 text-white shadow-emerald-200/50 hover:bg-emerald-700 disabled:bg-gray-300 disabled:shadow-none",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
    ghost: "text-gray-500 hover:bg-gray-50 shadow-none",
    action: "bg-gray-900 text-white shadow-gray-400/50",
    premium: "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-200/50"
  };
  
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

// --- COMPONENTE MODAL PREMIUM ---
const PremiumModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity" onClick={onClose} />
      <div className="w-full max-w-sm bg-white rounded-t-[30px] sm:rounded-[30px] p-6 pb-10 shadow-2xl transform transition-transform pointer-events-auto animate-fadeIn relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"><X size={20} /></button>
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 relative">
             <Crown size={40} className="text-amber-500 fill-amber-500" />
             <Star size={20} className="text-amber-400 absolute top-0 right-0 animate-bounce" fill="currentColor" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hazte Premium</h2>
          <p className="text-gray-500 text-sm mb-6">Desbloquea todos los casos y exámenes oficiales</p>
          <MobileButton variant="premium" fullWidth onClick={onClose} className="mb-3 h-14 text-base">Suscribirse por 4,99€/mes</MobileButton>
        </div>
      </div>
    </div>
  );
};

// --- VISTAS ---

// 1. DASHBOARD COMPLETO (Inicio)
const Dashboard = ({ onNavigate, onOpenPremium, onGoToProfile, isPro, setPro }) => {
  // Cálculos para datos
  const allSubtopics = MOCK_TOPICS.flatMap(t => t.subtopics);
  const avgScore = (allSubtopics.filter(t => t.score > 0).reduce((a, b) => a + b, 0) / allSubtopics.filter(t => t.score > 0).length).toFixed(1);
  const bestTopics = [...allSubtopics].sort((a, b) => b.score - a.score).slice(0, 2);
  const worstTopics = [...allSubtopics].filter(t => t.score > 0).sort((a, b) => a.score - b.score).slice(0, 2);

  return (
    <div className="pb-28 pt-12 px-5 space-y-6 animate-fadeIn">
      
      {/* Header clickable para perfil */}
      <header className="flex justify-between items-center">
        <button onClick={onGoToProfile} className="flex items-center gap-3 active:opacity-70 transition-opacity text-left">
          <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-none">Hola, Laura</h1>
            <p className="text-xs text-gray-500 font-medium mt-0.5">A por la plaza 💪</p>
          </div>
        </button>
        <button onClick={onOpenPremium} className="p-2.5 bg-gradient-to-tr from-amber-100 to-orange-100 rounded-full shadow-sm border border-orange-200 relative active:scale-90 transition-transform">
           <Crown size={18} className="text-orange-500" fill="currentColor" />
        </button>
      </header>

      {/* COUNTDOWN WIDGET (Nuevo) */}
      <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
           <Calendar size={18} className="text-emerald-600" />
           <span className="text-sm font-semibold text-gray-700">Próximo Examen</span>
        </div>
        <div className="flex items-center gap-1">
           <span className="font-bold text-gray-900">145</span>
           <span className="text-xs text-gray-500">días estimados</span>
        </div>
      </div>

      {/* RETO DIARIO (Nuevo) */}
      <button onClick={() => onNavigate('test_dummy')} className="w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200 active:scale-95 transition-all text-left group relative overflow-hidden">
        <div className="relative z-10 flex justify-between items-start">
           <div>
              <div className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider inline-block mb-2">Reto Diario</div>
              <h3 className="font-bold text-xl mb-1">Pregunta del Día</h3>
              <p className="text-indigo-100 text-xs max-w-[80%]">Repaso rápido: Ley 9/2016 de Servicios Sociales</p>
           </div>
           <div className="bg-white rounded-full p-2 text-indigo-600 shadow-md group-hover:scale-110 transition-transform">
              <Play size={20} fill="currentColor" />
           </div>
        </div>
        <div className="absolute -right-6 -bottom-6 opacity-20 rotate-12">
           <Clock size={100} />
        </div>
      </button>

      {/* BLOQUE DE ESTADÍSTICAS PRINCIPAL */}
      <div className="grid grid-cols-2 gap-3">
         {/* Nota Media */}
         <div className="col-span-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center relative min-h-[140px]">
             <div className="relative w-20 h-20 flex items-center justify-center mb-2">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="50%" cy="50%" r="32" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                 <circle cx="50%" cy="50%" r="32" stroke={avgScore >= 5 ? "#10b981" : "#ef4444"} strokeWidth="8" fill="none" strokeDasharray="200" strokeDashoffset={200 - (200 * (avgScore / 10))} strokeLinecap="round" />
               </svg>
               <span className="absolute text-xl font-bold text-gray-900">{avgScore}</span>
             </div>
             <span className="text-xs font-bold text-gray-400 uppercase">Nota Media</span>
         </div>

         {/* Racha */}
         <div className="col-span-1 bg-gray-900 rounded-2xl p-4 shadow-lg shadow-gray-200/50 flex flex-col justify-between text-white relative overflow-hidden min-h-[140px]">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm self-start mb-2">
              <Zap size={20} className="text-yellow-400" fill="currentColor" />
            </div>
            <div className="z-10">
              <span className="text-3xl font-bold block">12</span>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Días racha</p>
            </div>
         </div>
      </div>

      {/* BANNER PRO (Condicional) */}
      {!isPro && (
        <div className="w-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 shadow-lg shadow-orange-200 text-white relative overflow-hidden">
           <button onClick={() => setPro(true)} className="absolute top-2 right-2 p-1 bg-black/10 rounded-full hover:bg-black/20 transition-colors">
              <X size={12} className="text-white/80" />
           </button>
           <button onClick={onOpenPremium} className="flex items-center justify-between w-full">
             <div className="text-left">
               <div className="flex items-center gap-1 mb-1">
                  <Crown size={14} fill="currentColor" />
                  <span className="text-xs font-bold uppercase tracking-wide bg-white/20 px-2 py-0.5 rounded">OpoSocial Pro</span>
               </div>
               <p className="font-bold text-sm leading-tight">Elimina anuncios y desbloquea todo</p>
             </div>
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ChevronRight size={18} />
             </div>
           </button>
        </div>
      )}

      {/* RANKING (SEMÁFORO) */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide opacity-60 flex items-center gap-2">
           <TrendingUp size={14} /> Tu Semáforo
        </h3>
        <div className="space-y-3">
           <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
              <div className="flex items-center gap-2 mb-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                 <CheckCircle size={14} /> Dominas
              </div>
              <div className="space-y-1">
                 {bestTopics.map(t => (
                    <div key={t.id} className="flex justify-between items-center text-sm">
                       <span className="text-gray-700 truncate w-2/3">{t.name}</span>
                       <span className="font-bold text-emerald-600 bg-white px-1.5 rounded shadow-sm">{t.score}</span>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="bg-red-50 rounded-xl p-3 border border-red-100">
              <div className="flex items-center gap-2 mb-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                 <AlertTriangle size={14} /> A mejorar
              </div>
              <div className="space-y-1">
                 {worstTopics.map(t => (
                    <div key={t.id} className="flex justify-between items-center text-sm">
                       <span className="text-gray-700 truncate w-2/3">{t.name}</span>
                       <span className="font-bold text-red-600 bg-white px-1.5 rounded shadow-sm">{t.score}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* NOVEDADES (Nuevo) */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide opacity-60 flex items-center gap-2">
           <Megaphone size={14} /> Novedades
        </h3>
        <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-sm flex gap-3 items-start">
             <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex flex-col items-center justify-center text-blue-600 font-bold border border-blue-100">
               <span className="text-[9px] uppercase">OCT</span>
               <span className="text-base leading-none">24</span>
             </div>
             <div>
               <h4 className="font-bold text-gray-800 text-xs leading-tight mb-1">Lista Provisional Admitidos</h4>
               <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">Publicada en BOJA. 10 días para subsanar errores.</p>
             </div>
          </div>
      </div>
    </div>
  );
};

// 2. TEMARIO (Con Pestañas)
const TopicsSection = ({ onSelectTopic, onBack }) => {
  const [activeTab, setActiveTab] = useState('common'); // common | specific

  return (
    <div className="pb-32 pt-12 px-5 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Temario</h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
         <button 
           onClick={() => setActiveTab('common')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'common' ? 'bg-white shadow-sm text-emerald-700' : 'text-gray-400'}`}
         >
           Parte Común
         </button>
         <button 
           onClick={() => setActiveTab('specific')}
           className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'specific' ? 'bg-white shadow-sm text-blue-700' : 'text-gray-400'}`}
         >
           Parte Específica
         </button>
      </div>

      <div className="space-y-3">
         {MOCK_TOPICS.find(g => (activeTab === 'common' ? g.id === 'common' : g.id === 'specific')).subtopics.map((topic) => (
            <button 
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.99] transition-all"
            >
              <div className="text-left flex-1 pr-4">
                <span className="font-semibold text-gray-700 block mb-1.5 text-sm leading-tight">{topic.name}</span>
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${topic.progress}%` }}></div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                 <ChevronRight size={16} />
              </div>
            </button>
         ))}
      </div>
    </div>
  );
};

// 3. CASOS PRÁCTICOS (Lista completa)
const CasesSection = ({ onSelectCase, onOpenPremium }) => {
  return (
    <div className="pb-32 pt-12 px-5 animate-fadeIn">
       <h2 className="text-2xl font-bold text-gray-900 mb-6">Supuestos</h2>
       
       <div className="space-y-3">
          {MOCK_CASES_LIST.map((c) => (
            <button 
              key={c.id}
              onClick={() => c.premium ? onOpenPremium() : onSelectCase(c)}
              className={`w-full bg-white p-4 rounded-xl shadow-sm border active:scale-[0.98] transition-all text-left group relative overflow-hidden ${c.premium ? 'border-amber-200' : 'border-gray-100'}`}
            >
              {c.premium && <div className="absolute inset-0 bg-amber-50/20" />}
              <div className="flex justify-between items-start mb-2 relative z-10">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  c.difficulty === 'Fácil' ? 'bg-green-50 text-green-600 border-green-100' : 
                  c.difficulty === 'Media' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
                  'bg-red-50 text-red-600 border-red-100'
                }`}>
                  {c.difficulty}
                </span>
                {c.premium ? (
                    <div className="bg-amber-100 p-1 rounded text-amber-600"><Lock size={14} /></div>
                ) : c.status === 'done' ? <CheckCircle size={14} className="text-emerald-500" /> : null}
              </div>
              <h3 className="font-bold text-sm text-gray-800 mb-2 relative z-10">{c.title}</h3>
              <div className="flex gap-1 flex-wrap relative z-10">
                {c.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-gray-500 bg-white/80 px-1.5 py-0.5 rounded border border-gray-100">#{tag}</span>
                ))}
              </div>
            </button>
          ))}
       </div>
    </div>
  );
};

// 4. EXÁMENES (Nuevo)
const ExamsSection = ({ onStartTest }) => {
  const [numQuestions, setNumQuestions] = useState(25);

  return (
    <div className="pb-32 pt-12 px-5 animate-fadeIn space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Exámenes</h2>

      {/* Configuración Examen Aleatorio */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-200">
         <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md"><Sliders size={20} /></div>
            <h3 className="text-lg font-bold">Examen Aleatorio</h3>
         </div>
         <p className="text-indigo-100 text-xs mb-6">Genera un test mezclando temas comunes, específicos y preguntas de supuestos prácticos.</p>
         
         <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wide text-indigo-200 mb-3 block">Nº Preguntas</label>
            <div className="flex bg-black/20 p-1 rounded-xl">
               {[25, 50, 100].map(n => (
                 <button 
                   key={n} 
                   onClick={() => setNumQuestions(n)}
                   className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${numQuestions === n ? 'bg-white text-indigo-700 shadow-sm' : 'text-indigo-200 hover:bg-white/10'}`}
                 >
                   {n}
                 </button>
               ))}
            </div>
         </div>
         
         <MobileButton variant="secondary" fullWidth onClick={onStartTest} className="text-indigo-700 border-none h-12">
            Comenzar Simulacro
         </MobileButton>
      </div>

      {/* Lista Exámenes Oficiales */}
      <div>
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
           <FileQuestion size={18} className="text-gray-400" /> Oficiales Anteriores
        </h3>
        <div className="space-y-3">
           {MOCK_OFFICIAL_EXAMS.map(exam => (
             <div key={exam.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div>
                   <h4 className="font-bold text-gray-800 text-sm mb-1">{exam.title}</h4>
                   <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <span className="bg-gray-100 px-1.5 py-0.5 rounded">{exam.type}</span>
                      <span>• {exam.questions} preg.</span>
                   </div>
                </div>
                {exam.done ? (
                   <span className="text-emerald-600 font-bold text-lg">{exam.score}</span>
                ) : (
                   <button onClick={onStartTest} className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-100">
                      <Play size={14} fill="currentColor" />
                   </button>
                )}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

// 5. PERFIL (Vista completa accesible desde header)
const ProfileView = ({ onBack, onOpenPremium }) => {
    return (
        <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto animate-fadeIn">
            <div className="p-5 pt-12 pb-20">
              <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold mb-6 hover:text-gray-900 transition-colors">
                 <ChevronLeft /> Volver
              </button>
              
              <div className="flex flex-col items-center mb-8">
                  <div className="w-28 h-28 bg-gray-200 rounded-full mb-4 border-4 border-white shadow-md overflow-hidden relative group">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Cambiar</span>
                      </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Laura García</h3>
                  <p className="text-sm text-gray-500">Opositora Nivel 4</p>
              </div>

              {/* UPGRADE CARD */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden mb-8">
                  <div className="absolute -top-4 -right-4 p-4 opacity-10 rotate-12">
                      <Crown size={140} />
                  </div>
                  <div className="relative z-10">
                      <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                          OpoSocial <span className="text-amber-400">PRO</span>
                      </h4>
                      <p className="text-gray-300 text-sm mb-6">Acelera tu estudio con herramientas avanzadas.</p>
                      <MobileButton variant="premium" fullWidth onClick={onOpenPremium}>Mejorar Plan</MobileButton>
                  </div>
              </div>

              {/* Ajustes */}
              <div className="space-y-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2 pl-2">Configuración</p>
                  <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={18} /></div>
                         <span className="text-sm font-medium text-gray-700">Notificaciones</span>
                      </div>
                      <div className="w-10 h-6 bg-emerald-500 rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div></div>
                  </button>
                  <button className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:bg-gray-50">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Settings size={18} /></div>
                         <span className="text-sm font-medium text-gray-700">Ajustes de Cuenta</span>
                      </div>
                      <ChevronRight size={16} className="text-gray-400" />
                  </button>
              </div>
              
              <button className="w-full p-6 text-center text-red-500 text-sm font-bold mt-4">Cerrar Sesión</button>
            </div>
        </div>
    )
}

// 6. BOTTOM NAVIGATION (Actualizado)
const BottomNav = ({ current, onChange }) => {
  const items = [
    { id: 'dashboard', icon: <Home size={22} />, label: 'Inicio' },
    { id: 'topics', icon: <BookOpen size={22} />, label: 'Temario' },
    { id: 'cases', icon: <Briefcase size={22} />, label: 'Casos' },
    { id: 'exams', icon: <GraduationCap size={22} />, label: 'Exámenes' },
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-200/50 flex justify-around items-center pt-2 pb-8 z-40">
      {items.map(item => {
        const isActive = current === item.id;
        return (
          <button 
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 w-16 transition-all ${isActive ? 'text-gray-900 scale-105' : 'text-gray-400'}`}
          >
            {item.icon}
            <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  );
};

// --- APP CONTAINER ---

const App = () => {
  const [view, setView] = useState('dashboard'); // dashboard, topics, cases, exams
  const [showProfile, setShowProfile] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPro, setPro] = useState(false); // Estado para simular si es pro

  // Dummy Test Runner para demo
  const [testMode, setTestMode] = useState(null);

  const renderView = () => {
    switch(view) {
      case 'dashboard': return <Dashboard 
        onNavigate={setView} 
        onOpenPremium={() => setShowPremiumModal(true)}
        onGoToProfile={() => setShowProfile(true)}
        isPro={isPro}
        setPro={setPro}
      />;
      case 'topics': return <TopicsSection 
        onSelectTopic={() => setView('test_dummy')} 
        onBack={() => setView('dashboard')} 
      />;
      case 'cases': return <CasesSection 
        onSelectCase={() => setView('test_dummy')}
        onOpenPremium={() => setShowPremiumModal(true)}
      />;
      case 'exams': return <ExamsSection 
        onStartTest={() => setView('test_dummy')}
      />;
      case 'test_dummy': return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fadeIn">
           <div className="mb-4 bg-emerald-100 p-4 rounded-full text-emerald-600"><Play size={32} fill="currentColor"/></div>
           <h2 className="text-xl font-bold mb-2">Modo Test Simulado</h2>
           <p className="text-gray-500 text-sm mb-6">Aquí iría el componente 'MobileTestRunner' que ya tienes implementado.</p>
           <MobileButton onClick={() => setView('dashboard')}>Volver</MobileButton>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex justify-center items-center font-sans p-4 md:p-8">
      <div className="w-full max-w-[380px] h-[800px] bg-black rounded-[50px] p-[10px] shadow-2xl relative border-[4px] border-gray-800 ring-4 ring-gray-300">
        
        {/* Screen */}
        <div className="w-full h-full bg-gray-50 rounded-[40px] overflow-hidden relative flex flex-col">
          
          {/* Status Bar */}
          <div className="absolute top-0 w-full h-12 z-50 flex justify-between items-end px-6 pb-2 text-black font-medium text-[12px]">
             <span>9:41</span>
             <div className="flex items-center gap-1.5 opacity-80">
               <Zap size={12} fill="black" />
               <div className="w-5 h-2.5 border border-black rounded-[3px] relative"><div className="absolute inset-0.5 bg-black w-3/4 rounded-[1px]"></div></div>
             </div>
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-full z-50"></div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            {renderView()}
          </div>

          {/* Nav */}
          {!showProfile && view !== 'test_dummy' && (
            <BottomNav current={view} onChange={setView} />
          )}

          {/* Overlays */}
          {showProfile && <ProfileView onBack={() => setShowProfile(false)} onOpenPremium={() => setShowPremiumModal(true)} />}
          <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />

          {/* Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-black/20 rounded-full z-50 pointer-events-none"></div>
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .animate-fadeIn { animation: fadeIn 0.3s ease-out; }`}</style>
    </div>
  );
};

export default App;