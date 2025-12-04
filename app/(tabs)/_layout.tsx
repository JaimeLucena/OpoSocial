import { Tabs } from 'expo-router';
import React from 'react';
import { Home, BookOpen, Briefcase, GraduationCap } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#059669',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => <Home size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="topics"
        options={{
          title: 'Temario',
          tabBarIcon: ({ color, size }) => <BookOpen size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="cases"
        options={{
          title: 'Casos',
          tabBarIcon: ({ color, size }) => <Briefcase size={size || 24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="exams"
        options={{
          title: 'Exámenes',
          tabBarIcon: ({ color, size }) => <GraduationCap size={size || 24} color={color} />,
        }}
      />
    </Tabs>
  );
}
