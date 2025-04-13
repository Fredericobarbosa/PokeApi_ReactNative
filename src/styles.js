import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

//Estilos para a página Main
export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#666",
})`
  flex: 1;
  height: 40px;
  background: #fff;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #FFCC00;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 20px 30px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  align-items: center;
  border-color: #FFCC00;
  elevation: 4;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 30px;
  background: #F2F2F2;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background:#24b15f;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

//Estilos para a página PokemonDetails
export const Header = styled.View`
  padding-top: 30px;
  align-items: center;
  justify-content: center;
`;

export const Avatarperfil = styled.Image`
  width: 100px;
  height: 100px;
  background: #F2F2F2;
`;

export const Nameperfil = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const BioPerfil = styled.Text`
  font-size: 15px;
  line-height: 20px;
  color: #666;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #f5f5f5;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #000;
  margin-top: 2px;
`;

export const CardPokemon = styled.View`
  background: #F2F2F2;
  border-width: 2px;
  border-style: solid;
  border-color: #333;
  border-radius: 16px;
  padding: 20px;
  margin: 15px 0;
`;
