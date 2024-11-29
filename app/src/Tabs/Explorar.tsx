import { VStack, Image, Box, ScrollView } from "native-base";
import { Botao } from "../componentes/Botao";
import { CardConsulta } from "../componentes/CardConsulta";
import { EntradaTexto } from "../componentes/EntradaTexto";
import HealthBookerBranco from '../assets/maiseducacao_branco.png';
import { Titulo } from "../componentes/Titulo";
import { useState } from "react";
import { buscarEspecialistaPorEstado } from "../servicos/EspecialistaServico";
import { NavigationProps } from "../@types/navigation";

interface Especialista {
  nome: string,
  imagem: string,
  especialidade: string,
  id: string;
}


export default function Explorar({ navigation }: NavigationProps<'Explorar'>){
  const [estado, setEstado] = useState('')
  const [especialidade, setEspecialidade] = useState('')
  const [resultadoBusca, setResultadoBusca] = useState([])

  async function buscar(){
    if(!estado || !especialidade) return null
    const resultado = await buscarEspecialistaPorEstado(estado, especialidade)
    if(resultado){
      setResultadoBusca(resultado)
      console.log(resultado)
    }
  }

  return(
    <ScrollView flex={1} bgColor="white">
      <VStack flex={1} alignItems="center" justifyContent="flex-start" p={5}>
      <Image source={HealthBookerBranco} alt="Logo" mt={10} />
        <Box w="100%" borderRadius="lg" p={3} mt={5} shadow="1" borderRightRadius="md">
          <EntradaTexto
            placeholder="Digite o nome do aluno"
            value={especialidade}
            onChangeText={setEspecialidade}
          />
          <EntradaTexto
            placeholder="Digite a turma"
            value={estado}
            onChangeText={setEstado}
          />
          <EntradaTexto
            placeholder="Digite a matéria"
            value={estado}
            onChangeText={setEstado}
          />
          <Botao mt={3} mb={3} onPress={buscar}>
            Buscar
          </Botao>
        </Box>
        
        <Titulo color="green.800" alignSelf="center">Resultado da Busca</Titulo>
        {resultadoBusca?.map((especialista: Especialista, index) => (
          <VStack flex={1} w="100%" alignItems="flex-start" bgColor="white" key={index}>
            <CardConsulta 
              especialidade={especialista.especialidade}
              foto={especialista.imagem}
              nome={especialista.nome}
              onPress={() => navigation.navigate('Agendamento', {
                especialistaId: especialista.id
              })}
            />
          </VStack>
        ))}
      </VStack>
    </ScrollView>
  )
}