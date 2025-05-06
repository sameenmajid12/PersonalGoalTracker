import { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";
import colors from "../colors";
import CreateTodoInputs from "../components/CreateTodoInputs";
import { GoalContext } from "../GoalContext";
const CreateTodoScreen = () => {
  const [type, setType] = useState("goal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState({
    enabled: false,
    hours: null,
    minutes: null,
    AMPM: "",
  });
  const [date, setDate] = useState({ enabled: false, data: null });
  const [repeat, setRepeat] = useState({ enabled: false, data: null });
  const { addGoal } = useContext(GoalContext);
  const toggleOption = (setter) => {
    setter((prev) => ({ ...prev, enabled: !prev.enabled }));
  };
  const changeType = (t) => {
    if (t.toLowerCase() !== "goal" && t.toLowerCase() !== "reminder") {
      return;
    }
    setType(t);
  };
  const save = () => {
    if (!title.trim()) return;
    const id = Math.random().toString(36).substring(2, 9);
    const goal = {
      id: id,
      title: title,
      description: description,
      time: time.data,
      date: date.data ? date.data : new Date(),
      repeat: repeat.data,
      type: type,
      completed:false
    };
    addGoal(goal);
    setTitle("");
    setDescription("");
    setTime({ enabled: false, data: null });
    setDate({ enabled: false, data: null });
    setRepeat({ enabled: false, data: null });
    setType("goal");
  };
  return (
    <SafeAreaView style={styles.createScreen}>
      <ScrollView  style={styles.scrollContainer}>
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
                    ? { color: "white", fontWeight: "500" }
                    : { color: colors.accent, fontWeight: "400" }
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
                    ? { color: "white", fontWeight: "500" }
                    : { color: colors.accent, fontWeight: "400" }
                }
              >
                Reminder
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.break} />
        <CreateTodoInputs
          time={time}
          setTime={setTime}
          date={date}
          setDate={setDate}
          repeat={repeat}
          setRepeat={setRepeat}
          toggleOption={toggleOption}
          title={title}
          setTitle={setTitle}
          setDescription={setDescription}
          description={description}
        />
        <View style={styles.saveButtonContainer}>
          <Pressable onPress={save} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  createScreen: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContainer:{
    flex:1,
    padding:20,
  },
  createHeaderContainer: {
    rowGap: 20,
  },
  createHeader: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "600",
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
    marginVertical:20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.25)",
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
    marginTop:20
  },
  saveButtonText: {
    color: "white",
    fontWeight: "500",
  },
});
export default CreateTodoScreen;
