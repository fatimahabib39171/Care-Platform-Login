import { colorPlater, font } from "@/constants/theme";
import { useState, useEffect, useRef } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ScrollView,
} from "react-native";

type SelectionProps = {
  options: string[];
  placeholder?: string;
  onSelect?: (value: string) => void;
  error?: string;
  dropdownId: string;
  activeDropdown: string | null;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>;
  onOpen?: () => void;
  onClose?: () => void;
  onDropdownBlur?: () => void;
};

export function Selection({
  options,
  placeholder = "Select",
  onSelect,
  error,
  dropdownId,
  activeDropdown,
  setActiveDropdown,
  onOpen,
  onClose,
  onDropdownBlur
}: SelectionProps) {
  const [selected, setSelected] = useState("");
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const { width: screenWidth } = useWindowDimensions();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const isOpen = activeDropdown === dropdownId;

  const wasOpen = useRef(false);
    useEffect(() => {
      if (wasOpen.current && !isOpen && !selected) {
        onDropdownBlur?.();
      }
      wasOpen.current = isOpen;
    }, [isOpen, selected]);

  const openDropdown = () => {
    if (isOpen) {
      setActiveDropdown(null);
      onClose?.();
      if (!selected) {onDropdownBlur?.(); }
      return;
    }
    setActiveDropdown(dropdownId);
    onOpen?.();
  };

  const dropdownOptions = [ placeholder, ...options]

  const handleSelect = (value: string) => {
    if( value === placeholder)
    {
      setSelected("");
      setActiveDropdown(null);
      onSelect?.("");
      onClose?.();
      return;
    }
    setSelected(value);
    setActiveDropdown(null);
    onSelect?.(value);
    onClose?.();
  }

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
          style={[styles.input, 
            error && styles.inputError, 
            isOpen && !error && styles.inputFocused]}
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
        onRequestClose={() => {setActiveDropdown(null); onClose?.();}}
      >
        {/* Transparent full-screen container */}
        <View style={styles.modalContainer}>
          {/* Click outside to close */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => {setActiveDropdown(null); onClose?.();;}}
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

            <ScrollView
              showsVerticalScrollIndicator={true}
              nestedScrollEnabled={true}
            >
            {dropdownOptions.map((option, index) => (
              <Pressable
                key={option}
                style={[
                  styles.option,
                  hoveredOption === option && styles.optionHover,
                  index === options.length && styles.lastOption,
                ]}
                onPress={() => handleSelect(option)}
                onHoverIn={() => setHoveredOption(option)}
                onHoverOut={() => setHoveredOption(null)}
              >
                <Text style={[styles.optionText,  hoveredOption === option && styles.optionTextHover,]}>{option}</Text>
              </Pressable>
            ))}
            </ScrollView>
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

    //marginBottom: 18,
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
    //marginBottom: 5,
  },

  inputText: {
    color: colorPlater.color.cardLabel,
    fontSize: 14,
  },

  error: {
    color: colorPlater.color.cardRequired,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 0,
    //marginBottom: 17,
    // fontFamily: font.family,
    // fontStyle: "normal",
    // fontWeight: 500,
    // lineHeight: 14.4,
  },

  modalContainer: {
    flex: 1,
  },

  dropdown: {
    height: "auto",
    position: "absolute",
    // top: 48,
    // left: 0,
    // right: 0,
    marginTop: 3,
    borderWidth: 0.5,
    borderColor: colorPlater.color.cardLabel,
    //borderRadius: 10,
    backgroundColor: colorPlater.color.input,

    zIndex: 99999,
    elevation: 99999,

    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
  },

  dropdownError: {
    backgroundColor: colorPlater.color.inputError,
    borderColor: colorPlater.color.cardLabel,
    borderWidth: 0.5,
    marginTop: 3,
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
    fontFamily: font.family,
    fontSize: 14,
    color: colorPlater.color.cardLabel,
  },

  inputFocused: {
    borderColor: colorPlater.color.focusGlow,

  },

  optionHover: {
  backgroundColor: colorPlater.color.focusGlow,
},

  optionTextHover: {
    color: "#FFFFFF",
  },
});
