import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image, TextInput, ToastAndroid } from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { putEventoReporte } from "../api/eventos";
import useAuth from '../hooks/useAuth';



export default function Reporte(props) {
  const { id } = props;
  const {auth, modal} = useAuth();
  console.log(modal);
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      setError("");
      let data = {
        reporte: formValues.reporte,
        foto: base64,
        usuario: auth._id
      };
      try {
       
        const response = await putEventoReporte(id[0]._id, data);
        if (response.ok === true) {
          
          ToastAndroid.show('Se guardo el reporte correctamente', ToastAndroid.SHORT);
        }else{
          
        }
      } catch (error) {}
    },
  });
  const [error, setError] = useState("");
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        base64: true,
      });
      base64 = data.base64;
      setImage(data.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameraContainer}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
        />
      </View>
      <Button title="Tomar foto" onPress={() => takePicture()} />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      <TextInput
        placeholder="Reporte"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.reporte}
        onChangeText={(text) => formik.setFieldValue("reporte", text)}
      />
      <Button title="Enviar reporte" onPress={formik.handleSubmit} />
      <Text style={styles.error}> {formik.errors.reporte} </Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}
function initialValues() {
  return {
    reporte: "",
  };
}

function validationSchema() {
  return {
    reporte: Yup.string().required("El reporte es obligatorio"),
  };
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});
