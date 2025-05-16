import { View, Text, Switch, StyleSheet } from "react-native";
import colors from "../colors";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import RepeatPicker from "./RepeatPicker";
const CreateTodoDetails = ({
  dateTime,
  setDateTime,
  repeat,
  setRepeat,
  toggleDateTime,
  toggleRepeat,type
}) => {
  return (
    <View style={styles.createOptionsContainer}>
      <View
        style={[
          styles.createOption,
          { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.15)" },
        ]}
      >
                <View style={styles.createOptionTitle}>
        <Text style={styles.createOptionText}>Date</Text>
        <Switch
          value={dateTime.dateEnabled || type === "reminder"}
          onValueChange={() => toggleDateTime("date")}
          trackColor={{ true: colors.secondary }}
          style={{
            transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
          }}
        />
        </View>
        {dateTime.dateEnabled && <DatePicker dateTime={dateTime} setDateTime={setDateTime} />}
      </View>
      <View
        style={[
          styles.createOption,
          { borderBottomWidth: 1, borderBottomColor: "rgba(0,0,0,0.15)" },
        ]}
      >
        <View style={styles.createOptionTitle}>
          <Text style={styles.createOptionText}>Time</Text>
          <Switch
            value={dateTime.timeEnabled ||  type === "reminder"}
            onValueChange={() => toggleDateTime("time")}
            trackColor={{ true: colors.secondary }}
            style={{
              transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
            }}
          />
        </View>

        {dateTime.timeEnabled && <TimePicker dateTime={dateTime} setDateTime={setDateTime} />}
      </View>
      <View style={styles.createOption}>
        <View style={styles.createOptionTitle}>
          <Text style={styles.createOptionText}>Repeat</Text>
          <Switch
            value={repeat.enabled}
            onValueChange={() => toggleRepeat()}
            trackColor={{ true: colors.secondary }}
            style={{
              transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }],
            }}
          />
        </View>
        {repeat.enabled && (
          <RepeatPicker repeat={repeat.data} setRepeat={(repeat)=>setRepeat((prev)=>({...prev, data:repeat}))} />
        )}
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
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  createOptionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createOptionText: {
    color: colors.secondaryText,
    fontSize: 14,
  },
});
export default CreateTodoDetails;
