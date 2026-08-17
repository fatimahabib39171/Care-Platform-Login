import { colorPlater, font } from "@/theme/theme";
import React, { ReactNode, useState } from "react";
import {
  Pressable,
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
  belowInput?: ReactNode;
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
  belowInput,

  ...inputProps
}: FormFieldProps) {
  const [showPass, setShowPass] = useState(false);
  const isPassword = inputProps.secureTextEntry === true;

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
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder={placeholderText}
            placeholderTextColor={colorPlater.color.cardLabel}
            {...inputProps}
            secureTextEntry={isPassword ? !showPass : false}
          />

          {isPassword && (
            <Pressable
              style={styles.showBtn}
              onPress={() => setShowPass(!showPass)}
            >
              <Text style={styles.showBtnText}>
                {showPass ? "HIDE" : "SHOW"}
              </Text>
            </Pressable>
          )}
        </View>
      )}
      {belowInput && (
        <View style={error ? styles.belowInputError : styles.belowInput}>
          {belowInput}
        </View>
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

  inputContainer: {
    position: "relative",
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
  belowInput: {
    marginTop: -13,
    marginBottom: 16,
  },
  belowInputError: {
    marginTop: -1,
    marginBottom: 3,
  },

  error: {
    color: colorPlater.color.cardRequired,
    fontFamily: font.family,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 14.4,
    marginBottom: 17,
  },

  showBtnText: {
    color: colorPlater.color.showbutton,
    textAlign: "center",
    fontFamily: font.family,
    fontSize: 11,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 13.2,
  },
  showBtn: {
    position: "absolute",
    paddingLeft: 4,
    top: 17,
    right: 16,
    //borderWidth: 1,
  },
});
