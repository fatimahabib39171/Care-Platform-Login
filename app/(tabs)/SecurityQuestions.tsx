import CardHeading from "@/components/myui/CardHeading";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import FormField from "../../components/myui/FormField";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";
import { colorPlater, font } from "../../theme/theme";
import {
  FormData,
  FormErrors,
  step3Validation,
} from "../../utils/validation/step3Validation";

export default function SecurityQuestions() {
  const [form, setForm] = useState({
    question1: "",
    answer1: "",
    question2: "",
    answer2: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const validationErrors = step3Validation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    router.navigate("/(tabs)/SetupComplete");
  };

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

          <FormField
            label="Question 1 "
            required={true}
            placeholderText="Select a question..."
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            selectItem={true}
            dropdownId="Q1"
            options={[
              "What is your mother's maiden name?",
              "What was the name of your first pet?",
              "What city were you born in?",
              "What is your favourite food?",
            ]}
            value={form.question1}
            onSelect={(value) => updateField("question1", value)}
            error={errors.question1}
          />

          <FormField
            label="Answer 1 "
            required={true}
            placeholderText="Your answer"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            value={form.answer1}
            onChangeText={(text) => updateField("answer1", text)}
            error={errors.answer1}
          />

          <FormField
            label="Question 2 "
            required={true}
            placeholderText="Select a question..."
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            selectItem={true}
            dropdownId="Q2"
            options={[
              "What is your mother's maiden name?",
              "What was the name of your first pet?",
              "What city were you born in?",
              "What is your favourite food?",
            ]}
            value={form.question2}
            onSelect={(value) => updateField("question2", value)}
            error={errors.question2}
          />

          <FormField
            label="Answer 2 "
            required={true}
            placeholderText="Your answer"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
            value={form.answer2}
            onChangeText={(text) => updateField("answer2", text)}
            error={errors.answer2}
          />
          <View style={styles.rowBtns}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.navigate("/(tabs)/FirstTimeSetup")}
            >
              <Text style={styles.backBtnText}>← Back</Text>
            </Pressable>

            <Pressable style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Complete Setup ✓</Text>
            </Pressable>
          </View>
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
    paddingBottom: 24,
  },

  nextButton: {
    flex: 1,
    width: 114,
    minHeight: 18,

    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colorPlater.color.button,
    //gap: 8,
  },
  nextBtnText: {
    color: colorPlater.color.textCard,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 18,
  },
  backButton: {
    flex: 1,
    width: 81,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    //gap: 8,
    borderRadius: 10,
    backgroundColor: colorPlater.color.defaultBtn,
    padding: 14,
  },
  backBtnText: {
    color: colorPlater.color.Primary,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 18,
  },
  rowBtns: {
    height: 45,
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 12,
  },
});
