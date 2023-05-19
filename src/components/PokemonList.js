import React from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import PokemonCard from "./PokemonCard";

export default function PokemonList(props) {
  const { eventos} = props;


  return (
    <FlatList
      data={eventos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(evento) => String(evento._id)}
      renderItem={({ item }) => <PokemonCard evento={item} />}
      contentContainerStyle={styles.flatListContentContainer}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === "android" ? 90 : 60,
  },
});
