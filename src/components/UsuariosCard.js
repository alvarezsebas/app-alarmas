import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { capitalize } from "lodash";
import { useNavigation } from "@react-navigation/native";
import getColorByPokemonType from "../utils/getColorByPokemonType";

export default function UsuariosCard(props) {
  const { evento } = props;
  const navigation = useNavigation();

  const pokemonColor = getColorByPokemonType(evento.type);
  const bgStyles = { backgroundColor: pokemonColor, ...styles.bgStyles };

  const goToPokemon = () => {
    navigation.navigate("Pokemon", { id: evento._id });
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={bgStyles}>
            <Text style={styles.number}>
              {evento.abonado}
            </Text>
            <Text style={styles.name}> {evento.aliasAbonado}  </Text>
            <Text style={styles.name}> {evento.nombreEvento} </Text>
            <Image 
              source={require("../assets/sirena.png")}
              style={styles.image}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: "absolute",
    right: 10,
    top: 10,
    color: "#fff",
    fontSize: 11,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
  },
  image: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});