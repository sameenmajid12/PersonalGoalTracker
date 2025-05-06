import { View, Text, Switch, StyleSheet } from "react-native";
import colors from "../colors";
const CreateTodoDetails = ({
  time,
  setTime,
  date,
  setDate,
  repeat,
  setRepeat,
  toggleOption
}) => {
  return (
    <View style={styles.createOptionsContainer}>
      <View
        style={[
          styles.createOption,
          { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.15)" },
        ]}
      >
        <Text style={styles.createOptionText}>Date</Text>
        <Switch
          value={date.enabled}
          onValueChange={() => toggleOption(setDate)}
          trackColor={{ true: colors.secondary }}
          style={{
            transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
          }}
        />
      </View>
      <View
        style={[
          styles.createOption,
          { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.15)" },
        ]}
      >
        <Text style={styles.createOptionText}>Time</Text>
        <Switch
          value={time.enabled}
          onValueChange={() => toggleOption(setTime)}
          trackColor={{ true: colors.secondary }}
          style={{
            transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
          }}
        />
      </View>
      <View style={styles.createOption}>
        <Text style={styles.createOptionText}>Repeat</Text>
        <Switch
          value={repeat.enabled}
          onValueChange={() => toggleOption(setRepeat)}
          trackColor={{ true: colors.secondary }}
          style={{
            transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  createOptionsContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 10,
  },
  createOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  },
  createOptionText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
});
export default CreateTodoDetails;
