import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useContext, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import colors from "../colors";
import { GoalContext } from "../GoalContext";
import DateSelector from "./DateSelector";
import { format } from "date-fns";
const GoalList = ({ toggleGoalDetail }) => {
  const {
    todaysGoals: goals,
    updateGoal,
    selectedDay,
    setSelectedDay,
  } = useContext(GoalContext);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [prevDateIndex, setPrevDateIndex] = useState(0);
  const toggleDateSelector = () => {
    setShowDateSelector((prev) => !prev);
  };
  const toggleCompletion = async (goal) => {
    const updatedGoal = { ...goal, completed: !goal.completed };
    await updateGoal(updatedGoal);
  };
  const today = new Date();
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerContainerLeft}>Your Goals & Reminders</Text>
        <Pressable
          onPress={toggleDateSelector}
          style={styles.headerContainerRight}
        >
          <Text style={styles.headerContainerRightText}>
            {today.getDate() === selectedDay.day
              ? "Today"
              : format(
                  new Date(
                    selectedDay.year,
                    selectedDay.month,
                    selectedDay.day
                  ),
                  "MMMM dd, yyyy"
                )}
          </Text>
          <FontAwesome6 name="chevron-down" color={colors.accent} size={15} />
          {showDateSelector && (
            <DateSelector
              prevIndex={prevDateIndex}
              setPrevIndex={setPrevDateIndex}
              toggleView={toggleDateSelector}
            />
          )}
        </Pressable>
      </View>
      <FlatList
        style={styles.listContainer}
        data={goals}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View
            style={[
              styles.listItem,
              {
                borderColor: !item.completed
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(0,0,0,0.05)",
              },
            ]}
          >
            <Pressable
              onPress={() => toggleCompletion(item)}
              style={styles.listItemLeft}
            >
              {!item.completed ? (
                <View style={styles.selector} />
              ) : (
                <View>
                  <FontAwesome6
                    name="circle-check"
                    color={colors.secondaryText}
                    size={20}
                  />
                </View>
              )}
            </Pressable>
            <View style={styles.listItemRight}>
              <View style={styles.text}>
                <Text
                  style={[
                    styles.title,
                    {
                      color: !item.completed
                        ? colors.text
                        : colors.secondaryText,
                    },
                  ]}
                >
                  {item.title}
                </Text>
                {item.description && (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.description,
                      {
                        color: !item.completed
                          ? colors.secondaryText
                          : "#ADD8B9",
                      },
                    ]}
                  >
                    {item.description}
                    {item.time !== null
                      ? " - " +
                        format(
                          new Date(
                            item.date.year,
                            item.date.month,
                            item.date.day,
                            item.time.hour,
                            item.time.minutes
                          ),
                          "hh:mm"
                        ) +
                        item.time.AMPM
                      : ""}
                  </Text>
                )}
              </View>
              <Pressable onPress={()=>toggleGoalDetail(item)}>
                <FontAwesome6
                  size={17.5}
                  color={"rgba(0,0,0,0.5)"}
                  name="ellipsis"
                ></FontAwesome6>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.35)",
    paddingBottom: 5,
    marginBottom: 30,
  },
  headerContainerLeft: {
    color: colors.accent,
    fontSize: 14,
    fontWeight: 500,
  },
  headerContainerRight: {
    fontWeight: 500,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
    zIndex: 200,
  },
  headerContainerRightText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: 500,
  },
  listItem: {
    flexDirection: "row",
    width: "100%",
    height: "auto",
    backgroundColor: colors.background,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    columnGap: 15,
    zIndex: 100,
  },
  listItemLeft: {
    height: "100%",
    justifyContent: "flex-start",
  },
  selector: {
    width: 20,
    height: 20,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 1.5,
    borderRadius: 30,
  },
  listItemRight: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    rowGap: 3,
  },
  title: {
    fontWeight: 600,
    fontSize: 14,
  },
  description: {
    fontWeight: 400,
  },
});
export default GoalList;
