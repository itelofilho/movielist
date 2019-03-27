import React, { useContext } from "react";
import { View, FlatList } from "react-native";
import MovieListItem from "../components/MovieListItem";
import { UserMoviesContext } from "../lib/user-movies";
import Header from "../components/Header";

type UserMovieList = {
  title: string;
  id: string;
};

const UserMoviesList = () => {
  const userMovies = useContext(UserMoviesContext);
  const moviesList = userMovies.data.listOfMovies;

  return (
    <View
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        margin: 0,
        padding: 0,
        backgroundColor: "black"
      }}
    >
      <Header title="Watched Movies List" />
      <View style={{ borderBottomColor: "white", borderBottomWidth: 1 }} />
      <FlatList<UserMovieList>
        data={moviesList}
        renderItem={({ item }) => <MovieListItem {...item} />}
      />
    </View>
  );
};

export default UserMoviesList;
