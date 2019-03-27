import React, { useState, useEffect, useContext } from "react";
import { AuthContext, User } from "../lib/authentication";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  Image,
  Animated,
  Dimensions
} from "react-native";
import { RouteComponentProps } from "react-router-dom";
import {
  getMovieById,
  MovieResult,
  runtimeToHourAndMinute,
  IMAGE_SIZE,
  isMovieWatched,
  getMovieWatched
} from "../lib/utils";
import Header from "../components/Header";
import { UserMoviesContext, UserMovies } from "../lib/user-movies";
import FadeInView from "../components/FadeInView";
import Button from "../components/Button";
import { db } from "../lib/firebase";
import UIActivityIndicator from "../components/Indicators/ui-activity-indicator";
import BigCircleList from "../components/BigCircleList";

async function getMovie(
  setMovieData: Function,
  id: string,
  setLoadingButton: Function
) {
  setLoadingButton(true);
  try {
    const movieData = await getMovieById(id, IMAGE_SIZE.w500);

    setMovieData(movieData);
  } catch (err) {
    console.log({ err });
    return {};
  } finally {
    setLoadingButton(false);
  }
}

type DataToBeUploaded = {
  runtime: number;
  id: string;
  title: string;
};

function addMovieToFirebaseList(
  userId: string,
  data: DataToBeUploaded,
  setLoadingButton: Function
) {
  const userRef = db.collection("users").doc(userId);

  setLoadingButton(true);
  return db.runTransaction(async transaction => {
    // This code may get re-run multiple times if there are conflicts.
    try {
      // const {id, ...rest} = data;
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists) {
        await userRef.set({ totalRuntime: data.runtime, moviesCount: 1 });

        await userRef.collection("movies").add(data);
        setLoadingButton(false);
      } else {
        const userDocData = userDoc.data();
        if (userDocData) {
          const totalRuntime = (userDocData.totalRuntime += data.runtime);
          const moviesCount = userDocData.moviesCount + 1;

          await userRef.collection("movies").add(data);

          transaction.update(userRef, { totalRuntime, moviesCount });
          setLoadingButton(false);
        } else {
          console.log("not foud user doc data");
          setLoadingButton(false);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  });
}

function removeMovieToFirebaseList(
  userId: string,
  movieFid: string,
  data: DataToBeUploaded,
  setLoadingButton: Function
) {
  const userRef = db.collection("users").doc(userId);

  setLoadingButton(true);
  return db.runTransaction(async transaction => {
    // This code may get re-run multiple times if there are conflicts.
    try {
      // const {id, ...rest} = data;
      const userDoc = await transaction.get(userRef);

      if (!userDoc.exists) {
        setLoadingButton(false);
      } else {
        const userDocData = userDoc.data();
        if (userDocData) {
          const totalRuntime = (userDocData.totalRuntime -= data.runtime);
          const moviesCount = userDocData.moviesCount - 1;

          await userRef
            .collection("movies")
            .doc(movieFid)
            .delete();

          transaction.update(userRef, { totalRuntime, moviesCount });
          setLoadingButton(false);
        } else {
          console.log("not foud user doc data");
          setLoadingButton(false);
        }
      }
    } catch (err) {
      console.log({ err });
    }
  });
}

type Params = {
  id: string;
};

const { width } = Dimensions.get("screen");

const App = (props: RouteComponentProps<Params>) => {
  const auth = useContext(AuthContext);
  const userMovies = useContext(UserMoviesContext);

  const [movieData, setMovieData] = useState({} as MovieResult);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);

  const user = auth.user as User;

  useEffect(() => {
    getMovie(setMovieData, props.match.params.id, setLoading);
  }, [movieData.title]);

  console.log(userMovies.data);

  const data = [
    {
      title: "RunTime",
      text: runtimeToHourAndMinute(movieData.runtime)
    },
    {
      title: "Votes Number",
      text: String(movieData.voteCount)
    },
    {
      title: "Rating",
      text: String(movieData.voteAverage)
    }
  ];

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        height: "100vh",
        width: "100vw"
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        <View>
          <Header title={movieData.title} />
          <View style={{ alignItems: "center" }}>
            <View style={{ maxWidth: 500 }}>
              <FadeInView>
                <Image
                  source={{ uri: movieData.posterURL }}
                  style={{
                    width: "100vw",
                    maxWidth: 500,
                    height: "calc(0.5614035087719298 * 100vw)",
                    maxHeight: "calc(0.5614035087719298 * 500px)",
                    resizeMode: "contain"
                  }}
                />
              </FadeInView>

              <BigCircleList data={data} size={width > 500 ? 128 : 72} />

              <View style={{ paddingTop: 12 }}>
                <Text
                  style={{ color: "white", fontSize: 16, textAlign: "justify" }}
                >
                  {movieData.overview}
                </Text>
              </View>
              {loadingButton ? (
                <View style={{ paddingTop: 36 }}>
                  <Loading />
                </View>
              ) : (
                <View style={{ paddingTop: 12 }}>
                  <Button
                    label={
                      isMovieWatched(userMovies.data.listOfMovies, movieData.id)
                        ? "REMOVER"
                        : "ADICIONAR"
                    }
                    onPress={() => {
                      const _isMovieWatched = isMovieWatched(
                        userMovies.data.listOfMovies,
                        movieData.id
                      );
                      if (_isMovieWatched) {
                        const { fId } = getMovieWatched(
                          userMovies.data.listOfMovies,
                          movieData.id
                        );
                        removeMovieToFirebaseList(
                          user.id,
                          fId,
                          {
                            title: movieData.title,
                            runtime: movieData.runtime,
                            id: movieData.id
                          },
                          setLoadingButton
                        );
                      } else {
                        addMovieToFirebaseList(
                          user.id,
                          {
                            title: movieData.title,
                            runtime: movieData.runtime,
                            id: movieData.id
                          },
                          setLoadingButton
                        );
                      }
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const Loading = () => (
  <UIActivityIndicator count={11} color="white" size={64} />
);

export default App;
