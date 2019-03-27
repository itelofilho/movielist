import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

type Props = {
  size?: number;
  borderWidth?: number;
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: { color: "white", fontSize: width > 500 ? 24 : 16 }
});

const BigCircle: React.SFC<Props> = props => (
  <View
    style={[
      {
        width: props.size,
        height: props.size,
        borderRadius: (props.size as number) / 2,
        borderWidth: props.borderWidth
      },
      styles.container
    ]}
  >
    <Text style={styles.text}>{props.children}</Text>
  </View>
);

const defaultProps = {
  size: 256,
  borderWidth: 12
} as Props;

BigCircle.defaultProps = defaultProps;

export default BigCircle;
