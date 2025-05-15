import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import CreateTodoScreen from "./screens/CreateTodoScreen";
import { useState } from "react";
import { GoalProvider } from "./GoalContext";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <GoalProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Create" component={CreateTodoScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalProvider>
  );
}
