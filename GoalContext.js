import { useState, useEffect, createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format } from "date-fns";
/*GoalModel={
  id:"8s9az1",
  title:"Meditate",
  datetime: {year: 2025,month:11, day:24, hours: 12, minutes: 55, AMPM:"AM"},
  repeat:[sunday, tuesday, saturday],
  description:"Meditate for 5 mins",
  type:"goal",
  completed:false,
}*/

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [todaysGoals, setTodaysGoals] = useState([]);
  useEffect(() => {
    loadGoals();
  }, []);
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
    const updatedGoals = goals.map((goal) =>
      goal.id === updatedGoal.id ? updatedGoal : goal
    );
    const today = format(new Date(), "yyyy-MM-dd");
    const updatedTodaysGoals = updatedGoals.filter((goal)=>format(new Date(goal.date),"yyyy-MM-dd")===today);
    setGoals(updatedGoals);
    setTodaysGoals(updatedTodaysGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };
  
  const loadGoals = async () => {
    const items = await AsyncStorage.getItem("goals");
    if (items) {
      const storedGoals = JSON.parse(items);
      setGoals(storedGoals);
      const today = format(new Date(), "yyyy-MM-dd");
      const storedTodaysGoals = storedGoals.filter(
        (goal) => format(new Date(goal.date), "yyyy-MM-dd") === today
      );
      setTodaysGoals(storedTodaysGoals);
    }
  };

  const deleteGoal = async (deletedGoal) => {
    const index = goals.findIndex((goal) => goal.id === deletedGoal.id);
    if (index === -1) {
      throw new Error("Goal not found");
    }
    const updatedGoals = goals.filter((goal) => goal.id !== deletedGoal.id);
    setGoals(updatedGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("All data cleared from AsyncStorage.");
    } catch (e) {
      console.error("Error clearing AsyncStorage:", e);
    }
  }; //For testing
  return (
    <GoalContext.Provider value={{ goals, addGoal, deleteGoal, updateGoal, todaysGoals }}>
      {children}
    </GoalContext.Provider>
  );
};
