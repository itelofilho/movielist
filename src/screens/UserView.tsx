import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Image,
  Animated,
  TouchableOpacity
} from "react-native";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AuthContext, User } from "../lib/authentication";
import Button from "../components/Button";
import { UserMoviesContext } from "../lib/user-movies";
import { runtimeToHourAndMinute } from "../lib/utils";
import BigCircleList from "../components/BigCircleList";
import UIActivityIndicator from "../components/Indicators/ui-activity-indicator";

type Params = {
  id: string;
};

const AuthenticationView = (props: RouteComponentProps<Params>) => {
  const auth = useContext(AuthContext);
  const userMovies = useContext(UserMoviesContext);

  const user = auth.user as User;

  const data = [
    {
      title: "Total Time",
      text: runtimeToHourAndMinute(userMovies.data.totalRuntime)
    },
    {
      title: "Movies Total",
      text: String(userMovies.data.moviesCount)
    }
  ];

  return (
    <View
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {userMovies.loading ? (
        <Loading />
      ) : (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ width: 128, height: 128 }}
          />

          <Text style={{ color: "white", fontSize: 24 }}>
            {user.displayName}
          </Text>

          <BigCircleList data={data} />

          <Button
            label="FILMES VISTOS"
            onPress={() => props.history.push("/profile/movies")}
          />
          <Button label="SAIR" onPress={auth.signout} />
        </View>
      )}
    </View>
  );
};

const Loading = () => (
  <UIActivityIndicator count={11} color="white" size={64} />
);

export default AuthenticationView;
