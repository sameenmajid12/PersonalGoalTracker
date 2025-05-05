import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveGoal=async(goal)=>{
  try{
    const goals = await loadGoals();
    goals.push(goal);
    await AsyncStorage.setItem('goals',JSON.stringify(goals));
  }
  catch(e){
    console.error('Error saving goal');
    return [];
  }
  

}

export const updateGoal = async(updatedGoal)=>{
  try{
    const goals = await loadGoals();
    let index = goals.findIndex(goal=>goal.id===updatedGoal.id);
    if(index===-1){
      throw new Error('Goal not found'); 
    }
    goals[index] = updatedGoal;
    await AsyncStorage.setItem('goals', JSON.stringify(goals));
  }
  catch(e){
    console.error('Error updating goal: ', e.message);
  }
}

export const loadGoals= async()=>{
  try{
    const goals = await AsyncStorage.getItem('goals');
    return goals!==null?JSON.parse(goals):[];
  }
  catch(e){
    console.error('Error loading goals');
    return [];
  }
}

