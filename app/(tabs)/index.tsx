import { colorPlater, font } from "@/theme/theme";
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
import FormField from "../../components/myui/FormField";
import ScreenLayout from "../../components/myui/ScreenLayout";
import {
  FormData,
  FormErrors,
  mainValidation,
} from "../../utils/validation/mainValidation";

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const inserts = useSafeAreaInsets();

  const [form, setForm] = useState({
    organisationName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof FormData, value: string) => {
    const updateForm = { ...form, [field]: value };

    setForm(updateForm);

    const validationErrors = mainValidation(updateForm);

    setErrors((prev) => ({
      ...prev,
      [field as keyof FormErrors]: validationErrors[field as keyof FormErrors],
    }));
  };

  const [showError, setShowError] = useState(false);
  const [showForgotSuccess, setShowForgotSuccess] = useState(false);

  const handleSignIn = () => {
    const validationErrors = mainValidation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleForgotPassword = () => {
    setShowForgotSuccess(true);
    setTimeout(() => {
      setShowForgotSuccess(false);
    }, 3000);
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
          <View style={styles.cardView}>
            <Text style={styles.cardHeading}>Welcome back</Text>
            <Text style={styles.cardSubheading}>
              Sign in with your organisation credentials
            </Text>

            <FormField
              label="Organisation Name "
              required={true}
              placeholderText="e.g. NUH Medical Centre"
              value={form.organisationName}
              onChangeText={(text) => updateField("organisationName", text)}
              error={errors.organisationName}
              activeDropdown={null}
              setActiveDropdown={() => {}}
            />

            <FormField
              label="Username "
              required={true}
              placeholderText="Enter your username"
              value={form.username}
              onChangeText={(text) => updateField("username", text)}
              error={errors.username}
              activeDropdown={null}
              setActiveDropdown={() => {}}
            />

            <FormField
              label="Password "
              required={true}
              placeholderText="Enter your password"
              value={form.password}
              onChangeText={(text) => updateField("password", text)}
              error={errors.password}
              activeDropdown={null}
              setActiveDropdown={() => {}}
              secureTextEntry={true}
            />

            <Pressable
              style={styles.checkView}
              onPress={() => setChecked(!checked)}
            >
              <View style={[styles.checkBox, checked && styles.checked]}>
                <Text style={styles.checkedText}>{checked ? "✔" : ""}</Text>
              </View>
              <Text style={styles.rmbtn}>Remember me</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={handleSignIn}>
              <Text style={styles.btnText}>Sign In</Text>
            </Pressable>

            <View style={styles.linkView}>
              <Pressable
                style={styles.forgotBtn}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>

              <Pressable
                style={styles.forgotBtn}
                onPress={() => router.push("/(tabs)/FirstTimeSetup")}
              >
                <Text style={styles.forgotText}>First time here?</Text>
              </Pressable>
            </View>
          </View>
        </ScreenLayout>
      </ScrollView>

      {showSuccess && (
        <View style={[styles.successBox, { bottom: inserts.bottom + 20 }]}>
          <Text style={styles.successText}>Login successful</Text>
        </View>
      )}
      {showForgotSuccess && (
        <View style={[styles.errorBoxView, { bottom: inserts.bottom + 20 }]}>
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>
              Password reset link sent to your email
            </Text>
          </View>
        </View>
      )}
      {showError && (
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
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  cardView: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  cardHeading: {
    color: colorPlater.color.Primary,
    fontFamily: font.family,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 24,

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

    marginBottom: 19,
  },
  checkView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17.5,
    maxWidth: 120,
  },
  checkBox: {
    minWidth: 16,
    minHeight: 16,
    marginRight: 8,
    borderWidth: 1,

    borderColor: colorPlater.color.checkBox,
    borderRadius: 3,
    alignContent: "center",
    justifyContent: "center",
  },
  checked: {
    backgroundColor: colorPlater.color.Primary,
    borderColor: colorPlater.color.Primary,
  },
  checkedText: {
    color: colorPlater.color.textCard,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 14,
    textAlign: "center",
    alignSelf: "center",
    width: 12,
    height: 14,
    bottom: 1,
    left: 0.5,
    //padding: 1,
    //position: "absolute",
    //backgroundColor: "red",
    //margin: 1,
  },
  rmbtn: {
    color: colorPlater.color.cardLabel,
    fontFamily: font.family,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 15.6,

    //marginTop: 18,
    //marginBottom: 17.7,
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
  linkView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forgotBtn: {
    marginTop: 14,
  },
  forgotText: {
    color: colorPlater.color.button,
    fontFamily: font.family,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 15.6,
  },

  successBox: {
    position: "absolute",
    //bottom: 45,
    // left: 120,
    // right: 120,
    alignSelf: "center",
    width: "90%",
    maxWidth: 170,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colorPlater.color.doneBtn,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },

  successText: {
    color: colorPlater.color.textCard,
    fontSize: 14,
    fontWeight: "600",
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
});
