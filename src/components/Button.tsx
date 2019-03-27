import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";

type Props = {
  label: string;
  onPress(event: GestureResponderEvent): void;
};

const Button = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 48,
          borderWidth: 4,
          borderColor: "white",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white" }}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
