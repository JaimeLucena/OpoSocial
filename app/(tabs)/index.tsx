import { LinearGradient } from 'expo-linear-gradient';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  Megaphone,
  Play,
  TrendingUp,
  X,
  Zap
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

// MOCK DATA del prototipo
const MOCK_TOPICS = [
  {
    id: 'common',
    title: 'Parte Común',
    color: 'bg-primary-100 text-primary-700',
    subtopics: [
      { id: 'c1', name: 'Constitución Española 1978', questions: 150, progress: 45, score: 8.2 },
      { id: 'c2', name: 'Estatuto Autonomía Andalucía', questions: 120, progress: 10, score: 6.5 },
      { id: 'c3', name: 'Ley 39/2015 Proc. Admin.', questions: 200, progress: 5, score: 3.4 },
      { id: 'c4', name: 'Igualdad y Violencia Género', questions: 90, progress: 75, score: 9.0 },
    ],
  },
  {
    id: 'specific',
    title: 'Parte Específica',
    color: 'bg-secondary-100 text-secondary-700',
    subtopics: [
      { id: 's1', name: 'Ley 9/2016 Serv. Sociales', questions: 180, progress: 30, score: 7.1 },
      { id: 's2', name: 'Ética y Deontología TS', questions: 60, progress: 100, score: 9.5 },
      { id: 's3', name: 'Historia, Ficha, Informe', questions: 110, progress: 0, score: 0 },
      { id: 's4', name: 'TS Comunitario', questions: 85, progress: 0, score: 0 },
    ],
  },
];

