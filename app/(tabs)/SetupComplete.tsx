import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";
import { colorPlater, font } from "../../theme/theme";

export default function SetupComplete() {
  const inserts = useSafeAreaInsets();

  const [showSuccess, setShowSuccess] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={5} totalSteps={4} />
        </View>
        <View>
          <View style={styles.cardView}>
            <View style={styles.container}>
              <View style={styles.isDone}>
                <Text style={styles.isDoneText}>✓</Text>
              </View>
            </View>
            <Text style={styles.complete}>Setup Complete!</Text>
            <Text style={styles.readyText}>
              Your organisation and admin account are ready. You can now sign
              in.
            </Text>

            <Pressable
              style={styles.button}
              onPress={() => router.navigate("/(tabs)")}
            >
              <Text style={styles.btnText}>Go to Login</Text>
            </Pressable>
          </View>
        </View>
      </ScreenLayout>

      {showSuccess && (
        <View style={[styles.successBox, { bottom: inserts.bottom + 20 }]}>
          <Text style={styles.successText}>Setup Complete</Text>
        </View>
      )}
    </View>
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
  container: {
    alignSelf: "center",
    marginTop: 20,
  },
  isDone: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: colorPlater.color.doneBtn,
    marginBottom: 16,
  },
  isDoneText: {
    color: colorPlater.color.textCard,
    fontFamily: font.family,
    textAlign: "center",
    fontSize: 36,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 36,
  },
  complete: {
    color: colorPlater.color.doneBtn,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 28.8,
    marginBottom: 8,
  },
  readyText: {
    color: colorPlater.color.defaultBtnText,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 16.8,
    marginBottom: 23,
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
});
