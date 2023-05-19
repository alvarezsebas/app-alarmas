import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import Header from "../components/Pokemon/Header";
import Type from "../components/Pokemon/Type";
import Stats from "../components/Pokemon/Stats";
import { getEventoDetails } from "../api/eventos";
import { getAbonados} from "../api/infoAbonados";
import socketServices from "../api/socket";
import getNombreEvento from "../utils/getNombreEvento";


export default function Pokemon(props) {
   
  const {
    navigation,
    route: { params },
  } = props;
  const [evento, setEvento] = useState(null);
  const [data, setData] = useState([])

  useEffect(() => {
    socketServices.initializeSocket();
  }, [])
 
  useEffect(() => {
    (async () => {
      try {

        const response = await getEventoDetails(params.id);
        const abonados = await getAbonados();
        const eventoArray = [];
        for await (const abonadoItem of abonados.abonados) {
          if (response.evento.abonado === abonadoItem.numeroAbonado) {
            const nombreEvento = getNombreEvento(response.evento.codigoEvento);
            eventoArray.push({
              _id: response.evento._id,
              codigoEvento: response.evento.codigoEvento,
              fechaEvento: response.evento.fechaEvento,
              zona: response.evento.zona,
              nombreEvento: nombreEvento,
              usuarios: abonadoItem.usuariosAbonado,
              abonado: response.evento.abonado,
              aliasAbonado: abonadoItem.aliasAbonado,
              ciudadAbonado: abonadoItem.ciudadAbonado,
              direccionAbonado: abonadoItem.direccionAbonado,
              type: 'fire',
            });
            setEvento([...eventoArray]);
          }
        }
        
        
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);
  console.log(evento);
  if (!evento) return null;
  return (
    <ScrollView>
      <Header
        datos={evento}
      />
      <Type />
      <Stats datos={evento} />
    </ScrollView>
  );
}
