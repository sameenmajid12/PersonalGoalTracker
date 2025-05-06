import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  useEffect(()=>{
    loadGoals();
  },[])
  const addGoal = async (goal) => {
     const updatedGoals = [...goals, goal];
      setGoals(updatedGoals);
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const updateGoal = async (updatedGoal) => {
    const index = goals.findIndex((goal) => goal.id === updatedGoal.id);
    if (index === -1) {
      throw new Error("Goal not found");
    }
    const updatedGoals = goals.map((goal)=>goal.id===updatedGoal.id?updatedGoal:goal);
    setGoals(updatedGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const loadGoals = async () => {
    const storedGoals = await AsyncStorage.getItem("goals");
    if (storedGoals) setGoals(JSON.parse(storedGoals));
  };

  const deleteGoal = async (deletedGoal) => {
    const index = goals.findIndex((goal) => goal.id === deletedGoal.id);
    if (index === -1) {
      throw new Error("Goal not found");
    }
    const updatedGoals = goals.filter((goal)=>goal.id!==deletedGoal.id);
    setGoals(updatedGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  return(
    <GoalContext.Provider value={{goals, addGoal, deleteGoal, updateGoal}}>
      {children}
    </GoalContext.Provider>
  )
};
