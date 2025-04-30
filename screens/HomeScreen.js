import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native";
import colors from "../colors";
import { FontAwesome6 } from "@expo/vector-icons";
import GoalsCompleted from "../components/GoalsCompleted";
import GoalList from "../components/GoalList";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import DropDownPicker from "react-native-dropdown-picker";
const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.homeScreen}>
      <View style={styles.homeHeader}>
        <Text style={styles.homeHeaderText}>Hello, Sameen</Text>
        <Pressable
        onPress={()=>navigation.navigate("Create")}
          style={({ pressed }) => [
            styles.homeHeaderButton,
            {
              backgroundColor: !pressed ? colors.accent : 'transparent',
              borderColor: !pressed ? "transparent" : colors.accent,
            },
          ]}
        >
          {({ pressed }) => (
            <>
              <Text style={[styles.homeHeaderButtonText,{color:pressed?colors.accent:'white'}]}>Create</Text>
              <FontAwesome6 name="plus" color={pressed?colors.accent:'white'}></FontAwesome6>
            </>
          )}
        </Pressable>
      </View>
      <GoalsCompleted/>
      <GoalList/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: colors.background,
    rowGap:30,
    padding:20
  },
  homeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  homeHeaderText: {
    color: colors.text,
    fontSize: 30,
    fontWeight: 500,
  },
  homeHeaderButton: {
    width: 110,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flexDirection: "row",
    columnGap: 5,
    borderWidth: 2,
  },
  homeHeaderButtonText: {
    fontWeight:500
  },
  
 

});
export default HomeScreen;
