import { colorPlater, font } from "@/theme/theme";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FormField from "../../components/myui/FormField";
import ScreenLayout from "../../components/myui/ScreenLayout";
import {
  FormData,
  FormErrors,
  mainValidation,
} from "../../utils/validation/mainValidation";

export default function App() {
  const [showPass, setShowPass] = useState(false);
  const [checked, setChecked] = useState(false);

  const [form, setForm] = useState({
    organisationName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

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
    const validationErrors = mainValidation(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Alert.alert("Login successfully!");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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

            <Pressable style={styles.button} onPress={handleNext}>
              <Text style={styles.btnText}>Sign In</Text>
            </Pressable>

            <View style={styles.linkView}>
              <Pressable
                style={styles.forgotBtn}
                onPress={() =>
                  Alert.alert("Password reset link sent to your email")
                }
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

    paddingTop: 20,
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
    position: "relative",
  },
  checked: {
    backgroundColor: colorPlater.color.Primary,
    borderColor: colorPlater.color.Primary,
  },
  checkedText: {
    width: 12,
    height: 12,
    fontSize: 12,
    padding: 1,
    color: colorPlater.color.textCard,
    position: "absolute",
    bottom: 3,
    left: 0.5,
    //backgroundColor: "red",
    margin: 1,
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
});
