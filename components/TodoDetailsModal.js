import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Pressable,
  Switch,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { GoalContext } from "../GoalContext";
import { format } from "date-fns";
import colors from "../colors";
import RepeatPicker from "./RepeatPicker";
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";

const TodoDetailsModal = ({ toggleView, goal }) => {
  const [newGoal, setNewGoal] = useState(goal);
  const { updateGoal } = useContext(GoalContext);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const update = () => {
    toggleView();
  };

  if (!goal) return null;

  return (
    <View style={styles.detailsContainer}>
      <ScrollView>
        <View style={styles.detailsContainerHeader}>
          <Pressable onPress={() => toggleView()}>
            <Text style={styles.detailsActionText}>Cancel</Text>
          </Pressable>
          <Text style={styles.detailsHeaderText}>Details</Text>
          <Pressable onPress={() => update()}>
            <Text style={styles.detailsActionText}>Save</Text>
          </Pressable>
        </View>

        <View style={styles.detailsInputContainer}>
          <View style={styles.detailsTitleDescription}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0,0,0,0.2)",
              }}
            >
              <TextInput
                value={newGoal.title}
                onChangeText={(text) =>
                  setNewGoal((prev) => ({ ...prev, title: text }))
                }
                style={styles.detailsTitleDescriptionText}
              />
            </View>
            <View style={{ padding: 10 }}>
              <TextInput
                style={styles.detailsTitleDescriptionText}
                value={newGoal.description}
                onChangeText={(text) =>
                  setNewGoal((prev) => ({ ...prev, description: text }))
                }
              />
            </View>
          </View>

          <View style={styles.detailsMainContainer}>
            <View style={styles.detailsSwitchContainer}>
              <View>
                <Text>Date</Text>
                <Text style={styles.detailsSwitchInfo}>
                  {newGoal.date
                    ? format(
                        new Date(
                          newGoal.date.year,
                          newGoal.date.month,
                          newGoal.date.day
                        ),
                        "MMMM dd, yyyy"
                      )
                    : "No date set"}
                </Text>
              </View>
              <Switch
                value={newGoal.date !== null}
                trackColor={{ true: colors.secondary }}
                style={{ transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }] }}
                onValueChange={(value) => {
                  const today = new Date();
                  setNewGoal((prev) => ({
                    ...prev,
                    date: value
                      ? newGoal.date
                      : {
                          day: today.getDate(),
                          month: today.getMonth(),
                          year: today.getFullYear(),
                        },
                  }));
                }}
              />
            </View>
            {newGoal.date && (
              <DatePicker
                dateTime={newGoal.date}
                setDateTime={(date) =>
                  setNewGoal((prev) => ({ ...prev, date }))
                }
              />
            )}
          </View>

          <View style={styles.detailsMainContainer}>
            <View style={styles.detailsSwitchContainer}>
              <View>
                <Text>Time</Text>
                {newGoal.time?.hour ||
                (newGoal.time?.minutes) ? (
                  <Text style={styles.detailsSwitchInfo}>
                      {format(
                          new Date(
                            newGoal.date.year,
                            newGoal.date.month,
                            newGoal.date.day,
                            newGoal.time.hour,
                            newGoal.time.minutes
                          ),
                          "hh:mm"
                        ) + ` ${newGoal.time.AMPM}`}
                  </Text>
                ) : (<Text style={styles.detailsSwitchInfo} >No time set</Text>)}
              </View>
              <Switch
                value={
                  newGoal.time?.hour !== null || newGoal.time?.minutes !== null
                }
                trackColor={{ true: colors.secondary }}
                style={{ transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }] }}
                onValueChange={() => {
                  setNewGoal((prev) => ({
                    ...prev,
                    time: prev.time?.hour || prev.time?.minutes
                      ? {hour:null, minutes:null, AMPM:""}
                      : { hour: 1, minutes: 0, AMPM: "AM" },
                  }));
                }}
              />
            </View>
            {(newGoal.time?.hour || newGoal.time?.minutes) && (
              <TimePicker
                dateTime={newGoal.time}
                setDateTime={(time) =>
                  setNewGoal((prev) => ({ ...prev, time }))
                }
              />
            )}
          </View>

          <View style={styles.detailsMainContainer}>
            <View style={styles.detailsSwitchContainer}>
              <View style={{ flex: 1 }}>
                <Text>Repeat</Text>
                {Array.isArray(newGoal.repeat) && newGoal.repeat.length > 0 ? (
                  <Text style={styles.detailsSwitchInfo}>
                    {newGoal.repeat
                      .map((repeatIndex) => days[repeatIndex])
                      .join(", ")}
                  </Text>
                ) : null}
              </View>
              <Switch
                value={
                  Array.isArray(newGoal.repeat) && newGoal.repeat.length > 0
                }
                onValueChange={() =>
                  setNewGoal((prev) => ({
                    ...prev,
                    repeat:
                      Array.isArray(prev.repeat) && prev.repeat.length > 0
                        ? null
                        : goal.repeat,
                  }))
                }
                trackColor={{ true: colors.secondary }}
                style={{ transform: [{ scaleY: 0.9 }, { scaleX: 0.95 }] }}
              />
            </View>
            {Array.isArray(newGoal.repeat) && (
              <RepeatPicker
                repeat={newGoal.repeat}
                setRepeat={(repeat) =>
                  setNewGoal((prev) => ({ ...prev, repeat }))
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    height: "105%",
    backgroundColor: colors.background,
    top: 60,
    zIndex: 350,
  },
  detailsContainerHeader: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 20,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.2)",
  },
  detailsHeaderText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 500,
  },
  detailsActionText: {
    color: colors.accent,
    fontWeight: 500,
  },
  detailsInputContainer: {
    padding: 15,
    rowGap: 15,
  },
  detailsTitleDescription: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
  },
  detailsTitleDescriptionText: {
    color: colors.text,
    fontWeight: 400,
    fontSize: 14,
  },
  detailsMainContainer: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
    padding: 10,
    borderRadius: 10,
  },
  detailsSwitchContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  detailsSwitchInfo: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: 500,
  },
});

export default TodoDetailsModal;
