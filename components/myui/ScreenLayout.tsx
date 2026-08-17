import { LinearGradient } from "expo-linear-gradient";
import { router, usePathname } from "expo-router";
import { ReactNode } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorPlater, font } from "../../theme/theme";

type ScreenLayoutProps = {
  children: ReactNode;
};

let lastSetupStep:
  | "/FirstTimeSetup"
  | "/AdminUser"
  | "/SecurityQuestions"
  | "/SetupComplete" = "/FirstTimeSetup";

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  const pathname = usePathname();

  const isSignInActive = pathname === "/" || pathname === "/index";

  const isFirstTimeSetupActive =
    pathname === "/FirstTimeSetup" ||
    pathname === "/AdminUser" ||
    pathname === "/SecurityQuestions" ||
    pathname === "/SetupComplete";

  if (isFirstTimeSetupActive) {
    lastSetupStep = pathname;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <LinearGradient
            colors={colorPlater.gradient.HeaderBar as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.headerTextView}>
              <Text style={styles.textHeading}>
                Care-Platform{" "}
                <Text style={{ color: colorPlater.color.textWeb }}>Web</Text>
              </Text>
              <Text style={styles.textSubheading}>
                Rehabilitation · H-Man / ReHandyBot
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.tabsView}>
          <Pressable
            style={[styles.tab, isSignInActive && styles.activeTab]}
            onPress={() => {
              router.navigate("/(tabs)");
            }}
          >
            <Text
              style={[styles.tabText, isSignInActive && styles.activeTabText]}
            >
              Admin Login
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, isFirstTimeSetupActive && styles.activeTab]}
            onPress={() => {
              router.navigate(lastSetupStep);
            }}
          >
            <Text
              style={[
                styles.tabText,
                isFirstTimeSetupActive && styles.activeTabText,
              ]}
            >
              First Time Setup
            </Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.cardView}>{children}</View>
        </View>

        <View style={styles.footerView}>
          <Text style={styles.footerTextView}>Care-Platform Web</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: colorPlater.color.background,
    width: "auto",
    height: "auto",
    flexShrink: 0,
  },
  header: {
    width: "100%",
    minWidth: 600,
    height: 75,
  },
  headerTextView: {
    paddingTop: 18,
    paddingRight: 378.56,
    paddingBottom: 18,
    paddingLeft: 24,
  },
  textHeading: {
    color: colorPlater.color.textCard,
    fontFamily: font.family,
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 24,
    letterSpacing: 0.5,
    marginBottom: 1,
  },
  textSubheading: {
    color: colorPlater.color.textCard,
    fontFamily: font.family,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 14.4,
  },
  tabsView: {
    //flex: 1,
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 24,
  },
  tab: {
    flex: 1,
    maxWidth: 278,
    maxHeight: 40,
    paddingVertical: 11.5,
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    backgroundColor: colorPlater.color.defaultBtn,
    borderRadius: 10,
  },
  tabText: {
    color: colorPlater.color.defaultBtnText,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 16.8,
  },
  activeTab: {
    backgroundColor: colorPlater.color.button,
    boxShadow: "0 4px 12px 0 rgba(26, 78, 138, 0.30)",
  },
  activeTabText: {
    color: colorPlater.color.textCard,
  },
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  cardView: {
    width: "90%",
    maxWidth: 568,
    minHeight: 347,

    flexShrink: 0,
    borderRadius: 12,
    backgroundColor: colorPlater.color.textCard,
    boxShadow: "0 2px 12px 0 rgba(15, 52, 96, 0.08)",

    marginTop: 20,
    marginBottom: 60,
  },

  footerTextView: {
    flex: 1,
    maxWidth: 600,
    maxHeight: 54,
    color: colorPlater.color.footer,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 14.4,
    paddingVertical: 20,
  },
  footerView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
