import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  GestureResponderEvent
} from "react-native";
import { queryForMovies, formatedResult } from "../lib/utils";
import SearchBox from "../components/SearchBox";
import MovieListItem from "../components/MovieListItem";
import { useThrottle } from "use-throttle";

async function updateListByText(setMoviesList: Function, searchText: string) {
  try {
    const moviesList = await queryForMovies(searchText);

    setMoviesList(moviesList);
  } catch (err) {
    console.log({ err });
    return [];
  }
}

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [moviesList, setMoviesList] = useState([] as formatedResult[]);
  const throttleSearchText = useThrottle(searchText, 400);

  const ref = React.createRef();

  useEffect(() => {
    updateListByText(setMoviesList, throttleSearchText);
  }, [throttleSearchText]);

  useEffect(() => {
    // @ts-ignore
    ref.current.focus();
  }, [ref.current]);

  function onPress(e: GestureResponderEvent) {
    e.preventDefault();
    // @ts-ignore
    ref.current.focus();
  }

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
      <SearchBox
        onPress={onPress}
        Aref={ref}
        value={searchText}
        onChangeText={setSearchText}
      />
      {moviesList.length === 0 ? (
        searchText === "" ? (
          <FallBack text="Search the movies you watch this year and see how much time you wasted" />
        ) : (
          <FallBack text={`Not found any movie related to ${searchText}`} />
        )
      ) : (
        <FlatList<formatedResult>
          data={moviesList}
          renderItem={({ item }) => <MovieListItem {...item} />}
        />
      )}
    </View>
  );
};

function FallBack(props: { text: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center"
  },
  text: { fontSize: 24, textAlign: "center", color: "white" },
  textContainer: {
    width: "80%",
    maxWidth: 400
  }
});
