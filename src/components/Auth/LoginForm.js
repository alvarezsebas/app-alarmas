import { View, Text, StyleSheet, TextInput, Button, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { postLogin } from "../../api/auth";
import useAuth from "../../hooks/useAuth";

export default function LoginForm() {
    const [error, setError] = useState("");
  const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValues) => {
          setError("");
          try {
            const response = await postLogin(formValues.email, formValues.password);
            if (response.ok === true && response.usuario.activo === true) {
              login(response.usuario);
            } else {
              setError("Usuario o contraseña incorrecta");
            }
          } catch (error) {}
        },
      });
  return (
    <View>
    <Text style={styles.title}>Iniciar sesión</Text>
    <TextInput
      placeholder="Correo"
      style={styles.input}
      autoCapitalize="none"
      value={formik.values.email}
      onChangeText={(text) => formik.setFieldValue("email", text)}
    />
    <TextInput
      placeholder="Contraseña"
      style={styles.input}
      autoCapitalize="none"
      secureTextEntry={true}
      value={formik.values.password}
      onChangeText={(text) => formik.setFieldValue("password", text)}
    />
    <Button title="Entrar" onPress={formik.handleSubmit} />
    <Text style={styles.error}> {formik.errors.email} </Text>
    <Text style={styles.error}> {formik.errors.password} </Text>

    <Text style={styles.error}>{error}</Text>
  </View>
  )
}

function initialValues() {
    return {
      email: "",
      password: "",
    };
  }
  
  function validationSchema() {
    return {
      email: Yup.string().required("El correo es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    };
  }
  
  const styles = StyleSheet.create({
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