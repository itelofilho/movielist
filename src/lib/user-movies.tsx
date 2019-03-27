import React, { useState, useEffect, useContext } from "react";
import { AuthContext, User } from "../lib/authentication";
import firebase, { db } from "./firebase";

// Create a Context
export const UserMoviesContext = React.createContext(
  {} as UserMoviesContextProps
);

type UserMoviesContextProps = {
  data: UserMovies;
  loading: boolean;
};

type ListOfMovies = {
  title: string;
  id: string;
  fId: string;
};

export type UserMovies = {
  listOfMovies: ListOfMovies[];
  moviesCount: number;
  totalRuntime: number;
};

async function getUserMoviesList(userId: string): Promise<ListOfMovies[]> {
  var docRef = db.collection("users").doc(userId);
  try {
    const querySnapshot = await docRef.collection("movies").get();

    const moviesList = [] as ListOfMovies[];
    querySnapshot.forEach(doc => {
      const data = doc.data() as ListOfMovies;
      moviesList.push({ ...data, fId: doc.id });
    });

    return moviesList;
  } catch (err) {
    console.log(err);
    return [];
  }
}

function handleMoviesCountUpdate(
  userId: string,
  setData: React.Dispatch<React.SetStateAction<UserMovies>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true);
  db.collection("users")
    .doc(userId)
    .onSnapshot(
      async doc => {
        if (doc.exists) {
          const _data = doc.data();

          const listOfMovies = await getUserMoviesList(userId);
          if (_data) {
            const { moviesCount, totalRuntime } = _data;
            setData({ listOfMovies, moviesCount, totalRuntime });
          } else {
            setData(initialDataState);
          }
        } else {
          setData(initialDataState);
        }

        setLoading(false);
      },
      function(error) {
        console.log(error);
        //...
      }
    );
}

const initialDataState = {
  listOfMovies: [],
  moviesCount: 0,
  totalRuntime: 0
};

function UserMoviesProvider(props: { children: React.ReactNode }) {
  const [data, setData] = useState(initialDataState as UserMovies);

  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);

  const user = auth.user as User;

  const value = {
    data,
    loading
  };

  useEffect(() => {
    if (user.id) {
      handleMoviesCountUpdate(user.id, setData, setLoading);
    }
  }, [user.email]);

  return (
    <UserMoviesContext.Provider value={value}>
      {props.children}
    </UserMoviesContext.Provider>
  );
}

export default UserMoviesProvider;
