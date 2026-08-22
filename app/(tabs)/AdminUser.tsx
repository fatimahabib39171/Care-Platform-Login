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
import CardHeading from "../../components/CardHeading";
import FormField from "../../components/FormField";
import PassRequirement from "../../components/PassRequirement";
import ProgressStepper from "../../components/ProgressStepper";
import ScreenLayout from "../../components/ScreenLayout";
import {
  FormData,
  FormErrors,
  step2Validation,
} from "../../utils/validation/step2Validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AdminUser() {

  const { width } = useWindowDimensions();
  const isMobile = width < 600;
  //const isTablet = width >= 600 && width < 1000;
  //const isDesktop = width >= 1000;

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

  const inserts = useSafeAreaInsets();

  const [showError, setShowError] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({});

  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const updateField = (field: keyof FormData, value: string) => {
    const updateForm = { ...form, [field]: value };

    setForm(updateForm);

    const validationErrors = step2Validation(updateForm);

    setErrors((prev) => ({
      ...prev,
      [field as keyof FormErrors]: validationErrors[field as keyof FormErrors],
    }));
  };

  const password = form.password;
  const passwordRequirement = {
    minLength: password.length >= 8,
    lowerCase: /[a-z]/.test(password),
    upperCase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>_\-[\]\\\/]/.test(password),
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

  const handleNext = async () => {
    const validationErrors = step2Validation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }

    try {
      const createdDate =
        new Date().toISOString();

      const userMasterData = {
        FirstName: form.firstName,
        LastName: form.lastName,
        Designation: form.designation,
        Email: form.email,
        Phone: form.phone,
        UserRole: "Admin",
        UserName: form.username,
        Password: form.password,
        CreatedDate: createdDate,
      };

      console.log( "UserMaster Data:", userMasterData );

      await AsyncStorage.setItem( "userMasterData", JSON.stringify(userMasterData));

      console.log("UserMaster data saved successfully");

      router.push("/(tabs)/SecurityQuestions");
    } 
    catch (error) {
      console.error("Failed to save admin user:", error);
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
            <ProgressStepper currentStep={2} totalSteps={4} />
          </View>
          <View style={styles.cardView}>
            <CardHeading
              heading="Admin User"
              subheading="First administrator account for this organisation."
            />
            <View style={isMobile ? styles.column : styles.row}>
              <View style={{ flex: 1 }}>
                <FormField
                  label="First Name "
                  required={true}
                  placeholderText="First name"
                  value={form.firstName}
                  onChangeText={(text) => {
                    if (!/^[a-zA-Z]*$/.test(text)) {
                      setErrors((prev) => ({
                        ...prev,
                        firstName: "First name must contain letters only.",
                      }));
                      return;
                    }
                    updateField("firstName", text);
                  }}
                  error={errors.firstName}
                  activeDropdown={null}
                  setActiveDropdown={() => {}}
                  onBlur={() => handleBlur("firstName", "First name")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormField
                  label="Last Name "
                  required={true}
                  placeholderText="Last name"
                  value={form.lastName}
                  onChangeText={(text) => {
                    if (!/^[a-zA-Z]*$/.test(text)) {
                      setErrors((prev) => ({
                        ...prev,
                        lastName: "Last name must contain letters only.",
                      }));
                      return;
                    }
                    updateField("lastName", text);
                  }}
                  error={errors.lastName}
                  activeDropdown={null}
                  setActiveDropdown={() => {}}
                  onBlur={() => handleBlur("lastName", "Last name")}
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
              onBlur={() => handleBlur("username", "Username")}
              belowInput={
                <Text style={styles.usernameHint}>Used for admin login</Text>
              }
            />

            <View style={isMobile ? styles.column : styles.row}>
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
                  onBlur={() => handleBlur("email", "A vaild email")}
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormField
                  label="Phone"
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
              onBlur={() => handleBlur("designation", "Designation")}
            />

            <View style={isMobile ? styles.column : styles.row}>
              <View style={styles.passwordSection}>
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
                  onBlur={() => handleBlur("password", "Password")}
                  belowInput={
                    <View style={styles.passRequirCard}>
                      <PassRequirement
                        label="At least 8 characters"
                        checked={passwordRequirement.minLength}
                      />
                      <PassRequirement
                        label="At least one lowercase letter"
                        checked={passwordRequirement.lowerCase}
                      />
                      <PassRequirement
                        label="At least one uppercase letter"
                        checked={passwordRequirement.upperCase}
                      />
                      <PassRequirement
                        label="At least one number"
                        checked={passwordRequirement.number}
                      />
                      <PassRequirement
                        label="At least one symbol (e.g. !@#$)"
                        checked={passwordRequirement.symbol}
                      />
                    </View>
                  }
                />
              </View>
              <View
                style={isMobile ? styles.confirmSmall : styles.confirmLarge}
              >
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
                  onBlur={() => handleBlur("confirm", "Confirm password")}
                />
              </View>
            </View>
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
                <Text style={styles.nextBtnText}>Next: Security →</Text>
              </Pressable>
            </View>
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
    flex:1,
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
  usernameHint: {
    color: colorPlater.color.footer,
    fontFamily: font.family,
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 13.2,
  },
  passRequirCard: {
    width: "100%",
    //minWidth: 226,
    //minHeight: 122,
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
    marginTop: 4,
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
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  column: {
    flexDirection: "column",
  },

  passwordSection: {
    flex: 1,
    //flexDirection: "column",
  },

  confirmSmall: {
    marginTop: 1,
  },

  confirmLarge: {
    flex: 1,
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
