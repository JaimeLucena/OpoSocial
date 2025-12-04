import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { BookOpen } from 'lucide-react-native';

export default function TopicDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}>
        <View className="bg-white rounded-xl p-6 items-center">
          <View className="w-16 h-16 rounded-lg bg-emerald-100 items-center justify-center mb-4">
            <BookOpen size={32} color="#059669" />
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-2">Tema {id}</Text>
          <Text className="text-gray-600 text-center">
            Esta pantalla se completará en el siguiente paso
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

