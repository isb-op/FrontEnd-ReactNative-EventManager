import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
// import Loading from "../../components/loading/Loading";
import styles from "../RegisterScreen/RegisterScreenStyles";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

   const URL = "https://localhost:8080/account/sing-up";

  const SingUp = async () => {
    if (!name || !login || !password || !passwordConfirmation) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    Alert.alert("Confirmação", "Você deseja realizar o cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Ok",
        onPress: async () => {
          try {
            const userData = { name, login, password, passwordConfirmation};
            const response = await axios.post(URL, userData);

            if (response.status === 201) {
              setMessage("Cadastro realizado com sucesso!");
            } else {
              setMessage("Erro ao cadastrar. Verifique os dados.");
            }
          } catch (error: any) {
            if (error.response) {
              setMessage(error.response.data.message || "Erro no cadastro.");
            } else {
              setMessage("Erro na comunicação com o servidor.");
            }
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    > 
      <Image source={require("../../../assets/1.png")} style={styles.image} />
      <Text style={styles.titulo}>Cadastre-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="email@email.com"
        value={login}
        onChangeText={setLogin}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="*******"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
      style={styles.input}
      placeholder="*******"
      value={passwordConfirmation}
      onChangeText={setPasswordConfirmation}
      secureTextEntry
    />
      <TouchableOpacity style={styles.button} onPress={SingUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
