// @ts-ignore
import React from "react";
import {
  View,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  GestureResponderEvent
} from "react-native";

type Props = {
  value: string;
  onChangeText(text: string): void;
  Aref?: any;
  onPress?(event: GestureResponderEvent): void;
};
const SearchBox = (props: Props) => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={{ flexDirection: "row", padding: 12, backgroundColor: "black" }}
    >
      <View style={{ paddingRight: 12 }}>
        <Image
          source={require("../assets/icons8-search-50.png")}
          style={{ height: 24, width: 24 }}
        />
      </View>
      <TextInput
        ref={props.Aref}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder="Search"
        style={{ color: "white", fontSize: 20, width: "100%" }}
      />
    </View>
  </TouchableWithoutFeedback>
);

export default SearchBox;
