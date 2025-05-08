import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";
const DatePicker = ({ dateTime, setDateTime }) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 18 }}
        selectedValue={dateTime.month}
        onValueChange={(ItemValue) =>
          setDateTime((prev) => ({ ...prev, month: ItemValue }))
        }
      >
        <Picker.Item label="January" value={0}></Picker.Item>
        <Picker.Item label="February" value={1}></Picker.Item>
        <Picker.Item label="March" value={2}></Picker.Item>
        <Picker.Item label="April" value={3}></Picker.Item>
        <Picker.Item label="May" value={4}></Picker.Item>
        <Picker.Item label="June" value={5}></Picker.Item>
        <Picker.Item label="July" value={6}></Picker.Item>
        <Picker.Item label="August" value={7}></Picker.Item>
        <Picker.Item label="September" value={8}></Picker.Item>
        <Picker.Item label="October" value={9}></Picker.Item>
        <Picker.Item label="November" value={10}></Picker.Item>
        <Picker.Item label="December" value={11}></Picker.Item>
      </Picker>
      <Picker
        style={{ flex: 1 }}
        itemStyle={{ fontSize: 18 }}
        selectedValue={dateTime.day}
        onValueChange={(ItemValue) =>
          setDateTime((prev) => ({ ...prev, day: ItemValue }))
        }
      >
        <Picker.Item label="1" value={1}></Picker.Item>
        <Picker.Item label="2" value={2}></Picker.Item>
        <Picker.Item label="3" value={3}></Picker.Item>
        <Picker.Item label="4" value={4}></Picker.Item>
        <Picker.Item label="5" value={5}></Picker.Item>
        <Picker.Item label="6" value={6}></Picker.Item>
        <Picker.Item label="7" value={7}></Picker.Item>
        <Picker.Item label="8" value={8}></Picker.Item>
        <Picker.Item label="9" value={9}></Picker.Item>
        <Picker.Item label="10" value={10}></Picker.Item>
        <Picker.Item label="11" value={11}></Picker.Item>
        <Picker.Item label="12" value={12}></Picker.Item>
        <Picker.Item label="13" value={13}></Picker.Item>
        <Picker.Item label="14" value={14}></Picker.Item>
        <Picker.Item label="15" value={15}></Picker.Item>
        <Picker.Item label="16" value={16}></Picker.Item>
        <Picker.Item label="17" value={17}></Picker.Item>
        <Picker.Item label="18" value={18}></Picker.Item>
        <Picker.Item label="19" value={19}></Picker.Item>
        <Picker.Item label="20" value={20}></Picker.Item>
        <Picker.Item label="21" value={21}></Picker.Item>
        <Picker.Item label="22" value={22}></Picker.Item>
        <Picker.Item label="23" value={23}></Picker.Item>
        <Picker.Item label="24" value={24}></Picker.Item>
        <Picker.Item label="25" value={25}></Picker.Item>
        <Picker.Item label="26" value={26}></Picker.Item>
        <Picker.Item label="27" value={27}></Picker.Item>
        <Picker.Item label="28" value={28}></Picker.Item>
        {dateTime.month !== 1 && (
          <>
            <Picker.Item label="29" value={29}></Picker.Item>
            <Picker.Item label="30" value={30}></Picker.Item>
          </>
        )}
        {dateTime.month % 2 === 0 && (
          <Picker.Item label="31" value={31}></Picker.Item>
        )}
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
