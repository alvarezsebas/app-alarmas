import { ScrollView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getEventoDetails } from "../api/eventos";
import { getAbonados } from "../api/infoAbonados";
import getNombreEvento from "../utils/getNombreEvento";
import Header from "../components/Eventos/Header";

export default function Evento(props) {
  const {
    navigation,
    route: { params },
  } = props;
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await getEventoDetails(params.id);
        const abonados = await getAbonados();
        const eventoArray = [];
        for await (const abonadoItem of abonados.abonados) {
          if (response.abonado === abonadoItem.numeroAbonado) {
            const nombreEvento = getNombreEvento(eventoItem.codigoEvento);
            eventoArray.push({
              _id: eventoItem._id,
              codigoEvento: eventoItem.codigoEvento,
              fechaEvento: eventoItem.fechaEvento,
              zona: eventoItem.zona,
              nombreEvento: nombreEvento,
              abonado: eventoItem.abonado,
              aliasAbonado: abonadoItem.aliasAbonado,
              ciudadAbonado: abonadoItem.ciudadAbonado,
              direccionAbonado: abonadoItem.direccionAbonado,
            });
            setEvento(eventoArray);
          }
        }
        
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!evento) return null;

  return (
    <ScrollView>
      <Header aliasAbonado={evento.aliasAbonado} abonado={evento.abonado} />
    </ScrollView>
  );
}
