import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lock, CheckCircle } from 'lucide-react-native';

// MOCK DATA del prototipo
const MOCK_CASES_LIST = [
  {
    id: 'case1',
    title: 'Supuesto 1: Familia Monoparental',
    tags: ['Infancia', 'Económico'],
    difficulty: 'Media',
    status: 'new',
    premium: false,
  },
  {
    id: 'case2',
    title: 'Supuesto 2: Personas Mayores en Riesgo',
    tags: ['Dependencia', 'Soledad'],
    difficulty: 'Fácil',
    status: 'done',
    premium: false,
  },
  {
    id: 'case3',
    title: 'Supuesto 3: Absentismo Escolar',
    tags: ['Menores', 'Educación'],
    difficulty: 'Difícil',
    status: 'new',
    premium: true,
  },
  {
    id: 'case4',
    title: 'Supuesto 4: Violencia de Género',
    tags: ['Mujer', 'Urgencia'],
    difficulty: 'Media',
    status: 'new',
    premium: true,
  },
];

export default function CasesScreen() {
  const handleCasePress = (caseItem: typeof MOCK_CASES_LIST[0]) => {
    if (caseItem.premium) {
      // onOpenPremium();
      console.log('Abrir modal premium');
    } else {
      // onSelectCase(caseItem);
      console.log('Abrir caso:', caseItem.id);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 128, paddingTop: 48, paddingHorizontal: 20 }}>
        <Text className="text-2xl font-bold text-gray-900 mb-6">Supuestos</Text>

        <View className="gap-3">
          {MOCK_CASES_LIST.map((c) => (
            <TouchableOpacity
              key={c.id}
              activeOpacity={0.98}
              onPress={() => handleCasePress(c)}
              className={`w-full bg-white p-4 rounded-xl shadow-sm border relative overflow-hidden ${
                c.premium ? 'border-amber-200' : 'border-gray-100'
              }`}>
              {c.premium && (
                <View className="absolute inset-0 bg-amber-50/20" pointerEvents="none" />
              )}
              <View className="flex-row justify-between items-start mb-2 relative z-10">
                <View
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    c.difficulty === 'Fácil'
                      ? 'bg-green-50 border-green-100'
                      : c.difficulty === 'Media'
                        ? 'bg-yellow-50 border-yellow-100'
                        : 'bg-red-50 border-red-100'
                  }`}>
                  <Text
                    className={`text-[10px] font-bold ${
                      c.difficulty === 'Fácil'
                        ? 'text-green-600'
                        : c.difficulty === 'Media'
                          ? 'text-yellow-600'
                          : 'text-red-600'
                    }`}>
                    {c.difficulty}
                  </Text>
                </View>
                {c.premium ? (
                  <View className="bg-amber-100 p-1 rounded">
                    <Lock size={14} color="#D97706" />
                  </View>
                ) : c.status === 'done' ? (
                  <CheckCircle size={14} color="#059669" />
                ) : null}
              </View>
              <Text className="font-bold text-sm text-gray-800 mb-2 relative z-10">{c.title}</Text>
              <View className="flex-row gap-1 flex-wrap relative z-10">
                {c.tags.map((tag) => (
                  <View
                    key={tag}
                    className="bg-white/80 px-1.5 py-0.5 rounded border border-gray-100">
                    <Text className="text-[10px] text-gray-500">#{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
