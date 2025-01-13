import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 40,
  },
  image: {
    width: 270,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  titulo: {
    fontSize: 32,
    color: "#000000",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    gap: 5,
  },
  message: {
    marginTop: 10,
    color: "white",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#e57129",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default styles;
