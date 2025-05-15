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
  completed:[{day:5, month:5, year:2025}],
}*/

export const GoalContext = createContext();

export const GoalProvider = ({ children }) => {
  const today = new Date();
  const [goals, setGoals] = useState([]);
  const [todaysGoals, setTodaysGoals] = useState([]);
  const [selectedDay, setSelectedDay] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
    weekDay: today.getDay(),
  });
  useEffect(() => {
    loadGoals();
  }, [selectedDay]);
  const addGoal = async (goal) => {
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    const todaysGoals = updatedGoals.filter(
      (goal) =>
        (goal.date.day === selectedDay.day &&
          goal.date.month === selectedDay.month &&
          goal.date.year === selectedDay.year) ||
        goal.repeat?.includes(selectedDay.weekDay)
    );
    setTodaysGoals(todaysGoals);
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
    const updatedTodaysGoals = updatedGoals.filter(
      (goal) =>
        (goal.date.day === selectedDay.day &&
          goal.date.month === selectedDay.month &&
          goal.date.year === selectedDay.year) ||
        goal.repeat?.includes(selectedDay.weekDay)
    );
    setGoals(updatedGoals);
    setTodaysGoals(updatedTodaysGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  const loadGoals = async () => {
    const items = await AsyncStorage.getItem("goals");
    if (items) {
      const storedGoals = JSON.parse(items);
      setGoals(storedGoals);
      const storedTodaysGoals = storedGoals.filter(
        (goal) =>
          (goal.date.day === selectedDay.day &&
            goal.date.month === selectedDay.month &&
            goal.date.year === selectedDay.year) ||
          goal.repeat?.includes(selectedDay.weekDay)
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
    const updatedTodaysGoals = updatedGoals.filter(
      (goal) =>
        goal.date.day === selectedDay.day &&
        goal.date.month === selectedDay.month &&
        goal.date.year === selectedDay.year
    );
    setTodaysGoals(updatedTodaysGoals);
    await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));
  };
  const changeDate = (daysToAdd) => {
    const currentDate = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day
    );

    currentDate.setDate(currentDate.getDate() + daysToAdd);
    setSelectedDay({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day: currentDate.getDate(),
      weekDay: currentDate.getDay(),
    });
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
    <GoalContext.Provider
      value={{
        goals,
        addGoal,
        deleteGoal,
        updateGoal,
        todaysGoals,
        selectedDay,
        setSelectedDay,
        changeDate,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
