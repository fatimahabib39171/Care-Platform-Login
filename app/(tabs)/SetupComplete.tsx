import { ScrollView, StyleSheet, Text, View } from "react-native";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";

export default function SetupComplete() {
  return (
    <ScrollView>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={5} totalSteps={4} />
        </View>
        <View style={styles.cardView}>
          <Text>Setup Complete</Text>
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
