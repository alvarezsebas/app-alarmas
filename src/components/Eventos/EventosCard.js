import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function EventosCard(props) {
  const  evento  = props;
  const navigation = useNavigation();
  const goToEvento = () => {
      navigation.navigate("Evento", {id: evento.eventos._id})
  };

  return (
    <TouchableWithoutFeedback onPress={goToEvento}>
      <View style={styles.card}>
        <View style={styles.spacing}>
          <View style={styles.bgStyles}>
            <Text style={styles.abonado}>{evento.eventos.aliasAbonado} {evento.eventos.ciudadAbonado} </Text>
            <Text style={styles.numero}>{evento.eventos.abonado}</Text>
            <Text style={styles.evento}>{evento.eventos.nombreEvento}</Text>
            <Image 
              source={require("../../assets/sirena.png")}
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
  evento:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 20
  },
  bgStyles: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#c03028",
  },
  abonado:{
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10
  },
  image:{
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 60,
    height: 60
  },
  numero:{
    position: "absolute",
    right:10,
    top: 10,
    color: "#fff",
    fontSize: 11
  }
});
