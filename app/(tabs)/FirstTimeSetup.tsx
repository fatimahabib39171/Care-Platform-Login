import { colorPlater } from "@/theme/theme";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FormField from "../../components/myui/FormField";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";

export default function FirstTimeSetup() {
  return (
    <ScrollView>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={1} totalSteps={4} />
        </View>
        <View style={styles.cardView}>
          <Text style={styles.cardHeading}>Organisation Details</Text>
          <Text style={styles.cardSubheading}>
            This creates your organisation record on the server.
          </Text>

          <FormField
            label="Organisation Name "
            required={true}
            placeholderText="e.g. NUH Medical Centre"
          />
          <View style={[]}>
            <FormField
              label="Type "
              required={true}
              placeholderText="Select type..."
            />

            <FormField
              label="Time Zone "
              required={true}
              placeholderText="Select..."
            />
          </View>
          <FormField
            label="Address "
            required={true}
            placeholderText="Street address"
          />

          <FormField
            label="City / State"
            placeholderText="e.g. Lahore, Punjab"
          />

          <FormField
            label="Country "
            required={true}
            placeholderText="e.g. Pakistan"
          />

          <FormField
            label="Email "
            required={true}
            placeholderText="org@example.com"
            keyboardType="email-address"
          />

          <FormField
            label="Description"
            placeholderText="Option - short description"
          />

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/AdminUser")}
          >
            <Text style={styles.btnText}>Next: Admin User →</Text>
          </Pressable>
        </View>
      </ScreenLayout>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  stepperView: {
    marginVertical: 16,
    marginHorizontal: 73,
  },
  cardView: {
    paddingHorizontal: 24,
  },
  cardHeading: {
    color: colorPlater.color.Primary,
    fontFamily: "Roboto",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 24,

    paddingTop: 20,
  },
  cardSubheading: {
    color: colorPlater.color.footer,
    fontFamily: "Roboto",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 15.6,

    marginBottom: 19,
  },
  button: {
    flex: 1,
    maxWidth: 520,
    minHeight: 45,
    paddingVertical: 13.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colorPlater.color.button,
  },
  btnText: {
    color: colorPlater.color.textCard,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 18,
  },
});
