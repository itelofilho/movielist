import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  Image
} from "react-native";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { formatedResult } from "../lib/utils";

type Props = RouteComponentProps &
  PartialExcept<formatedResult, "id" | "title"> & {
    watched?: boolean;
  };

type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

const MovieListItem = (props: Props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => props.history.push(`/movies/${String(props.id)}`)}
    >
      <View
        style={{
          flexDirection: "row",
          minHeight: 48,
          paddingLeft: 8,
          alignItems: props.posterURL ? "flex-start" : "center"
        }}
      >
        {props.posterURL && (
          <Image
            source={{ uri: props.posterURL }}
            style={{
              width: 56,
              height: 1.5027027027027027 * 56,
              resizeMode: "contain"
            }}
          />
        )}
        <Text style={{ color: "white", fontSize: 24 }}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default withRouter(MovieListItem);
