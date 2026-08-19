import CardHeading from "@/components/CardHeading";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import ProgressStepper from "../../components/ProgressStepper";
import ScreenLayout from "../../components/ScreenLayout";
import { colorPlater, font } from "../../constants/theme";
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

  const securityQuestions = [
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your favourite food?",
];

  const inserts = useSafeAreaInsets();

  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    const updateForm = { ...form, [field]: value };
    setForm(updateForm);
    const validationErrors = step3Validation(updateForm);
    setErrors((prev) => ({
      ...prev,
      [field as keyof FormErrors]: validationErrors[field as keyof FormErrors],
    }));
  };

  const handleNext = () => {
    const validationErrors = step3Validation(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return;
    }
    router.push("/(tabs)/SetupComplete");
  };

    const [touched, setTouched] = useState<Record<string, boolean>>({});
  const handleBlur = (
    field: keyof FormData,
    fieldName: string
  ) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  
    if (!form[field]?.trim()) {
      setErrors((prev) => ({
        ...prev,
        [field]: `${fieldName} is required.`,
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
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
              options={securityQuestions.filter((question) => question !== form.question2)}
              value={form.question1}
              onSelect={(value) => updateField("question1", value)}
              error={errors.question1}
              onBlur={() => handleBlur("question1", "Question")}
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
              onBlur={() => handleBlur("answer1", "Answer")}
            />

            <FormField
              label="Question 2 "
              required={true}
              placeholderText="Select a question..."
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              selectItem={true}
              dropdownId="Q2"
              options={securityQuestions.filter((question) => question !== form.question1)}
              value={form.question2}
              onSelect={(value) => updateField("question2", value)}
              error={errors.question2}
              onBlur={() => handleBlur("question2", "Question")}
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
              onBlur={() => handleBlur("answer2", "Answer")}
            />
            <View style={styles.rowBtns}>
              <Pressable
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <Text style={styles.backBtnText}>← Back</Text>
              </Pressable>

              <Pressable
                onPress={handleNext}
                style={({ hovered, pressed }) => [
                  styles.nextButton,
                  hovered && styles.buttonHover,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.nextBtnText}>Complete Setup</Text>
              </Pressable>
            </View>
          </View>
        </ScreenLayout>
      </ScrollView>

      {showSuccess && (
        <View style={[styles.errorBoxView, { bottom: inserts.bottom + 20 }]}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Please complete the highlighted fields.
            </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  stepperView: {
    marginVertical: 16,
    marginHorizontal: 73,
  },
  container: {
    flex: 1,
    backgroundColor: colorPlater.color.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
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

  errorBoxView: {
    position: "absolute",
    //bottom: 45,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  errorBox: {
    maxWidth: 568,
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: colorPlater.color.Primary,
    marginHorizontal: 70,
  },

  errorText: {
    color: colorPlater.color.textCard,
    fontSize: 14,
    fontWeight: "400",
  },

  buttonHover: {
    backgroundColor: colorPlater.color.Primary,
  },

  buttonPressed: {
    opacity: 1,
    transform: [{ scale: 0.97 }],
  },
});
