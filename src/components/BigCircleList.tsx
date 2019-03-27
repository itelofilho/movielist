import React from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import BigCircle from "./BigCircle";

type Props = {
  data: { title: string; text: string }[];
  size?: number;
  borderWidth?: number;
};

const BigCircleList = (props: Props) => (
  <View style={styles.container}>
    {props.data.map((item, index) => (
      <View key={index} style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
        <BigCircle size={props.size} borderWidth={props.borderWidth}>
          {item.text}
        </BigCircle>
      </View>
    ))}
  </View>
);

BigCircleList.defaultProps = {
  size: 128,
  borderWidth: 6
};

const { width } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap" },
  content: {
    flexDirection: "column",
    alignItems: "center",
    padding: 12
  },
  titleContainer: {
    paddingBottom: 12
  },
  text: { color: "white", fontSize: width > 500 ? 24 : 16 }
});

export default BigCircleList;
