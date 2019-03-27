import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-dom";

const Header = (props: { title: string } & RouteComponentProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableWithoutFeedback onPress={props.history.goBack}>
        <View style={{ padding: 12 }}>
          <Image
            source={require("../assets/icons8-back-50.png")}
            style={{ height: 24, width: 24 }}
          />
        </View>
      </TouchableWithoutFeedback>
      <Text style={{ color: "white", fontSize: 24 }}>{props.title}</Text>
    </View>
  );
};

export default withRouter(Header);
