import { Paciente } from "../interfaces/Paciente";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "./api";
import { AxiosError } from 'axios';
import { config } from "dotenv";

export async function cadastrarPaciente(paciente: Paciente){
  if (!paciente) return null;

  try {
    const resultado = await api.post('/paciente', paciente);
    console.log(resultado.data);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pegarDadosPaciente(id: string){
  try {
    const resultado = await api.get(`/paciente/${id}`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function pegarConsultasPaciente(id: string){
  try {
    const resultado = await api.get(`/paciente/${id}/consultas`);
    return resultado.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deletarPaciente(id: string) {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.log('Token não encontrado');
      return null;
    }

    const resultado = await api.put(`/paciente/desativaPaciente/${id}`,  {}, {headers: {Authorization: `Bearer ${token}`}});
    console.log(`Paciente com ID ${id} foi deletado.`);
    return resultado.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log('Erro ao deletar a conta:', error.response ? error.response.data : error.message);
    } else {
      console.log('Erro desconhecido ao deletar a conta:', error);
    }
    return null;
  }
}
