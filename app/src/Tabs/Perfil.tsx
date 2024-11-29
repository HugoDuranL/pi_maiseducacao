import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base';
import { Titulo } from '../componentes/Titulo';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pegarDadosPaciente, deletarPaciente } from '../servicos/PacienteServico';
import { Paciente } from '../interfaces/Paciente';
import { Botao } from '../componentes/Botao';
import { NavigationProps } from '../@types/navigation';
import { AxiosError } from 'axios';

export default function Perfil({ navigation }: NavigationProps<'Perfil'>) {
  const [dadosPaciente, setDadosPaciente] = useState({} as Paciente);

  useEffect(() => {
    async function carregarDadosPaciente() {
      const pacienteId = await AsyncStorage.getItem('pacienteId');
      if (!pacienteId) return null;

      const resultado = await pegarDadosPaciente(pacienteId);
      if (resultado) {
        setDadosPaciente(resultado);
        console.log(resultado);
      }
    }
    carregarDadosPaciente();
  }, []);

  function deslogar() {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('pacienteId');
    navigation.replace('Login');
  }

  async function deletarConta() {
    const pacienteId = await AsyncStorage.getItem('pacienteId');
    const token = await AsyncStorage.getItem('token');
    
    if (!pacienteId || !token) {
      console.log('Paciente ID ou Token não encontrados');
      return;
    }
  
    console.log(`Deletando conta do paciente com ID: ${pacienteId}`);
  
    try {
      const resultado = await deletarPaciente(pacienteId);
      if (resultado) {
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('pacienteId');
        navigation.replace('Login');
      } else {
        console.log('Erro ao deletar a conta');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log('Erro ao deletar a conta:', error.response ? error.response.data : error.message);
      } else {
        console.log('Erro desconhecido ao deletar a conta:', error);
      }
    }
  }

  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={5}>
        <Titulo color="green.800">Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: dadosPaciente?.imagem }} mt={5} />

        <Titulo color="green.800">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>{dadosPaciente.nome}</Titulo>
        <Text>{dadosPaciente?.email}</Text>
        <Text>{dadosPaciente?.endereco?.estado}</Text>

        <Divider mt={5} />

        <Titulo color="green.800" mb={1}>Matérias</Titulo>
        {
          dadosPaciente?.planosSaude?.map((plano, index) => (
            <Text key={index}>{plano}</Text>
          ))
        }

        <Botao onPress={deslogar} mt={5}>
          Desconectar
        </Botao>
        
        <Botao onPress={deslogar} mt={5} colorScheme="red">
          Deletar Conta
        </Botao>
        
      </VStack>
    </ScrollView>
  );
}
