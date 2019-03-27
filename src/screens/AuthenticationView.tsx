import React, { useState, useEffect, useContext } from "react";
import { View } from "react-native";
import { RouteComponentProps, withRouter } from "react-router-dom";
import UIActivityIndicator from "../components/Indicators/ui-activity-indicator";
import { AuthContext } from "../lib/authentication";
import BigCircleButton from "../components/BigCircleButton";

type Params = {
  id: string;
};

const AuthenticationView = (props: RouteComponentProps<Params>) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (Object.keys(auth.user).length > 0) {
      props.history.push("/profile");
    }
  }, [auth.user]);

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
      {auth.loading ? (
        <UIActivityIndicator count={11} color="white" size={64} />
      ) : (
        <BigCircleButton onPress={auth.signin}>
          ENTRAR COM O GOOGLE
        </BigCircleButton>
      )}
    </View>
  );
};

export default withRouter(AuthenticationView);
