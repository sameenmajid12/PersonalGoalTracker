import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";
import React from "react";

const DatePicker = ({ dateTime, setDateTime }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  const getDaysInMonth = (month, year) => {
    if (month === 1) {
      return ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28;
    }
    if ([3, 5, 8, 10].includes(month)) {
      return 30;
    }
    return 31;
  };

  const days = Array.from(
    { length: getDaysInMonth(dateTime.month, dateTime.year) },
    (_, i) => i + 1
  );

  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 18 }}
        selectedValue={dateTime.month}
        onValueChange={(itemValue) => {
          const daysInMonth = getDaysInMonth(itemValue, dateTime.year);
          const newDay = Math.min(dateTime.day, daysInMonth);
          setDateTime({ ...dateTime, month: itemValue, day: newDay });
        }}
      >
        {[
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].map((month, index) => (
          <Picker.Item key={month} label={month} value={index} />
        ))}
      </Picker>

      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 18 }}
        selectedValue={dateTime.day}
        onValueChange={(itemValue) => {
          setDateTime({ ...dateTime, day: itemValue });
        }}
      >
        {days.map((day) => (
          <Picker.Item key={day} label={day.toString()} value={day} />
        ))}
      </Picker>

      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 18 }}
        selectedValue={dateTime.year}
        onValueChange={(itemValue) => {
          const daysInMonth = getDaysInMonth(dateTime.month, itemValue);
          const newDay = Math.min(dateTime.day, daysInMonth);
          setDateTime({ ...dateTime, year: itemValue, day: newDay });
        }}
      >
        {years.map((year) => (
          <Picker.Item key={year} label={year.toString()} value={year} />
        ))}
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

export default DatePicker;