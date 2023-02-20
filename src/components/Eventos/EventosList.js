import { FlatList, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import EventosCard from '../../components/Eventos/EventosCard';

export default function EventosList(props) {
  const { eventos } = props;

  return (
    <FlatList
      data={eventos}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={(evento) =>String(evento.abonado)}
      renderItem={({item}) => <EventosCard eventos={item} /> }
      contentContainerStyle ={styles.flatListContentContainer}
    />
  );
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
        marginTop: Platform.OS === "android" ? 30 : 0,
    }
})
