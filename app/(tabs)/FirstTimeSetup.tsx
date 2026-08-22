import CardHeading from "@/components/CardHeading";
import { colorPlater, font } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import ProgressStepper from "../../components/ProgressStepper";
import ScreenLayout from "../../components/ScreenLayout";
import {
  FormData,
  FormErrors,
  step1Validation,
} from "../../utils/validation/step1Validation";
import { generateOrgID } from "@/utils/generateOrgID";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FirstTimeSetup() {

  const handleSetup = async () => {
  try {
    const now = new Date();
    const installationDate = now.toISOString();
    const expiryDate = new Date(now); 
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const createdDate = now.toISOString();
    const organizationsID = generateOrgID(
      form.organizationName
    );

    const OrganizationData = {
        OrganizationsID: organizationsID,
        Name: form.organizationName,
        Department: "",
        OrganizationType: form.type,
        Others: "",
        Address: form.address,
        CityState: form.cityState,
        Country: form.country,
        PostalCode: form.postalCode,
        Email: form.email,
        Phone: form.phone,
        TimeZone: form.timeZone,
        Description: form.description,
        InstallationDate: installationDate,
        ExpiryDate: expiryDate.toISOString(),
        CreatedDate: createdDate,
    };
    console.log("Organization Data");
    await AsyncStorage.setItem( "organizationData", JSON.stringify(OrganizationData) );
    console.log("Organization data saved successfully");
    router.push("/(tabs)/AdminUser");

    } 
    catch (error) {
      console.error("Failed to save organization:", error);
    }
  };

  const [form, setForm] = useState<FormData>({
    organizationName: "",
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
  const inserts = useSafeAreaInsets();
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  //const isTablet = width >= 600 && width < 1000;
  //const isDesktop = width >= 1000;

  const updateField = (field: keyof FormData, value: string) => {
    const updateForm = { ...form, [field]: value };
    setForm(updateForm);
    const validationErrors = step1Validation(updateForm);
    setErrors((prev) => ({
      ...prev,
      [field as keyof FormErrors]: validationErrors[field as keyof FormErrors],
    }));
  };

  const handleNext = () => {
    const validationErrors = step1Validation(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    handleSetup();
  };

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

const handleDropdownBlur = (
    field: keyof FormData,
    fieldName: string
  ) => {
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
              value={form.organizationName}
              keyboardType="default"
              onChangeText={(text) => updateField("organizationName", text)}
              error={errors.organizationName}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              onBlur={() => handleBlur("organizationName", "Organisation name")}
            />
            <View style={isMobile ? styles.column : styles.row}>
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
                  onDropdownBlur={() => handleDropdownBlur("type", "Type")}
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
                  onDropdownBlur={() => handleDropdownBlur("timeZone", "Time zone")}
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
              onBlur={() => handleBlur("address", "Address" )}
            />
            <View style={isMobile ? styles.column : styles.row}>
              <View style={{ flex: 1 }}>
                <FormField
                  label="City / State"
                  placeholderText="e.g. Lahore, Punjab"
                  value={form.cityState}
                  onChangeText={(text) => updateField("cityState", text)}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  onBlur={() => handleBlur("cityState", "City / State")}
                />
              </View>

              <View style={{ flex: 1 }}>
                <FormField
                  label="Postal Code "
                  required={true}
                  placeholderText="e.g. 54000"
                  keyboardType="default"
                  value={form.postalCode}
                  onChangeText={(text) => updateField("postalCode", text)}
                  error={errors.postalCode}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  onBlur={() => handleBlur("postalCode", "Postal Code")}
                />
              </View>
            </View>

            <View style={isMobile ? styles.column : styles.row}>
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
                  onBlur={() => handleBlur("country", "Country")}
                />
              </View>

              <View style={{ flex: 1 }}>
                <FormField
                  label="Phone "
                  required={true}
                  placeholderText="+92 3xx xxxxxxx"
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(text) => {
                    if (!/^\+?[0-9()]*$/.test(text)) {
                      setErrors((prev) => ({
                        ...prev,
                        phone:
                          "Phone number can contain +, (, ) and digits only.",
                      }));
                      return;
                    }

                    updateField("phone", text);
                  }}
                  error={errors.phone}
                  activeDropdown={activeDropdown}
                  setActiveDropdown={setActiveDropdown}
                  onBlur={() => handleBlur("phone", "Phone number")}
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
              onBlur={() => handleBlur("email", "A valid email")}
            />

            <FormField
              label="Description"
              placeholderText="Option - short description"
              multiline={true}
              value={form.description}
              onChangeText={(text) => updateField("description", text)}
              activeDropdown={activeDropdown}
              setActiveDropdown={setActiveDropdown}
              onBlur={() => handleBlur("description", "Description")}
            />

            <Pressable
              onPress={handleNext}
              style={({ hovered, pressed }) => [
                styles.button,
                hovered && styles.buttonHover, 
                pressed && styles.buttonPressed,
              ]}
            >
              <Text style={styles.btnText}>Next: Admin User →</Text>
            </Pressable>
          </View>
        </ScreenLayout>
      </ScrollView>
      {showError && (
        <View style={[styles.errorBoxView, { bottom: inserts.bottom + 20 }]}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Please complete the highlighted fields before continuing.
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
  saveArea: {
    flex: 1,
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
    fontFamily: font.family,
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
    paddingHorizontal: 15,
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
