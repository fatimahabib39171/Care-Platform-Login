import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ProgressStepper from "../../components/ProgressStepper";
import ScreenLayout from "../../components/ScreenLayout";
import { colorPlater, font } from "../../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendFirstTimeSetup } from "@/services/API";

type SetupResponse = {
  status?: string;
  message?: string;
  data?: any;
};

export default function SetupComplete() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [setupData, setSetupData] = useState<SetupResponse | null>(null);
  const [showData, setShowData] = useState(false);
  
  const [organization, setOrganization] = useState<any>(null);
  const [userMaster, setUserMaster] = useState<any>(null);
  const [securityQuestion, setSecurityQuestion] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => { loadSetupData(); }, []);

  const loadSetupData = async () => {
  try {
    setLoading(true);

    const saved = await AsyncStorage.getItem("setupResponse");

    console.log("SAVED SETUP RESPONSE:", saved);

    if (!saved) {
      setError("No setup data found.");
      return;
    }

    const response = JSON.parse(saved);

    console.log(
      "PARSED SETUP RESPONSE:",
      JSON.stringify(response, null, 2)
    );

    setSetupData(response);
  } catch (error) {
    console.error("LOAD ERROR:", error);
    setError("Unable to load setup information.");
  } finally {
    setLoading(false);
  }
};

  const renderField = ( label: string, value: any ) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) { return null; }

    return (
      <View style={styles.fieldRow}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <Text style={styles.fieldValue}>{String(value)}</Text>
      </View>
    );
  };

  const renderSection = ( title: string, children: React.ReactNode ) => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>{children}
      </View>
    );
  };

   if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color={colorPlater.color.doneBtn} />
          <Text style={styles.loadingText}> Loading setup information... </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom, },]}>
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
            <View style={styles.card}>
              <View style={styles.successCircle}>
                <Text style={styles.successIcon}>✓</Text>
              </View>
            </View>
            <Text style={styles.complete}>Setup Complete!</Text>
            <Text style={styles.readyText}>Your organisation and admin account have been successfully created.</Text>
            
            {error !== "" && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

            {setupData && (
                <View style={styles.statusBox}>
                  <Text style={styles.statusLabel}>API Status: 
                  <Text style={styles.statusValue}> {setupData.status || "success"}</Text></Text>

                  {setupData.message && (
                    <Text style={styles.statusMessage}>{setupData.message}</Text>
                  )}
                </View>
              )}

            {showData && setupData?.data && (
              <View style={styles.responseContainer}>

                <View style={styles.dataSection}>
                  <Text style={styles.sectionTitle}>Organization</Text>
                  <Text>Organization ID: {setupData.data.Organization?.OrganizationsID}</Text>
                  <Text>Name: {setupData.data.Organization?.Name}</Text>
                  <Text>Department: {setupData.data.Organization?.Department}</Text>
                  <Text>Organization Type: {setupData.data.Organization?.OrganizationType}</Text>
                  <Text>Others: {setupData.data.Organization?.Others}</Text>
                  <Text>Address: {setupData.data.Organization?.Address}</Text>
                  <Text>City State: {setupData.data.Organization?.CityState}</Text>
                  <Text>Country: {setupData.data.Organization?.Country}</Text>
                  <Text>Postal Code: {setupData.data.Organization?.PostalCode}</Text>
                  <Text>Email: {setupData.data.Organization?.Email}</Text>
                  <Text>Phone: {setupData.data.Organization?.Phone}</Text>
                  <Text>Time Zone: {setupData.data.Organization?.TimeZone}</Text>
                  <Text>Description: {setupData.data.Organization?.Description}</Text>
                  <Text>Installation Date: {setupData.data.Organization?.InstallationDate}</Text>
                  <Text>Expiry Date: {setupData.data.Organization?.ExpiryDate}</Text>
                  <Text>Created Date: {setupData.data.Organization?.CreatedDate}</Text>
                </View>

                <View style={styles.dataSection}>
                  <Text style={styles.sectionTitle}>Admin User</Text>
                  <Text>First Name: {setupData.data.UserMaster?.FirstName}</Text>
                  <Text>Last Name: {setupData.data.UserMaster?.LastName}</Text>
                  <Text>Designation: {setupData.data.UserMaster?.Designation}</Text>
                  <Text>Email: {setupData.data.UserMaster?.Email}</Text>
                  <Text>Phone: {setupData.data.UserMaster?.Phone}</Text>
                  <Text>User Role: {setupData.data.UserMaster?.UserRole}</Text>
                  <Text>User Name: {setupData.data.UserMaster?.UserName}</Text>
                  <Text>Password: {setupData.data.UserMaster?.Password}</Text>
                  <Text>Created Date: {setupData.data.UserMaster?.CreatedDate}</Text>
                </View>

                <View style={styles.dataSection}>
                  <Text style={styles.sectionTitle}>Security Questions</Text>
                  <Text>Question 1: {setupData.data.SecurityQuestion?.Question1}</Text>
                  <Text>Answer 1: {setupData.data.SecurityQuestion?.Answer1}</Text>
                  <Text>Question 2: {setupData.data.SecurityQuestion?.Question2}</Text>
                  <Text>Answer 2: {setupData.data.SecurityQuestion?.Answer2}</Text>
                </View>
              </View>
            )}

            <Pressable onPress={() => setShowData(!showData)}>
                <Text>
                  {showData ? "Hide Entered Data" : "View Entered Data"}
                </Text>
            </Pressable>


          {/*  {showData && setupData?.data && (
                <View style={styles.rawResponseSection}>
                  <Text style={styles.sectionTitle}>Server Response</Text>
                  <Text style={styles.rawResponse}>
                    {typeof setupData.data === "string" ? setupData.data : JSON.stringify( setupData.data, null, 2 )}
                  </Text>
                </View>
              )}
            */}

            <Pressable
                onPress={() => router.replace("/(tabs)") }
                style={({ hovered, pressed }) => [
                  styles.button,
                  hovered && styles.buttonHover,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Go to Login</Text>
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
    backgroundColor: colorPlater.color.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  stepperView: {
    paddingVertical: 16,
    paddingHorizontal: 73,
  },
  
  cardView: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  
  card: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    padding: 24,
    borderRadius: 12,
    backgroundColor: colorPlater.color.textCard,
    //marginTop: 40,
  },
  successCircle: {
    width: 72,
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: colorPlater.color.doneBtn,

    alignSelf: "center",
  },
  successIcon: {
    color: colorPlater.color.textCard,
    fontSize: 36,
    fontWeight: "700",

    
    fontFamily: font.family,
    textAlign: "center",
    fontStyle: "normal",
    lineHeight: 36,
  },
  complete: {
    color: colorPlater.color.doneBtn,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 24,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 29,
    marginBottom: 7,
    marginTop: 16,
  },
  readyText: {
    color: colorPlater.color.defaultBtnText,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 14,
    fontStyle: "normal",
    lineHeight: 16.8,
    marginBottom: 23,
    //fontWeight: 400,
  },

  statusBox: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#66BB6A",
    marginBottom: 20,
    alignItems: "center",
  },
  statusLabel: {
    fontFamily: font.family,
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },
  statusValue: {
    fontFamily: font.family,
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
    marginTop: 3,
  },
  statusMessage: {
    fontFamily: font.family,
    fontSize: 13,
    color: "#333",
    marginTop: 5,
  },

  section: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 16,
    marginBottom: 18,
  },
  sectionTitle: {
    fontFamily: font.family,
    fontSize: 18,
    fontWeight: "700",
    color: colorPlater.color.doneBtn,
    marginBottom: 14,
  },

  fieldRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    paddingVertical: 9,
  },
  fieldLabel: {
    fontFamily: font.family,
    fontSize: 12,
    fontWeight: "600",
    color: "#777",
    marginBottom: 3,
  },
  fieldValue: {
    fontFamily: font.family,
    fontSize: 14,
    color: "#222",
    lineHeight: 20,
  },

  rawResponseSection: {
    width: "100%",
    marginBottom: 20,
  },
  rawResponse: {
    fontFamily: "monospace",
    fontSize: 12,
    lineHeight: 18,
    color: "#333",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 8,
  },

  errorBox: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#EF5350",
    marginBottom: 20,
  },
  errorText: {
    fontFamily: font.family,
    fontSize: 14,
    color: "#C62828",
    lineHeight: 20,
  },

  messageBox: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#FFEBEE",
    borderWidth: 1,
    borderColor: "#EF5350",

    //maxWidth: 600,
  },
  messageText: {
    fontFamily: font.family,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },


  button: {
    width: "100%",
    minHeight: 45,
    paddingVertical: 13.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colorPlater.color.button,
    marginTop: 5,
    //marginBottom: 40,
    //flex: 1,
    // maxWidth: 520,
  },
  buttonText: {
    color: colorPlater.color.textCard,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 15,
    fontWeight: 700,
    //fontStyle: "normal",
    //lineHeight: 18,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  buttonHover: {
    backgroundColor: colorPlater.color.Primary,
  },

  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontFamily: font.family,
    fontSize: 14,
    color: "#555",
  },
  dataSection: {
  width: "100%",
  backgroundColor: colorPlater.color.input,
  borderRadius: 10,
  padding: 16,
  marginBottom: 15,
  borderWidth: 1,
  borderColor: colorPlater.color.inputBorder,
},
responseContainer: {
  width: "100%",
  marginBottom: 20,
},
});