import { View, Text, Switch, TextInput, StyleSheet } from "react-native";
import colors from "../colors";
import CreateTodoDetails from "./CreateTodoDetails";
const CreateTodoInputs = ({
  title,
  setTitle,
  setDescription,
  description,
  repeat,
  setRepeat,
  toggleRepeat,
  toggleDateTime,
  dateTime, 
  setDateTime, 
  type
}) => {
  return (
    <View style={styles.createInputsContainer}>
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter Title"
          style={styles.createInput}
          numberOfLines={1}
        />
      </View>
      <View style={styles.createInputContainer}>
        <Text style={styles.createInputHeader}>Description</Text>
        <TextInput
          numberOfLines={3}
          value={description}
          onChangeText={setDescription}
          placeholder="Enter Description (Optional)"
          style={styles.createInput}
        />
      </View>
      <View>
        <Text style={styles.createInputHeader}>Details (Optional)</Text>
        <CreateTodoDetails
        toggleRepeat={toggleRepeat}
          dateTime={dateTime}
          setDateTime={setDateTime}
          repeat={repeat}
          setRepeat={setRepeat}
          toggleDateTime={toggleDateTime}
          type={type}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
export default CreateTodoInputs;
