import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// MOCK DATA del prototipo
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
    ],
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
    ],
  },
];

type TabType = 'common' | 'specific';

export default function TopicsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('common');
  const router = useRouter();

  const currentGroup = MOCK_TOPICS.find((g) => (activeTab === 'common' ? g.id === 'common' : g.id === 'specific'));
  const topics = currentGroup?.subtopics || [];

  const handleTopicPress = (topicId: string) => {
    router.push(`/topic/${topicId}` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128, paddingTop: 48, paddingHorizontal: 20 }}>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-gray-900">Temario</Text>
        </View>

        {/* Tabs */}
        <View className="flex-row p-1 bg-gray-100 rounded-xl mb-6">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('common')}
            className={`flex-1 py-2 rounded-lg ${activeTab === 'common' ? 'bg-white shadow-sm' : ''}`}>
            <Text
              className={`text-center text-sm font-bold ${
                activeTab === 'common' ? 'text-emerald-700' : 'text-gray-400'
              }`}>
              Parte Común
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab('specific')}
            className={`flex-1 py-2 rounded-lg ${activeTab === 'specific' ? 'bg-white shadow-sm' : ''}`}>
            <Text
              className={`text-center text-sm font-bold ${
                activeTab === 'specific' ? 'text-blue-700' : 'text-gray-400'
              }`}>
              Parte Específica
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Temas */}
        <View className="gap-3">
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              activeOpacity={0.99}
              onPress={() => handleTopicPress(topic.id)}
              className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-row items-center justify-between">
              <View className="flex-1 pr-4">
                <Text className="font-semibold text-gray-700 mb-1.5 text-sm leading-tight">
                  {topic.name}
                </Text>
                <View className="w-full h-1 bg-gray-100 rounded-full overflow-hidden" style={{ maxWidth: 100 }}>
                  <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${topic.progress}%` }}
                  />
                </View>
              </View>
              <View className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center">
                <ChevronRight size={16} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
