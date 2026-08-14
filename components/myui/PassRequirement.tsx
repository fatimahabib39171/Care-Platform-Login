import { colorPlater } from "@/theme/theme";
import { StyleSheet, Text, TextInputProps, View } from "react-native";

type passRequirProps = TextInputProps & {
  label: String;
  checked: boolean;
};

export default function PassRequirement({
  label,
  checked,
  ...inputProps
}: passRequirProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.checkBox, checked && styles.checkBoxDone]}>
        <Text style={styles.checkText}>✓</Text>
      </View>
      <Text style={[styles.text, checked && styles.textDone]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 2,
    //backgroundColor: "lightblue",
  },
  checkBox: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colorPlater.color.checkerBorder,

    marginRight: 14,
    borderWidth: 1.5,
  },
  checkBoxDone: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderColor: colorPlater.color.doneBtn,
    backgroundColor: colorPlater.color.doneBtn,

    marginRight: 14,
    borderWidth: 1,
  },
  checkText: {
    color: colorPlater.color.textCard,
    fontFamily: "Roboto",
    fontSize: 9.32,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 12,
    top: 1.2,
  },

  text: {
    color: colorPlater.color.showbutton,
    fontFamily: "Roboto",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 14.4,
  },
  textDone: {
    color: colorPlater.color.doneBtn,
  },
});
