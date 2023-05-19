import React from "react";
import { Image } from "react-native";
import Account from "../screens/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import PokedexNavigation from "./PokedexNavigation";
import useAuth from '../hooks/useAuth';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  const {auth} = useAuth();
  return (
    <Tab.Navigator initialRouteName="Pokedex">
      
      {auth ? (
        <Tab.Screen
          name="Pokedex"
          component={PokedexNavigation}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => renderLogo(),
            headerTitleAlign: "center",
          }}
        />
      ) : (
        <Tab.Screen
          name="Iniciar sesión"
          component={Account}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => renderLogo(),
            headerTitleAlign: "center",
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function renderLogo() {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={{ width: 100, height: 100, top: -15 }}
    />
  );
}