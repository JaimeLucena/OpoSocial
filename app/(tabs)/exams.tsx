import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sliders, FileQuestion, Play } from 'lucide-react-native';
import { useState } from 'react';

// MOCK DATA del prototipo
const MOCK_OFFICIAL_EXAMS = [
  { id: 'ex1', title: 'Junta de Andalucía 2022', type: 'Libre', questions: 105, done: false },
  {
    id: 'ex2',
    title: 'Ayuntamiento de Sevilla 2021',
    type: 'Estabilización',
    questions: 100,
    done: true,
    score: 7.8,
  },
  { id: 'ex3', title: 'Diputación de Málaga 2019', type: 'Libre', questions: 90, done: false },
  { id: 'ex4', title: 'Junta de Andalucía 2017', type: 'Libre', questions: 105, done: false },
];

export default function ExamsScreen() {
  const [numQuestions, setNumQuestions] = useState(25);

  const handleStartTest = () => {
    console.log('Iniciar test con', numQuestions, 'preguntas');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128, paddingTop: 48, paddingHorizontal: 20, gap: 32 }}>
        <Text className="text-2xl font-bold text-gray-900">Exámenes</Text>

        {/* Configuración Examen Aleatorio */}
        <View className="rounded-3xl overflow-hidden">
          <LinearGradient
            colors={['#4f46e5', '#7c3aed']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="p-6">
            <View className="flex-row items-center gap-3 mb-4">
              <View className="p-2 bg-white/20 rounded-lg">
                <Sliders size={20} color="white" />
              </View>
              <Text className="text-lg font-bold text-white">Examen Aleatorio</Text>
            </View>
            <Text className="text-indigo-100 text-xs mb-6">
              Genera un test mezclando temas comunes, específicos y preguntas de supuestos prácticos.
            </Text>

            <View className="mb-6">
              <Text className="text-xs font-bold uppercase tracking-wide text-indigo-200 mb-3">
                Nº Preguntas
              </Text>
              <View className="flex-row bg-black/20 p-1 rounded-xl">
                {[25, 50, 100].map((n) => (
                  <TouchableOpacity
                    key={n}
                    activeOpacity={0.8}
                    onPress={() => setNumQuestions(n)}
                    className={`flex-1 py-2 rounded-lg ${
                      numQuestions === n ? 'bg-white shadow-sm' : ''
                    }`}>
                    <Text
                      className={`text-center text-sm font-bold ${
                        numQuestions === n ? 'text-indigo-700' : 'text-indigo-200'
                      }`}>
                      {n}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleStartTest}
              className="bg-white rounded-xl py-3 items-center justify-center">
              <Text className="text-indigo-700 font-bold text-sm">Comenzar Simulacro</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Lista Exámenes Oficiales */}
        <View>
          <View className="flex-row items-center gap-2 mb-4">
            <FileQuestion size={18} color="#9CA3AF" />
            <Text className="font-bold text-gray-900">Oficiales Anteriores</Text>
          </View>
          <View className="gap-3">
            {MOCK_OFFICIAL_EXAMS.map((exam) => (
              <View
                key={exam.id}
                className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-bold text-gray-800 text-sm mb-1">{exam.title}</Text>
                  <View className="flex-row items-center gap-2">
                    <View className="bg-gray-100 px-1.5 py-0.5 rounded">
                      <Text className="text-[10px] text-gray-500">{exam.type}</Text>
                    </View>
                    <Text className="text-[10px] text-gray-500">• {exam.questions} preg.</Text>
                  </View>
                </View>
                {exam.done ? (
                  <Text className="text-emerald-600 font-bold text-lg">{exam.score}</Text>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleStartTest}
                    className="w-8 h-8 rounded-full bg-indigo-50 items-center justify-center">
                    <Play size={14} color="#4f46e5" fill="#4f46e5" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
