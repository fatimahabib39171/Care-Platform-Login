import { colorPlater, font } from "@/theme/theme";
import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

type ProgressStepperProps = {
  currentStep: number;
  totalSteps: number;
};

const stepName = ["Organisation", "Admin User", "Security", "Done"];

export default function ProgressStepper({
  currentStep,
  totalSteps,
}: ProgressStepperProps) {
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 600;

  return (
    <View style={styles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const step = index + 1;

        const isDone = step < currentStep;
        const isActive = step === currentStep;

        return (
          <React.Fragment key={step}>
            <View style={styles.stepContainer}>
              <View
                style={[
                  styles.dot,
                  isDone && styles.doneDot,
                  isActive && styles.activeDot,
                ]}
              >
                {isDone ? (
                  <Text style={styles.check}>{step}</Text>
                ) : (
                  <Text
                    style={[styles.number, isActive && styles.activeNumber]}
                  >
                    {step}
                  </Text>
                )}
              </View>
              {isLargeScreen && (
                <Text
                  style={[styles.stepName, isActive && styles.activeStepName]}
                >
                  {stepName[index]}
                </Text>
              )}
            </View>

            {step < totalSteps && <View style={styles.line} />}
          </React.Fragment>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    //width: 568,
    //height: 58,
  },

  dot: {
    width: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: colorPlater.color.defaultBtn,
  },

  doneDot: {
    backgroundColor: colorPlater.color.doneBtn,
  },

  activeDot: {
    backgroundColor: colorPlater.color.button,
  },

  number: {
    color: colorPlater.color.showbutton,
  },

  activeNumber: {
    color: colorPlater.color.textCard,
  },

  check: {
    color: colorPlater.color.textCard,
    fontFamily: font.family,
    fontSize: 11.47,
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: 14.4,
  },

  line: {
    flex: 1,
    maxWidth: 24,
    height: 2,
    backgroundColor: colorPlater.color.line,

    marginHorizontal: 6,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepName: {
    marginLeft: 6,
    color: colorPlater.color.footer,
    fontFamily: font.family,
    fontSize: 11,
    fontWeight: "400",
    textAlign: "center",
  },
  activeStepName: {
    color: colorPlater.color.button,
    fontWeight: "600",
  },
});
