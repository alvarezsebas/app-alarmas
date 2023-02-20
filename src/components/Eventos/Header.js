import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Header(props) {
  const { aliasAbonado, abonado } = props;
  const tipo = "fighting";
  const color = getColorByPokemonType(tipo);
  const bgStyles = [{ backgroundColor: "#c03028", ...styles.bg }];
  console.log(color);

  return (
    <>
      <View style={bgStyles} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}></Text>
          <Text style={styles.order}> </Text>
        </View>
        <View style={styles.contentImg}></View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomEndRadius: 300,
    borderBottomLeftRadius: 300,
    transform: [{ scaleX: 2 }],
  },
  image: {
    width: 250,
    height: 300,
    resizeMode: "contain",
  },
  content: {
    marginHorizontal: 30,
    marginTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentImg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
});
