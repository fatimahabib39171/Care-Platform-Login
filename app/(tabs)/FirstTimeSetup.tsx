import CardHeading from "@/components/myui/CardHeading";
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
import FormField from "../../components/myui/FormField";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";
import {
  FormData,
  FormErrors,
  step1Validation,
} from "../../utils/validation/step1Validation";

export default function FirstTimeSetup() {
  const [form, setForm] = useState<FormData>({
    organisationName: "",
    type: "",
    timeZone: "",
    address: "",
    cityState: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  const handleNext = () => {
    const validationErrors = step1Validation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    router.push("/(tabs)/AdminUser");
  };

  return (
    <ScrollView>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={1} totalSteps={4} />
        </View>
        <View style={styles.cardView}>
          <CardHeading
            heading="Organisation Details"
            subheading="This creates your organisation record on the server."
          />

          <FormField
            label="Organisation Name "
            required={true}
            placeholderText="e.g. NUH Medical Centre,"
            value={form.organisationName}
            onChangeText={(text) => updateField("organisationName", text)}
            error={errors.organisationName}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <View style={isSmallScreen ? styles.column : styles.row}>
            <View style={{ flex: 1 }}>
              <FormField
                label="Type "
                required={true}
                placeholderText="Select type..."
                value={form.type}
                onSelect={(value) => updateField("type", value)}
                error={errors.type}
                selectItem={true}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                dropdownId="Type"
                options={[
                  "Hospital",
                  "Clinic",
                  "Rehabilitation Centre",
                  "Nursing Home",
                  "Community Centre",
                  "Home Care",
                  "Other",
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <FormField
                label="Time Zone "
                required={true}
                placeholderText="Select..."
                value={form.timeZone}
                onSelect={(value) => updateField("timeZone", value)}
                error={errors.timeZone}
                selectItem={true}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                dropdownId="TimeZone"
                options={[
                  "UTC+05:00 Karachi / Islamabad",
                  "UTC+08:00 Singapore",
                  "UTC+09:00 - Tokyo",
                  "UTC+01:00 - Berlin",
                  "UTC+00:00 - London",
                ]}
              />
            </View>
          </View>
          <FormField
            label="Address "
            required={true}
            placeholderText="Street address"
            value={form.address}
            onChangeText={(text) => updateField("address", text)}
            error={errors.address}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <View style={isSmallScreen ? styles.column : styles.row}>
            <View style={{ flex: 1 }}>
              <FormField
                label="City / State"
                placeholderText="e.g. Lahore, Punjab"
                value={form.cityState}
                onChangeText={(text) => updateField("cityState", text)}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </View>

            <View style={{ flex: 1 }}>
              <FormField
                label="Postal Code "
                required={true}
                placeholderText="e.g. 54000"
                keyboardType="number-pad"
                value={form.postalCode}
                onChangeText={(text) => updateField("postalCode", text)}
                error={errors.postalCode}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </View>
          </View>

          <View style={isSmallScreen ? styles.column : styles.row}>
            <View style={{ flex: 1 }}>
              <FormField
                label="Country "
                required={true}
                placeholderText="e.g. Pakistan"
                value={form.country}
                onChangeText={(text) => updateField("country", text)}
                error={errors.country}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </View>

            <View style={{ flex: 1 }}>
              <FormField
                label="Phone "
                required={true}
                placeholderText="+92 3xx xxxxxxx"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(text) => updateField("phone", text)}
                error={errors.phone}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
              />
            </View>
          </View>
          <FormField
            label="Email "
            required={true}
            placeholderText="org@example.com"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => updateField("email", text)}
            error={errors.email}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          <FormField
            label="Description"
            placeholderText="Option - short description"
            multiline={true}
            value={form.description}
            onChangeText={(text) => updateField("description", text)}
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />

          <Pressable style={styles.button} onPress={handleNext}>
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flexDirection: "column",
  },
});
