import React from "react";

import SearchView from "./screens/SearchView";
import MovieDetailView from "./screens/MovieDetailView";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import { View } from "react-native";
import AuthenticationView from "./screens/AuthenticationView";
import UserView from "./screens/UserView";
import UserMoviesList from "./screens/UserMoviesList";
import AuthenticationProvider from "./lib/authentication";
import UserMoviesProvider from "./lib/user-movies";
import PrivateRoute from "./components/PrivateRoute";

// import BottomBar from
const AppRouter = () => (
  <AuthenticationProvider>
    <Router>
      <View>
        <Home />
        <Main />
      </View>
    </Router>
  </AuthenticationProvider>
);

const Home = () => <Route exact path="/" component={AuthenticationView} />;

const Main = () => (
  <View style={{ flex: 1 }}>
    <UserMoviesProvider>
      <Switch>
        <PrivateRoute exact path="/movies" component={SearchView} />
        <PrivateRoute path="/movies/:id" component={MovieDetailView} />
        <PrivateRoute exact path="/profile" component={UserView} />
        <PrivateRoute exact path="/profile/movies" component={UserMoviesList} />
      </Switch>
    </UserMoviesProvider>
    <BottomBar
      routes={[
        {
          title: "movies",
          link: "/movies"
        },
        { title: "profile", link: "/profile" }
      ]}
    />
  </View>
);

export default AppRouter;
