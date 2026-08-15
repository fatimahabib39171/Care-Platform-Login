import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ShowPassword() {
  const [showPass, setShowPass] = useState(false);

  return (
    <View>
      <TextInput secureTextEntry={!showPass} placeholder="enter" />
      <Pressable onPress={() => setShowPass(!showPass)}>
        <Text>{showPass ? "HIDE" : "SHOW"}</Text>
      </Pressable>
    </View>
  );
}
