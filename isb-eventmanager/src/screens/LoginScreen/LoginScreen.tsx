import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../types/navigation";
import axios from "axios";
import styles from "./LoginScreenStyles";

type NavigationProps = NativeStackNavigationProp<StackParamList>;

interface User {
  login: string;
  password: string;
}

const LoginScreen = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<NavigationProps>();
  const URL = "https://localhost:8080/account/sing-in";

  const Login = async () => {
    if (!login || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await axios.get<User[]>(URL);
      const users = response.data;
      const user = users.find(
        (user) => user.login === login && user.password === password
      );
      if (user) {
        navigation.navigate("Events");
      } else {
        Alert.alert("Erro", "Email ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Ocorreu um problema ao verificar as credenciais.");
    }
  };

  return (
    <KeyboardAvoidingView
    behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    style={styles.container}
    >
      <Image source={require("../../../assets/1.png")} style={styles.image} />
      <Text style={styles.titulo}>Bem-vindo</Text>
      <Text style={styles.subTitulo}>Faça login para continuar</Text>
      <TextInput
        style={styles.input}
        placeholder="email@email.com"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="******"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={Login}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "#FFF", marginTop: 20 }}>
          Não tem uma conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;
