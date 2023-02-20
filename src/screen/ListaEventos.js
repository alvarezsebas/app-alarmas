import {SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'
import { getEventos } from "../api/eventos";
import { getAbonados } from "../api/infoAbonados";
import EventosList from '../components/Eventos/EventosList'
import getNombreEvento from '../utils/getNombreEvento'

export default function ListaEventos() {
const [eventos, setEventos] = useState([]);

  useEffect( () =>{
    ( async () => {
      await loadeventos();
    }) ()
  },[])

  const loadeventos = async () => {
    try {
      const response = await getEventos();
      const abonados = await getAbonados();
      const eventosArray = [];

      for await(const eventoItem of response.eventos){
        if ((eventoItem.codigoEvento === 122 && eventoItem.fechaCierre === undefined) || (eventoItem.codigoEvento === 130   && eventoItem.fechaCierre === undefined )) {
          for await ( const abonadoItem of abonados.abonados ) {
            if (eventoItem.abonado === abonadoItem.numeroAbonado ) {
              const nombreEvento = getNombreEvento(eventoItem.codigoEvento);
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


              })
            }  
          }
        }
      }

      setEventos([...eventos, ...eventosArray])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView>
      <EventosList eventos={eventos} />
    </SafeAreaView>
  )
}