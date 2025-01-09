import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: "#000",
        headerStyle: {
            backgroundColor: '#fff',
        },
        headerShadowVisible: false,
        headerTintColor: '#000',
        tabBarStyle: {
          backgroundColor: '#fff',
        },
    }}
    >
      <Tabs.Screen name="index" 
         options={{ 
             headerTitle: 'Home',
             tabBarIcon: ({ color, focused }) => (
                 <Ionicons 
                 name={focused ? "home-sharp" : "home-outline"}
                 color={color}
                 size={24} 
                 />
                ),
            }}
        />
      <Tabs.Screen name="about" 
      options={{ 
        title: 'About',
        tabBarIcon: ({ color, focused }) => (
            <Ionicons 
            name={focused ? "information-circle" : "information-circle-outline"}
            color={color}
            size={24} 
            />
           ),
      }} 
      />
    </Tabs>
  );
}