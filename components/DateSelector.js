import { useContext, useState } from "react";
import { GoalContext } from "../GoalContext";
import { View,Text, StyleSheet, Pressable } from "react-native";
import { format, addDays } from "date-fns";
import colors from "../colors";
const DateSelector=({toggleView, prevIndex, setPrevIndex})=>{
  const { changeDate } =  useContext(GoalContext);
  const days = Array.from({length:7}, (_,i)=>{
    const futureDate = addDays(new Date(), i);
    return i === 0 ?"Today":format(futureDate, "EE dd, yyyy")
  });
  const handleChange=(value)=>{
    if(value===prevIndex){
      return;
    }
    const newIndex = value-prevIndex
    setPrevIndex(value);
    changeDate(newIndex);
    toggleView();
  }
  return(
    <View style={styles.dateSelector}>
      {days.map((day,index)=>{
        return(
          <Pressable key={index} onPress={()=>handleChange(index)} style={[styles.dateContainer, {borderBottomWidth:index===6?0:1}]}>
            <Text style={styles.dateText}>{day}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}
const styles= StyleSheet.create({
  dateSelector:{
    position:"absolute",
    top:20,
    right:0,
    zIndex:200,
    backgroundColor:colors.secondary,
    borderWidth:1,
    borderColor:"rgba(0,0,0,0.1)",
    borderRadius:10
  },
  dateContainer:{
    paddingHorizontal:20,
    borderBottomColor:"rgba(0,0,0,0.1)",
    justifyContent:'center',
    paddingVertical:10
  },
  dateText:{
    color:"white",
    fontWeight:500
  }
})
export default DateSelector;