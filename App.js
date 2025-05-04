import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import TodoDetailScreen from './screens/TodoDetailScreen';
import CreateTodoScreen from './screens/CreateTodoScreen';
import { useState } from 'react';
import { MMKV } from 'react-native-mmkv';
const Stack = createNativeStackNavigator();
export default function App() {
  const [todos, setTodos] = useState();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Create" component={CreateTodoScreen}/>
        <Stack.Screen name="Details" component={TodoDetailScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

