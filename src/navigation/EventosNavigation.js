import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaEventos from "../screen/ListaEventos";
import Evento from '../screen/Evento';

const Stack = createNativeStackNavigator();

export default function EventosNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Eventos" component={ListaEventos} options={{ title: "", headerTransparent: true }} />
      <Stack.Screen name="Evento" component={Evento} options={{ title: "", headerTransparent: true }} />
    </Stack.Navigator>
  );
}
