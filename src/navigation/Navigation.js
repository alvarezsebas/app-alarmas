import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../screen/Account";
import EventosNavigation from './EventosNavigation';
import useAuth from '../hooks/useAuth';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const {auth} = useAuth();
  return (
    <Tab.Navigator>
      {auth ? (
        <Tab.Screen
          name="Eventos"
          component={EventosNavigation}
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
      style={{ width: 150, height: 150, top: -15 }}
    />
  );
}
