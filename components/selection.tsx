import { colorPlater } from "@/constants/theme";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

type SelectionProps = {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  error?: string;
  dropdownId: string;
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
};

export function Selection({
  options,
  placeholder = "Select",
  onSelect,
  error,
  dropdownId,
  activeDropdown,
  setActiveDropdown,
}: SelectionProps) {
  const [selected, setSelected] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const { width: screenWidth } = useWindowDimensions();

  const isOpen = activeDropdown === dropdownId;

  const openDropdown = () => {
    if (isOpen) {
      setActiveDropdown(null);
      return;
    }
    setActiveDropdown(dropdownId);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    setActiveDropdown(null);
    onSelect?.(value);
  };

  return (
    <>
      {/* SELECT BOX */}
      <View
        ref={(ref) => {
          if (!ref) return;

          if (isOpen) {
            ref.measureInWindow((x, y, width, height) => {
              setDropdownPosition({
                top: y + height,
                left: x,
                width,
              });
            });
          }
        }}
      >
        {" "}
        <Pressable
          style={[styles.input, error && styles.inputError]}
          onPress={openDropdown}
        >
          <Text style={styles.inputText}>{selected || placeholder}</Text>
        </Pressable>
      </View>
      {/* DROPDOWN */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setActiveDropdown(null)}
      >
        {/* Transparent full-screen container */}
        <View style={styles.modalContainer}>
          {/* Click outside to close */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setActiveDropdown(null)}
          />

          {/* Dropdown itself */}
          <View
            style={[
              styles.dropdown,
              error && styles.dropdownError,
              {
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: Math.min(
                  dropdownPosition.width,
                  screenWidth - dropdownPosition.left - 10,
                ),
              },
            ]}
          >
            {options.map((option, index) => (
              <Pressable
                key={option}
                style={[
                  styles.option,
                  index === options.length - 1 && styles.lastOption,
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    zIndex: 1,
  },

  containerOpen: {
    zIndex: 9999,
    elevation: 9999,
  },

  input: {
    width: "100%",
    minHeight: 43,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colorPlater.color.input,
    borderColor: colorPlater.color.inputBorder,

    marginBottom: 18,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 13,
  },

  inputError: {
    // width: "100%",
    // minHeight: 43,
    // borderWidth: 1,
    // borderRadius: 10,
    borderColor: colorPlater.color.cardRequired,
    backgroundColor: colorPlater.color.inputError,

    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 13,
    marginBottom: 5,
  },

  inputText: {
    color: colorPlater.color.cardLabel,
    fontSize: 14,
  },

  error: {
    color: colorPlater.color.cardRequired,
    fontSize: 12,
    marginBottom: 17,
    // fontFamily: font.family,
    // fontStyle: "normal",
    // fontWeight: 500,
    // lineHeight: 14.4,
  },

  modalContainer: {
    flex: 1,
  },

  dropdown: {
    position: "absolute",
    // top: 48,
    // left: 0,
    // right: 0,
    marginTop: -17,
    borderWidth: 0.5,
    borderColor: colorPlater.color.cardLabel,
    //borderRadius: 10,
    backgroundColor: colorPlater.color.input,

    zIndex: 99999,
    elevation: 99999,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  dropdownError: {
    backgroundColor: colorPlater.color.inputError,
    borderColor: colorPlater.color.cardLabel,
    borderWidth: 0.5,
    marginTop: -3,
  },

  option: {
    paddingHorizontal: 14,
    paddingVertical: 12,

    borderBottomWidth: 0.5,
    borderBottomColor: colorPlater.color.cardLabel,
  },

  lastOption: {
    borderBottomWidth: 0,
  },

  optionText: {
    fontSize: 14,
    color: colorPlater.color.cardLabel,
  },
});
