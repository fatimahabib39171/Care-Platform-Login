import CardHeading from "@/components/myui/CardHeading";
import { ScrollView, StyleSheet, View } from "react-native";
import FormField from "../../components/myui/FormField";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";

export default function SecurityQuestions() {
  return (
    <ScrollView>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={3} totalSteps={4} />
        </View>
        <View style={styles.cardView}>
          <CardHeading
            heading="Security Questions"
            subheading="Used to recover access if the password is forgotten."
          />

          <FormField label="Hello" />
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
});
