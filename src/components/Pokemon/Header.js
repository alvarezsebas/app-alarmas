import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image } from "react-native";
import { capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Header(props) {
  const { datos } = props;

  const color = getColorByPokemonType(datos[0].type);

  const bgStyle = [{ backgroundColor: color, ...styles.bg }];

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date(datos[0].fechaEvento);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getMinutes();

    setCurrentDate(day + '/' + month + '/' + year 
    + ' ' + hours + ':' + min + ':' + sec);
   
  },[])

  return (
    <>
      <View style={bgStyle} />

      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{datos[0].aliasAbonado} {datos[0].ciudadAbonado} </Text>
          <Text style={styles.order}>
            #{`${datos[0].abonado}`.padStart(3, 0)}
          </Text>
        </View>
        <View>
        <Text style={styles.name}>Evento: {datos[0].nombreEvento} </Text>
        <Text style={styles.name}>Fecha evento: {currentDate} </Text>
        </View>
        <View style={styles.contentImg}>
          <Image
            source={require("../../assets/sirena.png")}
            style={styles.image}
          />
        </View>
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
  content: {
    marginHorizontal: 20,
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
  fecha: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginTop: 20
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
  image: {
    width: 180,
    height: 120,
    resizeMode: "contain",
  },
});
