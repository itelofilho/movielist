import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { withRouter, RouteComponentProps } from "react-router-dom";
import React from "react";

type Props = RouteComponentProps & {
  routes: {
    title: string;
    link: string;
  }[];
};

const TabBar = (props: Props) => {
  return (
    <View style={styles.footer}>
      {props.routes.map(route => (
        <Items
          go={props.history.push}
          text={route.title}
          link={route.link}
          location={props.location.pathname}
        />
      ))}
    </View>
  );
};

const Items = ({
  link,
  location,
  text,
  go
}: {
  link: string;
  location: string;
  text: string;
  go(to: string): void;
}) => {
  console.log({ location });
  console.log({ link });
  return (
    <TouchableOpacity onPress={() => go(link)} style={{ flex: 1 }}>
      <View
        style={
          location.includes(link)
            ? styles.itemContainerActive
            : styles.itemContainer
        }
      >
        <Text style={location.includes(link) ? styles.active : styles.items}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "black",
    display: "flex",
    height: 64,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: "white",
    borderTopWidth: 2
  },
  items: {
    // paddingTop: 20,
    fontSize: 24,
    color: "white"
  },
  active: {
    // paddingTop: 20,
    fontSize: 24,
    color: "black"
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  itemContainerActive: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flex: 1
  }
});

export default withRouter(TabBar);
