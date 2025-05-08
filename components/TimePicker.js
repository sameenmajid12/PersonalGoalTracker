import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import colors from "../colors";
const TimePicker = ({ dateTime, setDateTime }) => {
  useEffect(()=>{
    setDateTime((prev)=>({...prev, hour:1, minutes:0, AMPM:"AM"}));
  },[])
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.hour}
        onValueChange={(ItemValue) =>
          setDateTime((prev) => ({ ...prev, hour: ItemValue }))
        }
      >
        <Picker.Item label="1" value={1}></Picker.Item>
        <Picker.Item label="2" value={2}></Picker.Item>
        <Picker.Item label="3" value={3}></Picker.Item>
        <Picker.Item label="4" value={4}></Picker.Item>
        <Picker.Item label="5" value={5}></Picker.Item>
        <Picker.Item label="6" value={6}></Picker.Item>
        <Picker.Item label="7" value={7}></Picker.Item>
        <Picker.Item label="8" value={8}></Picker.Item>
        <Picker.Item label="9" value={9}></Picker.Item>
        <Picker.Item label="10" value={10}></Picker.Item>
        <Picker.Item label="11" value={11}></Picker.Item>
        <Picker.Item label="12" value={12}></Picker.Item>
      </Picker>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.minutes}
        onValueChange={(ItemValue) =>
          setDateTime((prev) => ({ ...prev, minutes: ItemValue }))
        }
      >
        <Picker.Item label="00" value={0}></Picker.Item>
        <Picker.Item label="05" value={5}></Picker.Item>
        <Picker.Item label="10" value={10}></Picker.Item>
        <Picker.Item label="15" value={15}></Picker.Item>
        <Picker.Item label="20" value={20}></Picker.Item>
        <Picker.Item label="25" value={25}></Picker.Item>
        <Picker.Item label="30" value={30}></Picker.Item>
        <Picker.Item label="35" value={35}></Picker.Item>
        <Picker.Item label="40" value={40}></Picker.Item>
        <Picker.Item label="45" value={45}></Picker.Item>
        <Picker.Item label="50" value={50}></Picker.Item>
        <Picker.Item label="55" value={55}></Picker.Item>
      </Picker>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.AMPM}
        onValueChange={(ItemValue) =>
          setDateTime((prev) => ({ ...prev, AMPM: ItemValue }))
        }
      >
        <Picker.Item label="AM" value={"AM"}></Picker.Item>
        <Picker.Item label="PM" value={"PM"}></Picker.Item>
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "rgba(0,0,0,0.1)",
    borderTopWidth: 1,
    marginTop: 10,
  },
});
export default TimePicker;
