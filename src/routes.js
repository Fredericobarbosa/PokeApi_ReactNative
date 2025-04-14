import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/main";
import Login from "./pages/login";
import PokemonDetail from "./pages/PokemonDetail";
import CadastrarUsuario from "./pages/cadastro";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "PokéLogin",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F2F2F2",
          },
          headerTitleStyle: {
            color: "#0075BE",
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="CadastrarUsuario"
        component={CadastrarUsuario}
        options={{
          title: "PokéCadastro",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F2F2F2",
          },
          headerTitleStyle: {
            color: "#0075BE",
            fontWeight: "bold",
            fontSize: 25,
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerLeft: null,
          title: "POKÉMONS",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F2F2F2",
          },
          headerTintColor: "#0075BE",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 25,
          },
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#0075BE"
              style={{ marginRight: 15 }}
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                } catch (error) {
                  console.error("Erro ao realizar o logout:", error);
                }
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetail}
        options={{
          title: "VER DETALHES",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#F2F2F2",
          },
          headerTitleStyle: {
            color: "#0075BE",
            fontWeight: "bold",
            fontSize: 25,
            
          },
        }}
      />
    </Stack.Navigator>
  );
}
