import { colorPlater } from "@/theme/theme";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import CardHeading from "../../components/myui/CardHeading";
import FormField from "../../components/myui/FormField";
import PassRequirement from "../../components/myui/PassRequirement";
import ProgressStepper from "../../components/myui/ProgressStepper";
import ScreenLayout from "../../components/myui/ScreenLayout";

export default function AdminUser() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 600;
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
          <View style={styles.inRow}>
            <FormField
              label="First Name "
              required={true}
              placeholderText="First name"
            />
            <FormField
              label="Last Name "
              required={true}
              placeholderText="Last name"
            />
          </View>
          <FormField
            label="Username "
            required={true}
            placeholderText="Choose a username"
          />

          <View style={{ flexDirection: isSmallScreen ? "column" : "row" }}>
            <FormField
              label="Email "
              required={true}
              placeholderText="admin@example.com"
              keyboardType="email-address"
            />
            <FormField
              label="Phone"
              placeholderText="+92 3xx xxxxxxx"
              keyboardType="phone-pad"
            />
          </View>

          <FormField
            label="Designation"
            placeholderText="e.g. Lead Physiotherapist"
          />

          <View style={styles.inRow}>
            <View>
              <FormField
                label="Password "
                required={true}
                placeholderText="Enter password"
                secureTextEntry={true}
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
            <FormField
              label="Confirm "
              required={true}
              placeholderText="Repeat password"
              secureTextEntry={true}
            />
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
  inRow: {
    //height: 64,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 12,

    backgroundColor: "red",
    //maxWidth: 520,
  },
  cardView: {
    paddingHorizontal: 24,
  },
  passRequirCard: {
    flex: 1,
    width: 254,
    height: 122,
    paddingVertical: 11,
    paddingHorizontal: 13,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colorPlater.color.inputBorder,
    backgroundColor: colorPlater.color.backgroundCard,
    marginBottom: 18,
  },
});
