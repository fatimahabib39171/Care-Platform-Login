import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressStepper from "../../components/ProgressStepper";
import ScreenLayout from "../../components/ScreenLayout";
import { colorPlater, font } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendFirstTimeSetup } from "@/services/API";

export default function SetupComplete() {
  const inserts = useSafeAreaInsets();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [setupSuccess, setSetupSuccess] = useState(false);
  const [apiResponse, setApiResponse] = useState<any>(null);

  useEffect(() => {
     if (!setupSuccess) return;
    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [setupSuccess]);


const handleCompleteSetup = async () => {
  if (loading) return;

  try {
    setLoading(true);
    setMessage("");
    setSetupSuccess(false);

    const organizationString =
      await AsyncStorage.getItem("organizationData");

    const userString =
      await AsyncStorage.getItem("userMasterData");

    if (!organizationString || !userString) {
      setMessage("Setup data is missing. Please go back and complete all steps.");
      return;
    }

    const organization = JSON.parse(organizationString);
    const userMaster = JSON.parse(userString);

    const createdDate = new Date().toISOString();
    const securityQuestion = userMaster.SecurityQuestion || {
      SecurityQuestionID: 0,
      Question: "",
      Answer: "",
    };

    const payload = {
      Organization: organization,

      UserMaster: {
        ...userMaster,
        CreatedDate:
          userMaster.CreatedDate ||
          createdDate,
      },

      SecurityQuestion: securityQuestion,

      OrgDevice: {
        OrganizationID: 0,
        ProductDeviceID: 0,
        CreatedDate: createdDate,
      },

      ProductDevice: {
        SystemType: "H-Man",
        Model: "HMan2024",
        CreatedDate: createdDate,
      },

      OrganizationAccessories: [],
    };

    console.log( "================================" );
    console.log("FIRST TIME SETUP PAYLOAD");
    console.log( JSON.stringify( payload, null, 2 ) );
    console.log( "================================" );

    const result = await sendFirstTimeSetup(payload);

    console.log("API RESPONSE:", result );

  if (result.status === "success") {
  setSetupSuccess(true);
  setShowSuccess(true);

  // Store the COMPLETE API response
  setApiResponse(result);

  setMessage("Setup completed successfully!");

  await AsyncStorage.multiRemove([
    "organizationData",
    "userMasterData",
  ]);
}

  } 
  catch (error) {
      console.error(
        "First Time Setup Error:",
        error
      );

      setMessage(
        "Something went wrong while completing setup."
      );
  } 
  finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollContent}
            >
      <ScreenLayout>
        <View style={styles.stepperView}>
          <ProgressStepper currentStep={5} totalSteps={4} />
        </View>
        <View>
          <View style={styles.cardView}>
            {!setupSuccess && (
              <>
                <View style={styles.card}>
                  <View style={styles.isDone}>
                    <Text style={styles.isDoneText}>✓</Text>
                  </View>
                </View>
                <Text style={styles.complete}>Ready to Complete Setup</Text>
                <Text style={styles.readyText}>
                  Your organisation and admin account information has been collected. 
                  Press the button below to create the records on the server.
                </Text>
              </>
            )}

            {setupSuccess && (
              <>
                <View style={styles.card}>
                  <View style={styles.isDone}>
                    <Text style={styles.isDoneText}>✓</Text>
                  </View>
                </View>
                <Text style={styles.complete}>Setup Complete!</Text>
                <Text style={styles.readyText}>
                  Your organisation and admin account are ready. You can now sign
                  in.
                </Text>
              </>
            )}

            {message !== "" && (
              <View style={[styles.messageBox, setupSuccess ? styles.successMessage : styles.errorMessage,]}
              >
                <Text
                style={[
                  styles.messageText,
                  {
                    textAlign: "left",
                  },
                ]}
              >
                {message}
              </Text>
              </View>
            )}

            {setupSuccess && apiResponse && (
              <View style={styles.apiResponseBox}>
                <Text style={styles.apiResponseTitle}>
                  API Response
                </Text>

                <Text style={styles.apiResponseText}>
                  {JSON.stringify(apiResponse, null, 2)}
                </Text>
              </View>
            )}

            {!setupSuccess && (
              <Pressable onPress={ handleCompleteSetup }
                disabled={loading}
                style={({ pressed }) => [ 
                    styles.button,
                    pressed && styles.buttonPressed,
                    loading && styles.buttonDisabled,
                ]}
              >
                {loading ? (
                  <View style={ styles.loadingContainer } >
                    <ActivityIndicator color="#fff" size="large"/>
                    <Text style={ styles.btnText } >Completing...</Text>
                  </View>
                ) : (
                  <Text style={ styles.btnText } >Complete Setup</Text>
                )}
              </Pressable>
            )}

            <View style={styles.rowBtns}>
              {setupSuccess && (
              <Pressable
                onPress={() => router.push("/(tabs)")}
                style={({ hovered, pressed }) => [
                  styles.button,
                  hovered && styles.buttonHover,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.btnText}>Go to Login</Text>
              </Pressable>
              )}

              {!setupSuccess && (
              <Pressable
                onPress={() => router.back()}
                style={({pressed}) => [
                  styles.backButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.backBtnText}>Back</Text>
              </Pressable>
              )}
            </View>
          </View>
        </View>
      </ScreenLayout>
      </ScrollView>

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
    paddingVertical: 16,
    paddingHorizontal: 73,
  },
  cardView: {
    paddingHorizontal: 24,
    //paddingBottom: 24,
  },
  container: {
     flex: 1, 
     backgroundColor: colorPlater.color.background,},
  card: {
    alignSelf: "center",
    marginTop: 40,
  },
  isDone: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: colorPlater.color.doneBtn,
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
    marginBottom: 7,
    marginTop: 16,
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
    // maxWidth: 520,
    minHeight: 45,
    paddingVertical: 13.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colorPlater.color.button,
    marginBottom: 40,
  },

  backButton: {
    flex: 1,
    //width: 81,
    minHeight: 45,
    paddingVertical: 13.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colorPlater.color.defaultBtn,
    marginBottom: 40,
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
  backBtnText: {
    color: colorPlater.color.Primary,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 18,
  },

  successBox: {
    position: "absolute",
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

  buttonHover: {
    backgroundColor: colorPlater.color.Primary,
  },

  buttonPressed: {
    opacity: 1,
    transform: [{ scale: 0.97 }],
  },

  messageBox: {
    width: "100%",
    maxWidth: 600,
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  messageText: {
    fontFamily: font.family,
    textAlign: "center",
  },

  successMessage: {
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#66BB6A",
  },

  errorMessage: {
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#EF5350",
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  rowBtns: {
    height: 45,
    alignItems: "flex-end",
    flexDirection: "row",
    gap: 12,
    marginTop: 5,
  },

  responseContainer: {
  width: "100%",
  marginBottom: 20,
},

apiResponseBox: {
  width: "100%",
  maxWidth: 600,
  backgroundColor: colorPlater.color.input,
  borderRadius: 10,
  padding: 16,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: "#E0E0E0",
},

apiResponseTitle: {
  fontFamily: font.family,
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
  color: colorPlater.color.doneBtn,
},

apiResponseText: {
  fontFamily: font.family,
  fontSize: 13,
  lineHeight: 20,
  color: "#333333",
},

});