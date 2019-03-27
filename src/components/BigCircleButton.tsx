import React from "react";
import { TouchableOpacity, GestureResponderEvent } from "react-native";
import BigCircle from "./BigCircle";

type Props = {
  size?: number;
  borderWidth?: number;
  onPress(event: GestureResponderEvent): void;
};

const BigCircleButton: React.SFC<Props> = props => (
  <TouchableOpacity onPress={props.onPress}>
    <BigCircle size={props.size}>{props.children}</BigCircle>
  </TouchableOpacity>
);

const defaultProps = {
  size: 256,
  borderWidth: 12
} as Props;

BigCircleButton.defaultProps = defaultProps;

export default BigCircleButton;
