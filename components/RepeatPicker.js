import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import colors from "../colors";
import { FontAwesome } from "@expo/vector-icons";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const RepeatPicker = ({ repeat, setRepeat }) => {
  const toggleDay = (day) => {
    setRepeat((prev) => {
      const selected = prev.data ?? [];
      if (selected.includes(day)) {
        return { ...prev, data: selected.filter((d) => d !== day) };
      } else {
        return { ...prev, data: [...selected, day] };
      }
    });
  };

  return (
    <View
      style={{
        marginTop: 10,
        borderTopColor: "rgba(0,0,0,0.1)",
        borderTopWidth: 1,
      }}
    >
      {days.map((day) => (
        <Pressable
          key={day}
          onPress={() => toggleDay(day)}
          style={styles.repeatContainer}
        >
          <Text
            style={{
              color: repeat.data?.includes(day)
                ? colors.text
                : "rgba(0,0,0,0.35)",
            }}
          >
            {day}
          </Text>
          {repeat.data?.includes(day) ? (
            <FontAwesome  size={20} color={colors.secondary} marginRight={1} name="check-circle"></FontAwesome>
          ) : (
            <View style={styles.repeats} />
          )}
        </Pressable>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  repeatContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    justifyContent: "space-between",
  },
  repeats: {
    width: 20,
    height: 20,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
  },
});
export default RepeatPicker;
