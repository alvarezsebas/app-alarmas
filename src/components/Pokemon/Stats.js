import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import Reporte from "./../../components/Reporte";


export default function Stats(props) {
  const { datos } = props;
  const usuario = [];
  const  usuarios  = datos[0].usuarios;
  console.log(usuarios);
  const [modalOpen, setModalOpen] = useState(false);
  const barStyles = (num) => {
    const color = num > 49 ? "#00ac17" : "#ff3e3e";
    return {
      backgroundColor: color,
      width: `${num}%`,
    };
  };

  for (let i = 0; i < usuarios.length; i++) {
    
    usuario.push(

      <View>
       <Text> {usuarios[i].nombreUsuario}  { usuarios[i].cargoUsuario }  { usuarios[i].telefonoUsuario }  </Text> 
      </View>

    )
    
  }


  return (
    <View style={styles.content}>
      <Modal visible={modalOpen}>
        <View>
          <ScrollView>
            <TouchableOpacity>
            <MaterialIcons
                name="close"
                size={24}
                style={styles.modalToggle}
                onPress={() => setModalOpen(false)}
              />
              <Reporte id={datos}/>
              
            </TouchableOpacity>
            
          </ScrollView>
        </View>
      </Modal>

      <MaterialIcons
        name="add"
        size={24}
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)}
      />
      <Text style={styles.title}>Usuarios:</Text>
      {usuario}
      
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 80,
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
  block: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  blockTitle: {
    width: "30%",
  },
  statName: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  blockInfo: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    width: "12%",
    fontSize: 12,
  },
  bgBar: {
    backgroundColor: "#dedede",
    width: "88%",
    height: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  bar: {
    // backgroundColor: "red",
    // width: "40%",
    height: 5,
    borderRadius: 20,
  },
});
