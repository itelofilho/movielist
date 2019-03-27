import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext, User } from "../lib/authentication";

type Props = {
  component: (props: any) => JSX.Element;
};

function PrivateRoute(props: Props & RouteProps) {
  const { component: Component, ...rest } = props;
  const auth = useContext(AuthContext);
  const user = auth.user as User;
  const [isAuthenticated, setIsAuth] = useState(!!user.email);

  useEffect(() => {
    setIsAuth(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
