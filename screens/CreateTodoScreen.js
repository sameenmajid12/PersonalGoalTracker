import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Switch,
} from "react-native";
import { saveGoal } from "../storage/storage";
import colors from "../colors";
const CreateTodoScreen = () => {
  const [type, setType] = useState("goal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState({ enabled: false, data: null });
  const [date, setDate] = useState({ enabled: false, data: null });
  const [repeat, setRepeat] = useState({ enabled: false, data: null });
  const toggleOption = (setter) => {
    setter((prev) => ({ ...prev, enabled: !prev.enabled }));
  };
  const changeType = (t) => {
    if (t.toLowerCase() !== "goal" && t.toLowerCase() !== "reminder") {
      return;
    }
    setType(t);
  };
  const save=()=>{
    const goal = {
      title:title,
      description:description,
      time:time.data,
      date:date.data,
      repeat:repeat.data
    };
    
    saveGoal(goal);
    setTitle("");
    setDescription("");
    setTime({enabled:false,data:null});
    setDate({enabled:false,data:null});
    setRepeat({enabled:false, data:null});
  }
  return (
    <SafeAreaView style={styles.createScreen}>
      <View style={styles.createHeaderContainer}>
        <Text style={styles.createHeader}>Create new</Text>
        <View style={styles.createButtonsContainer}>
          <Pressable
            onPress={() => changeType("goal")}
            style={[
              styles.createButton,
              type === "goal"
                ? { backgroundColor: colors.accent }
                : {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: colors.accent,
                  },
            ]}
          >
            <Text
              style={
                type === "goal"
                  ? { color: "white", fontWeight: 500 }
                  : { color: colors.accent, fontWeight: 400 }
              }
            >
              Goal
            </Text>
          </Pressable>
          <Pressable
            onPress={() => changeType("reminder")}
            style={[
              styles.createButton,
              type === "reminder"
                ? { backgroundColor: colors.accent }
                : {
                    backgroundColor: "transparent",
                    borderWidth: 1,
                    borderColor: colors.accent,
                  },
            ]}
          >
            <Text
              style={
                type === "reminder"
                  ? { color: "white", fontWeight: 500 }
                  : { color: colors.accent, fontWeight: 400 }
              }
            >
              Reminder
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.break} />
      <View style={styles.createInputsContainer}>
        <View style={styles.createInputContainer}>
          <Text style={styles.createInputHeader}>Title</Text>
          <TextInput placeholder="Enter Title" style={styles.createInput} />
        </View>
        <View style={styles.createInputContainer}>
          <Text style={styles.createInputHeader}>Description</Text>
          <TextInput
            placeholder="Enter Description (Optional)"
            style={styles.createInput}
          />
        </View>
        <View>
          <Text style={styles.createInputHeader}>Details (Optional)</Text>
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
        </View>
      </View>
      <View style={styles.saveButtonContainer}>
        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  createScreen: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 20,
    rowGap: 20,
  },
  createHeaderContainer: {
    rowGap: 20,
  },
  createHeader: {
    color: colors.text,
    fontSize: 30,
    fontWeight: 600,
  },
  createButtonsContainer: {
    flexDirection: "row",
    columnGap: 10,
  },
  createButton: {
    width: 120,
    height: 35,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  break: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.25)",
  },
  createInputsContainer: {
    rowGap: 15,
  },
  createInputContainer: {
    rowGap: 0,
  },
  createInputHeader: {
    color: "rgba(0,0,0,0.35)",
  },
  createInput: {
    width: "auto",
    height: 45,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: colors.text,
  },
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
  saveButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  saveButton: {
    width: 110,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontWeight: 500,
  },
});
export default CreateTodoScreen;
