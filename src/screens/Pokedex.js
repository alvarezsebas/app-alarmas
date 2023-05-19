import React, { useState, useEffect } from "react";
import { SafeAreaView, Button } from "react-native";
import { getEventos } from "../api/eventos";
import { getAbonados } from "../api/infoAbonados";
import PokemonList from "../components/PokemonList";
import getNombreEvento from "../utils/getNombreEvento";
import socketServices from "../api/socket";
import { Audio } from 'expo-av';

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

Notifications.setNotificationChannelAsync('sound', {
  name: 'Notificacion alarma',
  sound: 'notificacion.wav', // Provide ONLY the base filename
});


async function notificar() {
  const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()
  
  if(hasPushNotificationPermissionGranted){
   await Notifications.scheduleNotificationAsync({
      content: {
        title: "Se activo una alarma 🚨",
        body: 'Por favor revise la aplicación',
        sound: 'notificacion.wav',
        vibrate: false,
      },
      trigger: { seconds: 2, channelId: 'sound', },
    });
  
  }
}  
const MY_TASK = "MY_TASK";

TaskManager.defineTask(MY_TASK, async () => {
  await socketServices.initializeSocket();
      await socketServices.on("evento-nuevo", async (so) =>{
        console.log("estoy escuchando");
        if ( so.data.codigoEvento === 122  ||
          so.data.codigoEvento === 120 
          ||
          so.data.codigoEvento=== 130  ) {
            notificar();
            console.log(so.data);
        }
      } )

  // This return value is to let iOS know what the result of your background fetch was,
  // so the platform can better schedule future background fetches.
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const register = () => {
  console.log("register: ", MY_TASK);

  return BackgroundFetch.registerTaskAsync(MY_TASK, {
    minimumInterval: 1, // 5 seconds
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};

export const unregister = () => {
  console.log("unregister: ", MY_TASK);

  return BackgroundFetch.unregisterTaskAsync(MY_TASK);
};

export const checkStatus = async () => {
  const status = await BackgroundFetch.getStatusAsync();
  const isRegistered = await TaskManager.isTaskRegisteredAsync(MY_TASK);
  return { status, isRegistered };
};

export default function Pokedex() {
  const [eventos, setEventos] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [data, setData] = useState([]);
  const [sound, setSound] = React.useState();
 
  useEffect(() => {
    (async () => {
      await socketServices.initializeSocket();
      await socketServices.on("evento-nuevo", async (so) =>{
        await loadPokemons();
      } )
      await loadPokemons();
    })();
  }, []);


  async function playSound() {
    
    const { sound } = await Audio.Sound.createAsync( require('../../assets/sonidos/alarma.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }
  const loadPokemons = async () => {
    
    try {

      
        
        const response = await getEventos();
      const abonados = await getAbonados();
      const eventosArray = []
      for await (const eventoItem of response.eventos) {
        if (
          (eventoItem.codigoEvento === 122 &&
            eventoItem.fechaCierre === undefined) ||
          (eventoItem.codigoEvento === 120 &&
            eventoItem.fechaCierre === undefined) ||
          (eventoItem.codigoEvento === 130 &&
            eventoItem.fechaCierre === undefined)
        ) {
          global.notifico = global.notifico + 1
          for await (const abonadoItem of abonados.abonados) {
            if (eventoItem.abonado === abonadoItem.numeroAbonado) {
              const nombreEvento = getNombreEvento(eventoItem.codigoEvento);
              playSound();
              eventosArray.push({
                _id: eventoItem._id,
                codigoEvento: eventoItem.codigoEvento,
                fechaEvento: eventoItem.fechaEvento,
                zona: eventoItem.zona,
                nombreEvento: nombreEvento,
                abonado: eventoItem.abonado,
                aliasAbonado: abonadoItem.aliasAbonado,
                ciudadAbonado: abonadoItem.ciudadAbonado,
                direccionAbonado: abonadoItem.direccionAbonado,
                type: "fire",
              });
            }
          }
        }
      }

      setEventos([...eventos, ...eventosArray]);

    } catch (error) {
      console.error(error);
    }
        setTimeout(() => {
          
          reproducir();
        }, 3000);      
   
    
    
    
  };

  const reproducir = async () => {
   playSound();
  }
  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  
  return (
    <SafeAreaView>
      <PokemonList eventos={eventos} loadPokemons={loadPokemons} />
    </SafeAreaView>
  );
}
