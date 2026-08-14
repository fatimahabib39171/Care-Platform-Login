import { colorPlater, font } from "@/theme/theme";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Selection } from "./selection";

type FormFieldProps = TextInputProps & {
  label: string;
  required?: boolean;
  placeholderText: string;
  hint?: string;
  error?: string;
  selectItem?: boolean;
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  dropdownId?: string;
  options?: string[];
  onSelect?: (value: string) => void;
};

export default function FormField({
  label,
  required = false,
  placeholderText,
  hint,
  error,
  selectItem = false,
  activeDropdown,
  setActiveDropdown,
  dropdownId = "",
  options = [],
  onSelect,

  ...inputProps
}: FormFieldProps) {
  return (
    <View>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      {selectItem ? (
        <Selection
          options={options}
          placeholder={placeholderText}
          dropdownId={dropdownId}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          error={error}
          onSelect={onSelect}
        />
      ) : (
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholderText}
          placeholderTextColor={colorPlater.color.cardLabel}
          {...inputProps}
        />
      )}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  /* container: {
    marginBottom: 18,
  },
*/
  label: {
    color: colorPlater.color.cardLabel,
    fontFamily: font.family,
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 15.6,
    marginBottom: 5,
  },

  required: {
    width: 5.06,
    color: colorPlater.color.cardRequired,
    fontFamily: font.family,
    fontSize: 10.96,
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: 15.6,
  },
  input: {
    maxWidth: 520,
    minHeight: 43,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colorPlater.color.inputBorder,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colorPlater.color.input,

    marginBottom: 18,

    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 13,
  },

  inputError: {
    maxWidth: 520,
    minHeight: 43,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colorPlater.color.cardRequired,
    backgroundColor: colorPlater.color.inputError,

    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 13,
    marginBottom: 5,
  },
  /*
  hint: {
    fontSize: 12,
    color: "#777",
    marginTop: 5,
  },
*/

  error: {
    color: colorPlater.color.cardRequired,
    fontFamily: font.family,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 14.4,
    marginBottom: 17,
  },
});
