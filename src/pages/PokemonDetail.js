import React, { Component } from "react";
import { ActivityIndicator, FlatList, ScrollView } from "react-native"; 
import api from "../services/api";
import {
  Container,
  Header,
  Avatarperfil,
  Nameperfil,       
  BioPerfil,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  CardPokemon,
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

      const [pokemonResponse, speciesResponse] = await Promise.all([
        api.get(`/pokemon/${pokemon.name}`),
        api.get(`/pokemon-species/${pokemon.name}`)
      ]);

      const pokemonData = pokemonResponse.data;
      const evolutionUrl = speciesResponse.data.evolution_chain.url;
      const evolutionId = evolutionUrl.split("/").slice(-2, -1)[0];

      const evolutionResponse = await api.get(`/evolution-chain/${evolutionId}`);
      const evolutionChain = this.getEvolutionChain(evolutionResponse.data.chain);

      const moves = pokemonData.moves
        .slice(0, 5)
        .map((m) => m.move.name.replace("-", " "));

      const stats = pokemonData.stats.map((s) => ({
        name: s.stat.name.replace("-", " "),
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header>
            <Avatarperfil source={{ uri: pokemon.sprite }} />
            <Nameperfil>{pokemon.name.toUpperCase()}</Nameperfil>
            <BioPerfil>Tipos: {pokemon.types}</BioPerfil>
            <BioPerfil>Habilidades: {pokemon.abilities}</BioPerfil>
          </Header>

          <CardPokemon>
            <Title style={{ textAlign: "center", marginBottom: 10 }}>Status Base</Title>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pokemon.stats}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Starred style={{ marginRight: 10 }}>
                  <Info>
                    <Title>{item.name.toUpperCase()}</Title>
                    <Author>{item.value}</Author>
                  </Info>
                </Starred>
              )}
            />

            <Title style={{ textAlign: "center", marginBottom: 10 }}>Movimentos</Title>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={pokemon.moves}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Starred style={{ marginRight: 10 }}>
                  <Info>
                    <Title>{item.toUpperCase()}</Title>
                  </Info>
                </Starred>
              )}
            />

            <Title style={{ textAlign: "center", marginBottom: 10 }}>Evoluções</Title>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={evolutionChain}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <Starred style={{ marginRight: 10 }}>
                  <OwnerAvatar source={{ uri: item.sprite }} />
                  <Info>
                    <Title>{item.name}</Title>
                  </Info>
                </Starred>
              )}
            />
          </CardPokemon>
        </ScrollView>
      </Container>
    );
  }
}
