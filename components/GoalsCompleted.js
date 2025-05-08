import { View, Text, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import colors from "../colors";
import { useContext, useEffect, useState } from "react";
import { GoalContext } from "../GoalContext";
const GoalsCompleted=()=>{
  const {todaysGoals} = useContext(GoalContext);
  const [numCompleted, setNumCompleted] = useState(todaysGoals.filter((goal)=>goal.completed===true).length);
  useEffect(()=>{
    setNumCompleted(todaysGoals.filter((goal)=>goal.completed===true).length);
  },[todaysGoals])
  return(
    <View style={styles.goalsContainer}>
          <View style={styles.goalsText}>
            <Text style={styles.goalsTextHeader}>Today's goals</Text>
            <Text style={styles.goalsTextSubheader}>{`${numCompleted} out of ${todaysGoals.length} goals completed`}</Text>
          </View>
          <AnimatedCircularProgress rotation={0} size={75} width={10} fill={(numCompleted/todaysGoals.length)*100} tintColor="white" backgroundColor={colors.accent}/>
      </View>
  )
}
const styles = StyleSheet.create({
  goalsContainer:{
    
    height:'auto', 
    backgroundColor:colors.secondary,
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:"center",
    padding:20,
    paddingTop:25,
    paddingBottom:25,
    borderRadius:15,
 
  },
  goalsText:{
    rowGap:5
  },
  goalsTextHeader:{
    color:"white",
    fontWeight:600,
    fontSize:20
  },
  goalsTextSubheader:{
    color:"white",
    fontWeight:500,
    fontSize:14
  },
})
export default GoalsCompleted;
