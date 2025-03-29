import React, { Component } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import api from "../services/api";
import {
  Container,
  Header,
  Avatarperfil,
  Nameperfil,
  BioPerfil,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from "../styles";

export default class PokemonDetail extends Component {
  state = {
    pokemon: null,
    evolutionChain: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    try {
      const { route } = this.props;
      const { pokemon } = route.params;

      // 🔹 Buscar detalhes do Pokémon
      const [pokemonResponse, speciesResponse] = await Promise.all([
        api.get(`/pokemon/${pokemon.name}`),
        api.get(`/pokemon-species/${pokemon.name}`)
      ]);

      const pokemonData = pokemonResponse.data;
      const evolutionUrl = speciesResponse.data.evolution_chain.url;
      const evolutionId = evolutionUrl.split("/").slice(-2, -1)[0];

      // 🔹 Buscar a cadeia de evolução
      const evolutionResponse = await api.get(`/evolution-chain/${evolutionId}`);
      const evolutionChain = this.getEvolutionChain(evolutionResponse.data.chain);

      // 🔹 Pegando os 5 primeiros movimentos do Pokémon
      const moves = pokemonData.moves
        .slice(0, 5) // Pegando apenas os 5 primeiros
        .map((m) => m.move.name.replace("-", " ")) // Removendo os traços dos nomes

      // 🔹 Pegando os status base do Pokémon
      const stats = pokemonData.stats.map((s) => ({
        name: s.stat.name.replace("-", " "), // Melhorando o nome
        value: s.base_stat
      }));

      this.setState({
        pokemon: {
          id: pokemonData.id,
          name: pokemonData.name,
          sprite: pokemonData.sprites.other["official-artwork"].front_default,
          types: pokemonData.types.map((t) => t.type.name).join(", "),
          abilities: pokemonData.abilities.map((a) => a.ability.name).join(", "),
          moves,
          stats
        },
        evolutionChain,
        loading: false,
      });
    } catch (error) {
      console.error("Erro ao buscar detalhes do Pokémon:", error);
      this.setState({ error: true, loading: false });
    }
  }

  // 🔹 Função para extrair a cadeia de evolução
  getEvolutionChain(chain) {
    let evolutions = [];
    while (chain) {
      const id = chain.species.url.split("/")[6];
      evolutions.push({
        name: chain.species.name,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      });
      chain = chain.evolves_to.length > 0 ? chain.evolves_to[0] : null;
    }
    return evolutions;
  }

  render() {
    const { pokemon, evolutionChain, loading, error } = this.state;

    if (loading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="#7159c1" />
        </Container>
      );
    }

    if (error) {
      return (
        <Container>
          <BioPerfil>Erro ao carregar os dados. Tente novamente.</BioPerfil>
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Avatarperfil source={{ uri: pokemon.sprite }} />
          <Nameperfil>{pokemon.name.toUpperCase()}</Nameperfil>
          <BioPerfil>Tipos: {pokemon.types}</BioPerfil>
          <BioPerfil>Habilidades: {pokemon.abilities}</BioPerfil>
        </Header>

        <Title style={{ textAlign: "center", marginTop: 20 }}>Status Base</Title>
        <FlatList
          data={pokemon.stats}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.name.toUpperCase()}</Title>
                <Author>{item.value}</Author>
              </Info>
            </Starred>
          )}
        />

        <Title style={{ textAlign: "center", marginTop: 20 }}>Movimentos</Title>
        <FlatList
          data={pokemon.moves}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.toUpperCase()}</Title>
              </Info>
            </Starred>
          )}
        />

        <Title style={{ textAlign: "center", marginTop: 20 }}>Evoluções</Title>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={evolutionChain}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.sprite }} />
              <Info>
                <Title>{item.name}</Title>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
