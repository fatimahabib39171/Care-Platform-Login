import { colorPlater, font } from "@/constants/theme";
import { StyleSheet, Text, TextInputProps, View } from "react-native";

type HeadingProps = TextInputProps & {
  heading: string;
  subheading: string;
};

export default function CardHeading({
  heading,
  subheading,
  ...inputProps
}: HeadingProps) {
  return (
    <View>
      <Text style={styles.cardHeading}>{heading}</Text>
      <Text style={styles.cardSubheading}>{subheading}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardHeading: {
    color: colorPlater.color.Primary,
    fontFamily: font.family,
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 20.4,

    marginTop: 20,
    marginBottom: 3,
  },
  cardSubheading: {
    color: colorPlater.color.footer,
    fontFamily: font.family,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 15.6,

    marginBottom: 17,
  },
});
