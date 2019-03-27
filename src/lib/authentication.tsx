import React, { useState, useEffect } from "react";
import firebase, { db } from "./firebase";

// Create a Context
export const AuthContext = React.createContext({} as AuthContextProps);

type AuthContextProps = {
  signin: () => Promise<any>;
  signout: () => void;
  loading: boolean;
  user: User | {};
};

export type User = {
  email: string;
  id: string;
  photoURL: string;
  displayName: string;
};

const signin = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);

      const { user: bUser } = result;
      if (bUser) {
        const { uid: id, photoURL, email, displayName } = bUser;
        const user = { id, photoURL, email, displayName } as User;

        // setUser(user);
        // this.setState({ user }, () => resolve());
      } else {
        // reject();
      }
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log({ error });
      // reject();
    }
  });
};

function signout() {
  firebase.auth().signOut();
}

function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
    signin: signin,
    signout: signout
  };

  function initApp(
    setUser: React.Dispatch<React.SetStateAction<User>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    firebase.auth().onAuthStateChanged(bUser => {
      if (bUser) {
        const { uid: id, photoURL, email, displayName } = bUser;
        const user = { id, photoURL, email, displayName } as User;

        setUser(user);
        setLoading(false);
      } else {
        // @ts-ignore
        setUser({});
        setLoading(false);
        alert("No user!");
      }
    });
  }
  useEffect(() => {
    initApp(setUser, setLoading);
  }, [user.email]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthProvider;