export default function DashboardScreen() {
  const [isPro, setIsPro] = useState(false);

  // Cálculos para datos (exactos del prototipo)
  const allSubtopics = MOCK_TOPICS.flatMap((t) => t.subtopics);
  const topicsWithScore = allSubtopics.filter((t) => t.score > 0);
  const avgScore = (
    topicsWithScore.reduce((acc, topic) => acc + topic.score, 0) / topicsWithScore.length
  ).toFixed(1);
  const bestTopics = [...allSubtopics].sort((a, b) => b.score - a.score).slice(0, 2);
  const worstTopics = [...allSubtopics]
    .filter((t) => t.score > 0)
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-surface-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 112, paddingTop: 32, paddingHorizontal: 24, gap: 32 }}>
        {/* Header clickable para perfil */}
        <View className="flex-row justify-between items-center mb-2">
          <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-3">
            <View className="w-11 h-11 bg-surface-200 rounded-full overflow-hidden border-[3px] border-surface shadow-sm">
              <Image
                source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' }}
                className="w-full h-full"
              />
            </View>
            <View>
              <Text className="text-lg font-bold text-text-primary leading-tight">Hola, Laura</Text>
              <Text className="text-xs text-text-tertiary font-medium mt-0.5">A por la plaza 💪</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            className="p-2.5 rounded-full shadow-sm border border-surface-200 bg-surface">
            <Crown size={20} color="#F59E0B" fill="#F59E0B" />
          </TouchableOpacity>
        </View>

        {/* COUNTDOWN WIDGET */}
        <View className="bg-surface rounded-2xl p-4 flex-row items-center justify-between shadow-sm border border-surface-100">
          <View className="flex-row items-center gap-3">
            <View className="bg-primary-50 p-2 rounded-lg">
              <Calendar size={20} color="#059669" />
            </View>
            <Text className="text-base font-semibold text-text-secondary">Próximo Examen</Text>
          </View>
          <View className="flex-row items-baseline gap-1">
            <Text className="text-2xl font-bold text-text-primary">145</Text>
            <Text className="text-xs text-text-tertiary font-medium">días</Text>
          </View>
        </View>

        {/* RETO DIARIO */}
        <TouchableOpacity activeOpacity={0.95} className="rounded-2xl overflow-hidden shadow-lg">
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 20, minHeight: 160, position: 'relative' }}>
            {/* Top Row: Badge & Play Button */}
            <View className="flex-row justify-between items-start mb-3" style={{ zIndex: 10 }}>
              <View className="bg-white/25 px-3 py-1.5 rounded-full">
                <Text className="text-[9px] font-bold uppercase tracking-widest text-white">
                  RETO DIARIO
                </Text>
              </View>
              <View className="bg-white rounded-full p-2.5 shadow-lg">
                <Play size={18} color="#6366f1" fill="#6366f1" />
              </View>
            </View>

            {/* Content */}
            <View style={{ zIndex: 10, position: 'relative', marginTop: 8 }}>
              <Text className="font-bold text-xl text-white mb-1.5 leading-tight">
                Pregunta del Día
              </Text>
              <Text className="text-white/95 text-sm leading-relaxed font-medium" numberOfLines={2}>
                Repaso rápido: Ley 9/2016 de Servicios Sociales
              </Text>
            </View>

            {/* Clock Watermark - Bottom Right */}
            <View 
              style={{ 
                position: 'absolute', 
                bottom: -24, 
                right: -24, 
                opacity: 0.12,
                transform: [{ rotate: '15deg' }]
              }}>
              <Clock size={100} color="white" strokeWidth={1.2} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* BLOQUE DE ESTADÍSTICAS PRINCIPAL */}
        <View className="flex-row gap-4">
          {/* Nota Media */}
          <View className="flex-1 bg-surface rounded-3xl p-5 shadow-sm border border-surface-100 items-center justify-center min-h-[160px]">
            <View className="relative w-24 h-24 items-center justify-center mb-3">
              <Svg width={96} height={96} style={{ transform: [{ rotate: '-90deg' }] }}>
                <Circle cx="48" cy="48" r="38" stroke="#f3f4f6" strokeWidth="8" fill="none" />
                <Circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke={parseFloat(avgScore) >= 5 ? '#10b981' : '#ef4444'}
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="238"
                  strokeDashoffset={238 - 238 * (parseFloat(avgScore) / 10)}
                  strokeLinecap="round"
                />
              </Svg>
              <Text className="absolute text-2xl font-bold text-text-primary">{avgScore}</Text>
            </View>
            <Text className="text-xs font-bold text-text-tertiary uppercase tracking-wide">Nota Media</Text>
          </View>

          {/* Racha */}
          <View className="flex-1 bg-text-primary rounded-3xl p-5 shadow-md flex-col justify-between relative overflow-hidden min-h-[160px]">
            <View className="bg-white/10 p-2.5 rounded-xl self-start mb-2 backdrop-blur-sm">
              <Zap size={24} color="#FBBF24" fill="#FBBF24" />
            </View>
            <View className="z-10">
              <Text className="text-4xl font-bold text-white mb-1">12</Text>
              <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Días racha
              </Text>
            </View>
          </View>
        </View>

        {/* BANNER PRO (Condicional) */}
        {!isPro && (
          <View className="rounded-2xl overflow-hidden relative shadow-md">
            <View className="bg-gray-900 p-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsPro(true)}
                className="absolute top-2 right-2 p-1.5 bg-white/5 rounded-full z-10">
                <X size={12} color="rgba(255,255,255,0.4)" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} className="flex-row items-center gap-3">
                {/* Crown Icon - Square with golden background */}
                <View className="w-12 h-12 bg-amber-400 rounded-lg items-center justify-center shadow-sm">
                  <Crown size={20} color="#FFF" fill="#FFF" />
                </View>
                {/* Text Content */}
                <View className="flex-1">
                  <Text className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">
                    OPOSOCIAL PRO
                  </Text>
                  <Text className="text-gray-300 font-medium text-sm leading-tight">
                    Elimina anuncios y desbloquea todo
                  </Text>
                </View>
                {/* Chevron Right */}
                <View className="bg-gray-800 rounded-full p-2">
                  <ChevronRight size={18} color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* RANKING (SEMÁFORO) */}
        <View>
          <View className="flex-row items-center gap-2 mb-4 px-1">
            <TrendingUp size={16} color="#6B7280" />
            <Text className="font-bold text-text-secondary text-sm uppercase tracking-wide opacity-80">
              Tu Semáforo
            </Text>
          </View>
          <View className="gap-4">
            <View className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
              <View className="flex-row items-center gap-2 mb-3">
                <CheckCircle size={16} color="#059669" />
                <Text className="text-primary-700 font-bold text-xs uppercase tracking-wider">
                  Dominas
                </Text>
              </View>
              <View className="gap-2">
                {bestTopics.map((t) => (
                  <View key={t.id} className="flex-row justify-between items-center">
                    <Text
                      className="text-text-secondary text-sm flex-1 font-medium"
                      numberOfLines={1}
                      style={{ width: '66.666667%' }}>
                      {t.name}
                    </Text>
                    <View className="bg-white px-2 py-0.5 rounded-md shadow-sm">
                      <Text className="font-bold text-primary-600 text-sm">{t.score}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="bg-status-error/10 rounded-2xl p-4 border border-status-error/20">
              <View className="flex-row items-center gap-2 mb-3">
                <AlertTriangle size={16} color="#DC2626" />
                <Text className="text-status-error font-bold text-xs uppercase tracking-wider">A mejorar</Text>
              </View>
              <View className="gap-2">
                {worstTopics.map((t) => (
                  <View key={t.id} className="flex-row justify-between items-center">
                    <Text
                      className="text-text-secondary text-sm flex-1 font-medium"
                      numberOfLines={1}
                      style={{ width: '66.666667%' }}>
                      {t.name}
                    </Text>
                    <View className="bg-white px-2 py-0.5 rounded-md shadow-sm">
                      <Text className="font-bold text-status-error text-sm">{t.score}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* NOVEDADES */}
        <View>
          <View className="flex-row items-center gap-2 mb-4 px-1">
            <Megaphone size={16} color="#6B7280" />
            <Text className="font-bold text-text-secondary text-sm uppercase tracking-wide opacity-80">
              Novedades
            </Text>
          </View>
          <View className="bg-surface p-4 rounded-2xl border border-surface-100 shadow-sm flex-row gap-4 items-start">
            <View className="w-12 h-12 bg-status-info/10 rounded-xl items-center justify-center border border-status-info/20">
              <Text className="text-[10px] uppercase text-status-info font-bold">OCT</Text>
              <Text className="text-lg leading-none text-status-info font-bold">24</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-text-primary text-sm leading-tight mb-1.5">
                Lista Provisional Admitidos
              </Text>
              <Text className="text-xs text-text-tertiary leading-relaxed" numberOfLines={2}>
                Publicada en BOJA. 10 días para subsanar errores.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
