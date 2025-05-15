import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const TimePicker = ({ dateTime, setDateTime }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.hour}
        onValueChange={(itemValue) => {
          setDateTime({ ...dateTime, hour: itemValue });
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
          <Picker.Item key={hour} label={hour.toString()} value={hour} />
        ))}
      </Picker>
      
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.minutes}
        onValueChange={(itemValue) => {
          setDateTime({ ...dateTime, minutes: itemValue });
        }}
      >
        {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((minute) => (
          <Picker.Item 
            key={minute} 
            label={minute.toString().padStart(2, '0')} 
            value={minute} 
          />
        ))}
      </Picker>
      
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 20 }}
        selectedValue={dateTime.AMPM}
        onValueChange={(itemValue) => {
          setDateTime({ ...dateTime, AMPM: itemValue });
        }}
      >
        <Picker.Item label="AM" value="AM" />
        <Picker.Item label="PM" value="PM" />
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