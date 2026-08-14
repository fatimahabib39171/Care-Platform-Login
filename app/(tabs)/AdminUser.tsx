import { colorPlater } from "@/theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import CardHeading from "../../components/myui/CardHeading";
import FormField from "../../components/myui/FormField";
import PassRequirement from "../../components/myui/PassRequirement";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";
import {
  FormData,
  FormErrors,
  step2Validation,
} from "../../utils/validation/step2Validation";

export default function AdminUser() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    designation: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleNext = () => {
    const validationErrors = step2Validation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    router.push("/(tabs)/SecurityQuestions");
  };

  return (
    <ScrollView>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={2} totalSteps={4} />
        </View>
        <View style={styles.cardView}>
          <CardHeading
            heading="Admin User"
            subheading="First administrator account for this organisation."
          />
          <View style={isSmallScreen ? styles.column : styles.row}>
            <View style={{ flex: 1 }}>
              <FormField
                label="First Name "
                required={true}
                placeholderText="First name"
                value={form.firstName}
                onChangeText={(text) => updateField("firstName", text)}
                error={errors.firstName}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormField
                label="Last Name "
                required={true}
                placeholderText="Last name"
                value={form.lastName}
                onChangeText={(text) => updateField("lastName", text)}
                error={errors.lastName}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
            </View>
          </View>
          <FormField
            label="Username "
            required={true}
            placeholderText="Choose a username"
            value={form.username}
            onChangeText={(text) => updateField("username", text)}
            error={errors.username}
            activeDropdown={null}
            setActiveDropdown={() => {}}
          />

          <View style={isSmallScreen ? styles.column : styles.row}>
            <View style={{ flex: 1 }}>
              <FormField
                label="Email "
                required={true}
                placeholderText="admin@example.com"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => updateField("email", text)}
                error={errors.email}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormField
                label="Phone"
                placeholderText="+92 3xx xxxxxxx"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => updateField("phone", text)}
                error={errors.phone}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
            </View>
          </View>

          <FormField
            label="Designation"
            placeholderText="e.g. Lead Physiotherapist"
            value={form.designation}
            onChangeText={(text) => updateField("designation", text)}
            activeDropdown={null}
            setActiveDropdown={() => {}}
          />

          <View style={isSmallScreen ? styles.column : styles.row}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: "red",
              }}
            >
              <FormField
                label="Password "
                required={true}
                placeholderText="Enter password"
                secureTextEntry={true}
                value={form.password}
                onChangeText={(text) => updateField("password", text)}
                error={errors.password}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
              <View style={styles.passRequirCard}>
                <PassRequirement label="At least 8 characters" checked={true} />
                <PassRequirement
                  label="At least one lowercase letter"
                  checked={false}
                />

                <PassRequirement
                  label="At least one uppercase letter"
                  checked={false}
                />

                <PassRequirement label="At least one number" checked={false} />

                <PassRequirement
                  label="At least one symbol (e.g. !@#$)"
                  checked={false}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <FormField
                label="Confirm "
                required={true}
                placeholderText="Repeat password"
                secureTextEntry={true}
                value={form.confirm}
                onChangeText={(text) => updateField("confirm", text)}
                error={errors.confirm}
                activeDropdown={null}
                setActiveDropdown={() => {}}
              />
            </View>
          </View>
          <View style={styles.rowBtns}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.navigate("/(tabs)/FirstTimeSetup")}
            >
              <Text style={styles.backBtnText}>← Back</Text>
            </Pressable>

            <Pressable style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Next: Security →</Text>
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
  },
  passRequirCard: {
    minWidth: 226,
    minHeight: 122,
    paddingVertical: 11,
    paddingHorizontal: 13,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colorPlater.color.inputBorder,
    backgroundColor: colorPlater.color.backgroundCard,
    marginBottom: 5,
    bottom: 10,
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
    gap: 8,
    marginRight: 136,
    marginLeft: 290,
  },
  nextBtnText: {
    color: colorPlater.color.textCard,
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 18,
  },
  backButton: {
    flex: 1,
    width: 53,
    minHeight: 18,
    maxHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    backgroundColor: colorPlater.color.defaultBtn,
    padding: 14,
  },
  backBtnText: {},
  rowBtns: {
    flexDirection: "row",
    marginBottom: 23,

    backgroundColor: "red",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flexDirection: "column",
  },
});
